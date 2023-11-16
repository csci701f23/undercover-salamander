import numpy as np
import pandas as pd
import json
import geopandas as gpd
import geopy
import geocoder
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter

# import matplotlib.pyplot as plt


placeholderColumns = ["ID", "Name", "County", "Latitude", "Longitude", "YearsArray", "YearsValues"]

# extract all stations that start with US from ghcnd-stations.txt
# go to https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/all/{stationID}.dly , download and convert to JSON

# add parameters for file names in the future, and parameter to look for

# ------------------------------
# Variable   Columns   Type
# ------------------------------
# ID            1-11   Character
# LATITUDE     13-20   Real
# LONGITUDE    22-30   Real
# ELEVATION    32-37   Real
# STATE        39-40   Character
# NAME         42-71   Character
# GSN FLAG     73-75   Character
# HCN/CRN FLAG 77-79   Character
# WMO ID       81-85   Character
# ------------------------------
stationColSpecs = [(0, 11), (11, 20), (20, 30),  (30, 37), (37, 40), (40, 71), (71, 75), (75, 79), (79, 85)]
stationColNames = ["ID", "Latitude", "Longitude", "Elevation", "State", "Name", "GSN Flag",  "HCN/CRN Flag", "WMO ID"]
stationInformation = pd.read_fwf("https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/ghcnd-stations.txt", colspecs=stationColSpecs, header=None, names=stationColNames)

colspecs = [(0,11), (11,15), (15,17), (17,21)]
colnames = ["ID", "YEAR", "MONTH", "ELEMENT"]
count =  1

# only adds daily entries, ignores the flags that exist in the dataset
for i in range(21, 264, 8):
    colspecs.append((i, i + 5))
    colnames.append(f"VALUE{count}")
    count += 1

def getCountyAndState(addressElements):
    i = 0
    for i in range (0, len(addressElements)):
        if "County" in addressElements[i]:
            county = addressElements[i].replace(" County", "")
            state = addressElements[i+1]
            break
    return (county, state)

def processStation(id, name, latitude, longitude, param):
    individualData = pd.read_fwf(f"https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/all/{id}.dly", colspecs=colspecs, header=None, names=colnames)

    if (not (individualData["ELEMENT"].eq(param)).any()):
        return None

    filteredData = individualData.query(f'YEAR >= 1940 and YEAR < 2023 and ELEMENT == "{param}"').replace(-9999, None).reset_index(drop=True)

    # from: https://sparkbyexamples.com/pandas/pandas-sum-dataframe-columns/
    filteredData["MEAN"] = filteredData.iloc[:, 4:].mean(axis=1)
    yearlyVal = filteredData.groupby('YEAR')['MEAN'].sum().div(12).to_json(orient="records")

    yearsSeries = filteredData["YEAR"].drop_duplicates().to_json(orient="records")

    # https://geopy.readthedocs.io/en/stable/
    geolocator = Nominatim(user_agent="Undercover Salamander")
    location = geolocator.reverse(f"{latitude}, {longitude}")

    addressElements = location.address.split(", ")
    [county, state] = getCountyAndState(addressElements)

    return [id, name, county, state, latitude, longitude, yearsSeries, yearlyVal]

def processAllStations(param):
    stateStations = stationInformation.loc[stationInformation["ID"].str.contains("US")]

    stateFrame = pd.DataFrame(columns=["ID", "NAME", "COUNTY", "STATE", "LAT", "LONG", "YEARS", "VALS"])
    i = 0
    for (key, value) in stateStations.iterrows():
        stateFrame.loc[len(stateFrame.index)] = processStation(value["ID"], value["Name"], value["Latitude"], value["Longitude"], param)
        i+=1
        if (i > 3):
            break
    print(stateFrame)
    
    # for each group of counties > send to a function that reduces by average VALS per year > into one row of type "COUNTY" "STATE" "YEARS" "VALS"
    # stateFrame.groupby("COUNTY")
    

    # # Formats station as a geojson feature, all features can be 
    # # contained in one larger FeatureCollection: https://www.react-graph-gallery.com/choropleth-map
    # stationGeoJSONDict = {
    #     "type": "Feature",
    #     "geometry": {
    #         "type": "Point",
    #         "coordinates": [latitude, longitude]
    #     },
    #     "properties": {
    #         "ID": id,
    #         "Name": name,
    #         "Years": yearsSeries,
    #         "Param": yearlyVal
    #     }
    # }

    # return stationGeoJSONDict

def processStates():
    dict = {
        "type": "FeatureCollection",
        "features":
        []
    }

    stateStations = stationInformation.loc[stationInformation["ID"].str.contains("US")]["ID"]
    for (key, value) in stateStations.items():
        stationDict = processStation(value, "PRCP")
        print(stationDict)
        dict["features"].append(stationDict)

    with open("./data-map-exploration/PRCP_info.json", "w+") as f:
        json.dump(dict, f, indent=4)

processAllStations("PRCP")