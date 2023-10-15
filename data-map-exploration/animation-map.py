import numpy as np
import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from matplotlib.colors import Normalize
from mpl_toolkits.axes_grid1 import make_axes_locatable

# Load the data 
df = pd.read_csv('/Users/ceceziegler/Downloads/daily_rainfall_flags_removed.csv', parse_dates=['date'])

# Load the GeoDataFrame 
gdf = gpd.read_file("/Users/ceceziegler/Downloads/gz_2010_us_040_00_500k.json")

vmin = 0  # Minimum value for the color scale
vmax = 50  # Maximum value for the color scale

# just picked a random 10 year span
start_year = 2000
end_year = 2010
years = range(start_year, end_year + 1)

# Create a figure
fig, ax = plt.subplots(1, 1, figsize=(8, 5), dpi=100)

# Create a function to update the plot for a given year
def update(year):
    plt.cla()  # Clear the previous frame
    plot_choropleth_for_year(year)

# Create a function to plot the choropleth for a given year
def plot_choropleth_for_year(year):
    # Filter the data for the current year
    df_year = df[df['date'].dt.year == year]

    # Group and sum the rainfall data for the current year
    grouped = df_year.groupby(['state_code', 'date'])['rainfall'].sum().reset_index()

    # Convert 'state_code' to an object type in the grouped DataFrame
    grouped['state_code'] = grouped['state_code'].astype(str)

    # Merge the GeoDataFrame with the grouped data
    merged = gdf.merge(grouped, left_on='STATE', right_on='state_code', how='left')

    # Plot the GeoDataFrame with custom color scale
    merged.plot(column='rainfall', cmap='viridis', linewidth=0.8, ax=ax, edgecolor='0.8', vmin=vmin, vmax=vmax)

    # Add a colorbar legend with correct label size
    # issues arrising here, open to help and feedback, colorbar appears, but really difficult to read
    divider = make_axes_locatable(ax)
    cax = divider.append_axes("right", size="5%", pad=0.1)
    norm = Normalize(vmin=vmin, vmax=vmax)
    cbar = plt.colorbar(plt.cm.ScalarMappable(norm=norm, cmap='viridis'), cax=cax, format='%d')  # Format ticks as integers
    cbar.set_label('Rainfall (mm)', fontsize=12)

    # Customize the plot
    ax.set_title(f'Rainfall Choropleth Map for {year}', fontsize=16, x=0.5, y=1.05)  # Centered title
    ax.set_axis_off()  # Turn off axis and grid box

# Create the animation
ani = FuncAnimation(fig, update, frames=years, repeat=False, interval=200)  # Adjust the interval as needed

# Save the animation as a GIF
ani.save('rainfall_animation.gif', writer='pillow', dpi=100)

plt.show()