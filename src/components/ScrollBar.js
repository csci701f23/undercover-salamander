import { useEffect } from "react";

export default function ScrollBar( { currentYear, setCurrentYear, currentSpeed, setCurrentSpeed, isPlaying, setIsPlaying } ) {

    // TODO: Change span to an icon/image
    const decreaseTime = 
        <span
            onClick={() => {
                setCurrentYear(currentYear - 1);
            }}>
            ⤆
        </span>

    const increaseTime = 
        <span
            onClick={() => {
                setCurrentYear(currentYear + 1);
            }}>
            ⤇
        </span>

    const slowDown = 
        <span
            onClick={() => {
                if (isPlaying)
                    setCurrentSpeed(currentSpeed - 0.25);
            }}>
            ⏪
        </span>

    const fastForward = 
        <span
            onClick={() => {
                if (isPlaying)
                    setCurrentSpeed(currentSpeed + 0.25);
            }}>
            ⏩
        </span>

    const play = 
        <span
            onClick={() => {
                setIsPlaying(!isPlaying)
                if (isPlaying) {
                    const interval = setInterval(() => {
                        setCurrentYear(currentYear + 1);
                    }, 1000/currentSpeed)
                }
                else {
                    clearInterval(interval)
                }
            }}>
            {isPlaying ? "⏵" : "⏸"}
        </span>

        const interval = setInterval(() => {
            if (isPlaying)
                setCurrentYear(currentYear + 1);
        }, 1000/currentSpeed)
        // if (!isPlaying){

        //     console.log("cleared")
        // }
        // return () => {
        //     if (!isPlaying)
        //         clearInterval(interval)
        // }

    return (
        <div>
            {decreaseTime}
            {slowDown}
            <span>{currentYear}</span>
            {play}
            {fastForward}
            {increaseTime}
        </div>
    )

}