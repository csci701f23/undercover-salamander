// might not need currentTab as a property
export default function TabBar({currentTab, setCurrentTab}) {
    return (
        <div>
            <button onClick={() => setCurrentTab("PRCP")}>PRCP</button>
            {/* button for each parameter */}
        </div>
    )
}