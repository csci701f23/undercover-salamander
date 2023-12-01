# Converts Census FIPS state ID to string  
import pandas as pd
import numpy as np
import json

stateData = pd.read_table("./data/FIPS_data.txt", delimiter='|', index_col="STATE")

jsonFile = open("./data/us_counties_5m.json")
countyData = json.load(jsonFile)

newjsonFile = {
    "type": "FeatureCollection",
    "features": []
}

for feature in countyData["features"]:
    # Has to have special cases for Lousiana (uses Parishes instead of counties) and Alaska (uses CAs, city&bor, Boroughs, and one muny)
    if (feature["properties"]["LSAD"] == "County" or feature["properties"]["LSAD"] == "Parish" or feature["properties"]["STATE"] == "02"):
        newFeature = feature
        state = int(newFeature["properties"]["STATE"])
        state_name = stateData.loc[state]["STATE_NAME"]
        newFeature["properties"]["STATE"] = state_name
        newjsonFile["features"].append(newFeature)

with open("./data/us_counties_5m_reformatted.json", "w+") as f:
    json.dump(newjsonFile, f, indent=4)
