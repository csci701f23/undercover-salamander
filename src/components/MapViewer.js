import { useState } from "react";
import ScrollBar from "./ScrollBar"

export default function MapViewer() {
    const [currentYear, setCurrentYear] = useState(2000);
    const [currentSpeed, setCurrentSpeed] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);

    return (
        <div className="MapViewer">
            <ScrollBar currentYear={currentYear}
            setCurrentYear={setCurrentYear}
            currentSpeed={currentSpeed}
            setCurrentSpeed={setCurrentSpeed}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}/>
        </div>
    )
}