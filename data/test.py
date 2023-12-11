import pandas as pd
import sys

result = pd.DataFrame(columns=["ID", "NAME", "COUNTY", "STATE", "LAT", "LONG", "YEARS", "VALS"])







plus = result.add(["a", "b", "c", "d", "e", "f", "10", "20"])
for key, value in plus.iterrows():
    print("here")
    sys.stdout.flush()

    for i in range(0, len(value["YEARS"])):
        print(int(value['YEARS'][i])) # error
        sys.stdout.flush()
