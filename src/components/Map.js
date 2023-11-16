import * as d3 from 'd3';
// import { FeatureCollection } from 'geojson';

export default function Map ({ parameter, width, height, data }) {
  // TODO: Add year as a piece of state from MapViewer
  const scale = 1000;
  const projection = d3
    .geoAlbersUsa()
    .scale(scale)
    .translate([width / 2, height / 2]); // Center the map on the SVG

    // TODO: fix runtime using geoPath(project, context) to save as a graphics context
  const geoPathGenerator = d3.geoPath().projection(projection);

  //{path}.pointRadius will be good for displaying station data

  const allSvgPaths = data.features
    .map((shape) => {
      return (
        <path
          // TODO: Key = State id like MA for Mass and county like Plymouth, e.g. MAPlymouth for key. 
          key={shape.properties.GEO_ID}
          d={geoPathGenerator(shape)}
          stroke="lightGrey"
          strokeWidth={0.5}
          fill="grey"
          fillOpacity={0.7}
          onClick={() => console.log(shape.properties.county)}
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
