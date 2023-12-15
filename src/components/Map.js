/* Copyright (c) 2023, <Jeff Blake, Lauren Clarke, Cece Ziegler >
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree. */

import * as d3 from 'd3';
import numData from "../../data/PRCP_info.json"
import Scale from './Scale';

export default function Map ({ year, width, height, geoData, currentTab }) {
  // TODO: Extend the scale a bit so values like Alaska aren't just black (100+ precip)
  const getColorScale = (tab) => {
    switch (tab) {
      case 'PRCP':
        return d3.scaleLinear()
          .domain([0, 10, 20, 30, 50])
          .range(["#E5fAC0", "#B4E197", "#83BD75", "#4E944F", "#2A6D2B"]);
      case 'SNOW':
        return d3.scaleLinear()
          .domain([0, 10, 20, 30, 50])
          .range(["#F0E3FF", "#D5B7F7", "#916DD5", "#7346BB", "#592BA2"]);
      case 'MAXT':
        return d3.scaleLinear()
          .domain([0, 10, 20, 30, 50])
          .range(["#FFFFAD", "#FFCB58", "#F68F50", "#E0603F", "#BE3613"]);
      case 'MINT':
        return d3.scaleLinear()
          .domain([0, 10, 20, 30, 50])
          .range(["#C2FCF8", "#88D8DA", "#41ADC5", "#1692B6", "#055D96"]);
      default:
        return d3.scaleLinear()
          .domain([0, 10, 20, 30, 50])
          .range(["#E5fAC0", "#B4E197", "#83BD75", "#4E944F", "#2A6D2B"]);
    }
  };

  const colorScale = getColorScale(currentTab);
  
  const yearConst = `${year}`.split(" ")[3];

  const scale = 1000;
  const projection = d3
    .geoAlbersUsa()
    .scale(scale)
    .translate([width / 1.8, height / 3]); // Center the map on the SVG

    // TODO: fix runtime using geoPath(project, context) to save as a graphics context
  const geoPathGenerator = d3.geoPath().projection(projection);

  // Code adapted from tutorial: https://www.react-graph-gallery.com/choropleth-map
  const allSvgPaths = geoData.features
    .map((shape) => {
      const countyId = `${shape.properties.NAME},${shape.properties.STATE}`;
      const regionData = numData.data.find((region) => `${region.COUNTY},${region.STATE}` === countyId);

      const regionValue = regionData ? JSON.parse(regionData.values)[yearConst] : null;
      const formattedRegionValue = regionValue != null ? regionValue.toFixed(3) : null;

      // Extra check for if the given year doesn't exist
      const color = formattedRegionValue ? colorScale(formattedRegionValue) : "lightgrey";

      const numVal = formattedRegionValue ? `${formattedRegionValue}mm` : `${formattedRegionValue}`;
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
