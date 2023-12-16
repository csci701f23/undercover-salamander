/* Copyright (c) 2023, <Jeff Blake, Lauren Clarke, Cece Ziegler >
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree. */

import * as d3 from 'd3';
import prcpData from "../../data/PRCP_info.json"
import maxtData from "../../data/TMAX_info.json"
import mintData from "../../data/TMIN_info.json"
import snowData from "../../data/SNOW_info.json"
import Scale from './Scale';

export default function Map ({ year, width, height, geoData, currentTab }) {
  // TODO: Extend the scale a bit so values like Alaska aren't just black (100+ precip)
  const getData = (tab) => {
    switch (currentTab) {
      case 'PRCP':
        return [prcpData, d3.scaleLinear()
          .domain([0, 1, 2, 3, 5])
          .range(["#E5fAC0", "#B4E197", "#83BD75", "#4E944F", "#2A6D2B"]), 10, "mm"];
      case 'SNOW':
        return [snowData, d3.scaleLinear()
          .domain([0, 0.1, 0.5, 0.75, 1])
          .range(["#F0E3FF", "#D5B7F7", "#916DD5", "#7346BB", "#592BA2"]), 10, "mm"];
      case 'MAXT':
        return [maxtData, d3.scaleLinear()
          .domain([27.5, 33.75, 37.5, 41.25, 45])
          .range(["#FFFFAD", "#FFCB58", "#F68F50", "#E0603F", "#BE3613"]), 10, "°C"];
      case 'MINT':
        return [mintData, d3.scaleLinear()
          .domain([-0, -10, -20, -30, -40])
          .range(["#C2FCF8", "#88D8DA", "#41ADC5", "#1692B6", "#055D96"]), 10, "°C"];
      default:
        return [prcpData, d3.scaleLinear()
          .domain([0, 1, 2, 3, 5])
          .range(["#E5fAC0", "#B4E197", "#83BD75", "#4E944F", "#2A6D2B"]), 10, "mm"];
      };
  }

  const [numData, colorScale, dataScaleFactor, unit] = getData(currentTab);
  
  const yearConst = `${year}`.split(" ")[3];

  console.log(currentTab);
  console.log(colorScale.range());
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

      const regionValue = regionData ? JSON.parse(regionData.values)[yearConst]/dataScaleFactor : null;
      const formattedRegionValue = regionValue && (currentTab !== "MAXT" || (currentTab === "MAXT" && regionValue <= 55)) ? regionValue.toFixed(3) : null;

      // Extra check for if the given year doesn't exist
      const color = formattedRegionValue ? colorScale(formattedRegionValue) : "lightgrey";

      const numVal = formattedRegionValue ? `${formattedRegionValue}${unit}` : `${formattedRegionValue}`;
      const tooltipText = `${shape.properties.NAME}, ${shape.properties.STATE}, ${numVal}`;

      return (
        <path
          key={countyId}
          d={geoPathGenerator(shape)}
          stroke="lightGrey"
          strokeWidth={0}
          fill={color}
          fillOpacity={0.7}
          onClick={() => console.log(`${shape.properties.NAME}, ${shape.properties.STATE},  ${regionValue}`)}
          >
            <title>{tooltipText}</title>
          </path>
      );
    });

    return (
      <div style={{ display: 'flex' }}>
        {/* Pass currentTab to Scale component */}
        <svg width={width} height={height}>
          {allSvgPaths}
        </svg>
        <Scale colorScale={colorScale} height={height} currentTab={currentTab} />
      </div>
    );
};
