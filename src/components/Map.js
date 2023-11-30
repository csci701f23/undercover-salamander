import * as d3 from 'd3';
import numData from "../../data/PRCP_info.json"
// import { FeatureCollection } from 'geojson';

export default function Map ({ parameter, year, width, height, geoData }) {
  const colorScale = d3.scaleLinear()
    .domain([0, 10, 20, 30])
    .range(["#E5fAC0", "#B4E197", "#83BD75", "#4E944F"]);

  const scale = 1000;
  const projection = d3
    .geoAlbersUsa()
    .scale(scale)
    .translate([width / 2, height / 2]); // Center the map on the SVG

    // TODO: fix runtime using geoPath(project, context) to save as a graphics context
  const geoPathGenerator = d3.geoPath().projection(projection);

  // Code adapted from tutorial: https://www.react-graph-gallery.com/choropleth-map
  const allSvgPaths = geoData.features
    .map((shape) => {
      const countyId = `${shape.properties.NAME},${shape.properties.STATE}`;
      const regionData = numData.data.find((region) => `${region.COUNTY},${region.STATE}` === countyId);

      const regionValue = regionData ? JSON.parse(regionData.values)[`${year}`] : null;

      // Extra check for if the given year doesn't exist
      const color = regionValue ? colorScale(regionValue) : "lightgrey";

      return (
        <path
          key={countyId}
          d={geoPathGenerator(shape)}
          stroke="lightGrey"
          strokeWidth={0.5}
          fill={color}
          fillOpacity={0.7}
          onClick={() => console.log(`${shape.properties.NAME}, ${shape.properties.STATE}`)}
        />
      );
    });

  return (
    <div>
      <svg width={width} height={height}>
        {allSvgPaths}
      </svg>
    </div>
  );
};
