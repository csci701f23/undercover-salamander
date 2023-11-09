import numpy as np
import pandas as pd
import json
# import geopandas as gpd
# import matplotlib.pyplot as plt

# extract all stations that start with US from ghcnd-stations.txt
# go to https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/all/{stationID}.dly , download and convert to JSON

# add parameters for file names in the future, and parameter to look for
stationInformation = pd.read_fwf("https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/ghcnd-stations.txt")
stationInformation.columns = ["ID", "Latitude", "Longitude", "", "Name", "", "", ""]

colspecs = [(0,11), (11,15), (15,17), (17,21)]
colnames = ["ID", "YEAR", "MONTH", "ELEMENT"]
count =  1

# only adds daily entries, ignores the flags that exist in the dataset
for i in range(21, 264, 8):
    colspecs.append((i, i + 5))
    colnames.append(f"VALUE{count}")
    count += 1

def processStation(id, param):
    individualData = pd.read_fwf(f"https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/all/{id}.dly", colspecs=colspecs, header=None, names=colnames)
   
    if (not (individualData["ELEMENT"].eq(param)).any()):
        return None

    indStationInfo = stationInformation.loc[stationInformation["ID"].isin([id])]

    latitude = indStationInfo.get("Latitude").iloc[0]
    longitude = indStationInfo.get("Longitude").iloc[0]
    name = indStationInfo.get("Name").iloc[0]

    filteredData = individualData.query(f'YEAR >= 1940 and YEAR < 2023 and ELEMENT == "{param}"').replace(-9999, None).reset_index(drop=True)

    # from: https://sparkbyexamples.com/pandas/pandas-sum-dataframe-columns/
    filteredData["MEAN"] = filteredData.iloc[:, 4:].mean(axis=1)
    yearlyVal = filteredData.groupby('YEAR')['MEAN'].sum().div(12).to_json(orient="records")

    yearsSeries = filteredData["YEAR"].drop_duplicates().to_json(orient="records")

    # Formats station as a geojson feature, all features can be 
    # contained in one larger FeatureCollectin: https://www.react-graph-gallery.com/choropleth-map
    stationGeoJSONDict = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [latitude, longitude]
        },
        "properties": {
            "ID": id,
            "Name": name,
            "Years": yearsSeries,
            "Param": yearlyVal
        }
    }

    return json.dumps(stationGeoJSONDict, indent=4)

def processStates():
    stateStations = stationInformation.loc[stationInformation["ID"].str.contains("US")]["ID"]
    for (key, value) in stateStations.items():
        json = processStation(value, "PRCP")
        print(json)

processStates()