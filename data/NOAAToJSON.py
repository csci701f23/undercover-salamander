import numpy as np
import pandas as pd
import json
import geopandas as gpd
import geopy
import geocoder
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
import multiprocessing
import requests
# from multiprocessing import Process 
# import threading
# import parallelTestModule

placeholderColumns = ["ID", "Name", "County", "Latitude", "Longitude", "YearsArray", "YearsValues"]

stationColSpecs = [(0, 11), (11, 20), (20, 30),  (30, 37), (37, 40), (40, 71), (71, 75), (75, 79), (79, 85)]
stationColNames = ["ID", "Latitude", "Longitude", "Elevation", "State", "Name", "GSN Flag",  "HCN/CRN Flag", "WMO ID"]
stationInformation = pd.read_fwf("https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/ghcnd-stations.txt", colspecs=stationColSpecs, header=None, names=stationColNames)

colspecs = [(0,11), (11,15), (15,17), (17,21)]
colnames = ["ID", "YEAR", "MONTH", "ELEMENT"]
count =  1


# https://geopy.readthedocs.io/en/stable/
geolocator = Nominatim(user_agent="Undercover Salamander")

# only adds daily entries, ignores the flags that exist in the dataset
for i in range(21, 264, 8):
    colspecs.append((i, i + 5))
    colnames.append(f"VALUE{count}")
    count += 1

# Takes in a group from a specific county, averages vals
def averageCounty(countyGroup):
    dict = {}

    # So much optimization can be done
    for key, value in countyGroup.iterrows():
        for i in range(0, len(value["YEARS"])):
            yearKey = int(value['YEARS'][i])
                                                                            # bad code
            dict[yearKey] = [dict.get(yearKey, [0])[0] + 1, dict.get(yearKey, [0, 0])[1] + value["VALS"][i]]

    for key_ in dict:
        dict[key_] = dict[key_][1]/dict[key_][0]
    return json.dumps(dict)

def processStation(id, name, latitude, longitude, param):
    individualData = pd.read_fwf(f"https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/all/{id}.dly", colspecs=colspecs, header=None, names=colnames)

    if (not (individualData["ELEMENT"].eq(param)).any()):
        return None

    filteredData = individualData.query(f'YEAR >= 1940 and YEAR < 2023 and ELEMENT == "{param}"').replace(-9999, None).reset_index(drop=True)

    # from: https://sparkbyexamples.com/pandas/pandas-sum-dataframe-columns/
    # TODO: For TMAX or TMIN param, don't average but reduce by the max/min temp of all days in the year
    filteredData["MEAN"] = filteredData.iloc[:, 4:].mean(axis=1)

    # change to .apply(lambda x, accumulator: max(x)) something like that, Then you can provide a function as a param and put that in apply
    yearlyVal = filteredData.groupby('YEAR')['MEAN'].sum().div(12).to_numpy()

    yearsSeries = filteredData["YEAR"].drop_duplicates().to_numpy()

    try:
        # adapted from https://gis.stackexchange.com/questions/372872/max-retries-exceeded-with-url-in-nominatim-with-geopy try using requests instead of geopy
        location = requests.get(url=f'https://nominatim.openstreetmap.org/reverse?lat={latitude}&lon={longitude}&format=json&accept-language=en').json()
    except:
        print("Nom error")
        return None
    
    county = location['address']['county'].replace(" County", "")
    state = location['address']['state']

    print(county)

    if (county == None):
        print("county error")
        return None

    return [id, name, county, state, latitude, longitude, yearsSeries, yearlyVal]

def processChunk(chunk):
    result = pd.DataFrame(columns=["ID", "NAME", "COUNTY", "STATE", "LAT", "LONG", "YEARS", "VALS"])
    param = "PRCP"
    for (key, value) in chunk.iterrows():
        row = processStation(value["ID"], value["Name"], value["Latitude"], value["Longitude"], param)
        if (row is not None):
            result.loc[len(result)] = row
    return result

def processAllStations(param):
    stateStations = stationInformation.loc[stationInformation["ID"].str.contains("US")]
    # adapted parallelization start from: https://stackoverflow.com/questions/40357434/pandas-df-iterrows-parallelization
    num_processes = multiprocessing.cpu_count()
    length = stateStations.shape[0]

    chunk_size = int((length + 1)/num_processes)

    chunks = []

    for i in range(0, length, chunk_size):
        chunks.append(stateStations.iloc[i:min(i + chunk_size, length)])
    
    # TODO: Make sure param is being passed through into processChunk
    if __name__ == '__main__':    
        pool = multiprocessing.Pool(processes=num_processes)
        
        results = pool.map(processChunk, chunks)
        
        pool.close()
        pool.join()
        
        stateFrame = pd.concat(results).reset_index(drop=True)

        for (key, value) in stateStations.iterrows():
            row = processStation(value["ID"], value["Name"], value["Latitude"], value["Longitude"], param)
            if (row is not None):
                stateFrame.loc[len(stateFrame)] = row
        
        countyData = stateFrame.groupby(["COUNTY", "STATE"]).apply(averageCounty)
        
        with open("./data/PRCP_info.json", "w+") as f:
            countyData.to_json(f, orient="table", indent=4)
    
processAllStations("PRCP")