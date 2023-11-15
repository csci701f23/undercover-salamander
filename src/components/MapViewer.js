import { useState } from "react";
import ScrollBar from "./ScrollBar"
import Map from "./Map"
import background from "../../data/us_counties_5m.json"
<<<<<<< HEAD
=======
import TabBar from "./TabBar"
>>>>>>> 33e87e53c7ef846af3445dd21938f1f13355b23f

export default function MapViewer() {
    const [currentYear, setCurrentYear] = useState(2000);
    const [currentTab, setCurrentTab] = useState("PRCP");
    const [currentSpeed, setCurrentSpeed] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);

    return (
        <div className="MapViewer">
            <TabBar currentTab={currentTab} setCurrentTab={setCurrentTab}></TabBar>
            {/* TODO: Make width = screen.width without breaking the map */}
            <Map parameter={currentTab} width={1366} height={500} data={background} />
            <ScrollBar currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            currentSpeed={currentSpeed}
            setCurrentSpeed={setCurrentSpeed}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}/>
        </div>
    )
}