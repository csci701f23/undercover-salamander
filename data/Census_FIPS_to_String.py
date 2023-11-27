# Converts Census FIPS state ID to string  
import pandas as pd
import numpy as np
import json

stateData = pd.read_table("./data/FIPS_data.txt", delimiter='|', index_col="STATE")
# print(stateData)

# print(stateData.loc[1])

# print(stateData.query("STATE == 1"))

jsonFile = open("./data/us_counties_5m.json")
countyData = json.load(jsonFile)

newjsonFile = {
    "type": "FeatureCollection",
    "features": []
}

for feature in countyData["features"]:
    newFeature = feature
    state = int(newFeature["properties"]["STATE"])
    state_name = stateData.loc[state]["STATE_NAME"]
    newFeature["properties"]["STATE"] = state_name
    newjsonFile["features"].append(newFeature)

with open("./data/us_counties_5m_reformatted.json", "w+") as f:
    json.dump(newjsonFile, f, indent=2)