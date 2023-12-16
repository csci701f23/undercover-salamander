import pandas as pd
import numpy as np
import json
import requests
import multiprocessing
import sys
import time

# broken pipe handling
# from https://www.geeksforgeeks.org/broken-pipe-error-in-python/:
from signal import signal, SIGPIPE, SIG_DFL   
signal(SIGPIPE,SIG_DFL) 

placeholderColumns = ["ID", "Name", "County", "Latitude", "Longitude", "YearsArray", "YearsValues"]

stationColSpecs = [(0, 11), (11, 20), (20, 30),  (30, 37), (37, 40), (40, 71), (71, 75), (75, 79), (79, 85)]
stationColNames = ["ID", "Latitude", "Longitude", "Elevation", "State", "Name", "GSN Flag",  "HCN/CRN Flag", "WMO ID"]
stationInformation = pd.read_fwf("https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/ghcnd-stations.txt", colspecs=stationColSpecs, header=None, names=stationColNames)

colspecs = [(0,11), (11,15), (15,17), (17,21)]
colnames = ["ID", "YEAR", "MONTH", "ELEMENT"]
count =  1

param = ""    

# only adds daily entries, ignores the flags that exist in the dataset
for i in range(21, 264, 8):
    colspecs.append((i, i + 5))
    colnames.append(f"VALUE{count}")
    count += 1

def setParam(p):
    global param
    param = p

# Framewise functions rather than column OR row, more important for accurate averages
def frameMax(group):
    max = float('-inf')
    for key, value in group.iterrows():
        if (value.max() > max):
            max = value.max()
    return max

def frameMin(group):
    min = float('inf')
    for key, value in group.iterrows():
        if (value.min() < min):
            min = value.min()
    return min

def frameMean(group):
    sum = 0
    count = 0
    for key, value in group.iterrows():
        sum += group.sum(axis=1).sum()
        count += group.count(axis=1).sum()
    return sum/count

def reduceByParam(group):
    valCols = group.iloc[:, 4:]
    if param == "TMAX":
        return frameMax(valCols)
    elif param == "TMIN":
        return frameMin(valCols)
    elif param == "PRCP" or param == "SNOW":
        return frameMean(valCols)

def filterAndReduce(group):
    if (group.shape[0] < 12):
        return
    return reduceByParam(group)

def processStation(id, name, latitude, longitude):
    while (True):
        try:
            individualData = pd.read_fwf(f"https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/all/{id}.dly", colspecs=colspecs, header=None, names=colnames)
            break
        except:
            print("Sleeping...")
            time.sleep(1)
    
    if (not (individualData["ELEMENT"].eq(param)).any()):
        return None

    filteredData = individualData.query(f'YEAR >= 1940 and YEAR < 2023 and ELEMENT == "{param}"').replace(-9999, None).reset_index(drop=True)

    # from: https://sparkbyexamples.com/pandas/pandas-sum-dataframe-columns/

    # filteredData["AGG"] = filteredData.iloc[:, 4:].apply(func=reduceByParam, axis=1)

    # yearFilter = filteredData.groupby('YEAR')["AGG"].apply(filterAndReduce).dropna()
    yearFilter = filteredData.groupby('YEAR').apply(filterAndReduce).dropna()
    
    yearlyVal = yearFilter.to_numpy()

    yearsSeries = yearFilter.keys().to_numpy()

    try:
        # adapted from https://gis.stackexchange.com/questions/372872/max-retries-exceeded-with-url-in-nominatim-with-geopy try using requests instead of geopy
        location = requests.get(url=f'https://nominatim.openstreetmap.org/reverse?lat={latitude}&lon={longitude}&format=json&accept-language=en').json()
    except:
        # Nominatim error
        return None
    
    try:
        county = location['address']['county'].replace(" County", "")
        state = location['address']['state']
    except:
        # County/state not found
        return None

    return [id, name, county, state, latitude, longitude, yearsSeries, yearlyVal]

# Takes in a group from a specific county, averages vals
def reduceCounty(countyGroup):
    dict = {}

    # So much optimization can be done
    for key, value in countyGroup.iterrows():
        for i in range(0, len(value["YEARS"])):
            try:
                yearKey = int(value['YEARS'][i])
                if (param in ["PRCP", "SNOW"]):                                       # bad code
                    dict[yearKey] = [dict.get(yearKey, [0])[0] + 1, dict.get(yearKey, [0, 0])[1] + value["VALS"][i]]
                elif (param == "TMAX"):
                    dict[yearKey] = max(dict.get(yearKey, float('-inf')), value["VALS"][i])
                elif (param == "TMIN"):
                    dict[yearKey] = min(dict.get(yearKey, float('inf')), value["VALS"][i])
            except: 
                print(f"int('ID') error at county: {value['COUNTY']}, id:{value['ID']}")
                sys.stdout.flush()
                break
    if (param in ["PRCP", "SNOW"]):
        for key_ in dict:
            dict[key_] = dict[key_][1]/dict[key_][0]
    try:
        return json.dumps(dict)
    except:
        print(f"int64 error! {dict}, {countyGroup}")
        return

def processCountyChunk(chunk):
    return chunk.groupby(["COUNTY", "STATE"]).apply(reduceCounty).dropna()

def processStationChunk(chunk):
    result = pd.DataFrame(columns=["ID", "NAME", "COUNTY", "STATE", "LAT", "LONG", "YEARS", "VALS"])
    for (key, value) in chunk.iterrows():
        row = processStation(value["ID"], value["Name"], value["Latitude"], value["Longitude"])
        if (row is not None):
            result.loc[len(result)] = row
        print(value["ID"])
        sys.stdout.flush()
    return result

def processAllStations(param):
    setParam(param)
    stateStations = stationInformation.loc[stationInformation["ID"].str.contains("US")]

    print(f"Processing stations for {param} individually")
    sys.stdout.flush()
    stationResults = processStationChunk(stateStations)

    print("Processing counties")
    sys.stdout.flush()

    countyData = processCountyChunk(stationResults)

    # NOTE: This path will need to be changed if you aren't running from sbatch ada-submit (the base undercover-salamander directory)
    with open(f"./data/{param}_info.json", "w+") as f:
        countyData.to_json(f, orient="table", indent=4)

def main(param):
    processAllStations(param)

main("TMAX")