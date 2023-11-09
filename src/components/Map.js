// placeholder for Map component
import * as d3 from "d3";

export default function Map({ width, height, data }) {
    // following tutorial from https://www.react-graph-gallery.com/map

    const projection = d3
    .geoMercator()
    .scale(width / 2 / Math.PI)
    .center([39.8283, 98.5795])

    const geoPathGenerator = d3.geoPath().projection(projection);
    
    //maybe add all of these counties to a context
    console.log(geoPathGenerator(data.features[0]));
    const allSvgPaths = data.features
        .map((shape) => {
            return (
                <path
                // key={shape.properties.ID} for custom implementation
                key={shape.properties.GEO_ID}
                d={geoPathGenerator(shape)}
                stroke="black"
                fill="#cb1dd1"
                />
            )
        })
    return ( <div>
        <svg width={width} height={height}>
        {allSvgPaths}
        </svg>
    </div>
    );

}