import { useState } from "react";
import ScrollBar from "./ScrollBar"
import Map from "./Map"
import background from "../../data/us_counties_5m_reformatted.json"
import TabBar from "./TabBar"

export default function MapViewer() {
    const [currentYear, setCurrentYear] = useState(2000);
    const [currentTab, setCurrentTab] = useState("PRCP");
    const [currentSpeed, setCurrentSpeed] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);

    return (
        <div className="MapViewer">
            <TabBar currentTab={currentTab} setCurrentTab={setCurrentTab}></TabBar>
            {/* TODO: Make width = screen.width without breaking the map */}
            <Map parameter={currentTab} year={currentYear} width={1366} height={500} geoData={background} currentTab={currentTab}/>
            <ScrollBar currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            currentSpeed={currentSpeed}
            setCurrentSpeed={setCurrentSpeed}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}/>
        </div>
    )
}