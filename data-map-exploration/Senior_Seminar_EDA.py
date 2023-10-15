import numpy as np
import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt

# Load the data (replace with your file path)
df = pd.read_csv('/Users/ceceziegler/Downloads/daily_rainfall_flags_removed.csv', parse_dates=['date'])

# Filter the data to include only the year 2010
df_2010 = df[df['date'].dt.year == 2010]

# Group and sum the rainfall data
grouped = df_2010.groupby(['state_code', 'date'])['rainfall'].sum().reset_index()

# Load the GeoDataFrame (replace with your file path)
gdf = gpd.read_file("/Users/ceceziegler/Downloads/gz_2010_us_040_00_500k.json")

# Convert 'state_code' to an object type in the grouped DataFrame
grouped['state_code'] = grouped['state_code'].astype(str)

# Merge the GeoDataFrame with the grouped data
merged = gdf.merge(grouped, left_on='STATE', right_on='state_code', how='left')

# Create a spatial index for the GeoDataFrame
merged.sindex

# Define your custom vmin and vmax values
vmin = 0  # Minimum value for the color scale
vmax = 50  # Maximum value for the color scale

# Create a figure with lower resolution
fig, ax = plt.subplots(1, figsize=(8, 5), dpi=100)

# Plot the GeoDataFrame with custom color scale
merged.plot(column='rainfall', cmap='viridis', linewidth=0.8, ax=ax, edgecolor='0.8', legend=True, vmin=vmin, vmax=vmax)

# Customize the plot
ax.set_title('Rainfall Choropleth Map for 2010', fontsize=16)
ax.set_axis_off()  # Turn off the axis

# Show the plot
plt.show()