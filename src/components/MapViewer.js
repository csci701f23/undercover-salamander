import { useState, useEffect } from "react";
import ScrollBar from "./ScrollBar"
import Map from "./Map"
import background from "../../data/us_counties_5m_reformatted.json"
import TabBar from "./TabBar"
import useScreenSize from "./useScreenSize"

export default function MapViewer() {
    const [currentYear, setCurrentYear] = useState(2000);
    const [currentTab, setCurrentTab] = useState("PRCP");
    const [currentSpeed, setCurrentSpeed] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);
    const screenSize = useScreenSize();

    return (
        <div className="MapViewer">
            <TabBar currentTab={currentTab} setCurrentTab={setCurrentTab}></TabBar>
            <Map parameter={currentTab} year={currentYear} width={screenSize.width} height={screenSize.height} geoData={background} currentTab={currentTab}/>
            <ScrollBar currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            currentSpeed={currentSpeed}
            setCurrentSpeed={setCurrentSpeed}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}/>
        </div>
    )
}