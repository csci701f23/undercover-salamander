/* Copyright (c) 2023, <Jeff Blake, Lauren Clarke, Cece Ziegler>
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree. */

// might not need currentTab as a property
export default function TabBar({currentTab, setCurrentTab}) {
    const setTab = (tab) => {
        setCurrentTab(tab);
    }
    
    return (
        <div>
            <div className="tabs-buttons">
                <button className={currentTab === "PRCP" ? "tabs-buttons active-tabs" : "tabs-buttons"} onClick={() => setTab("PRCP")}>Rainfall</button>
                <button className={currentTab === "SNOW" ? "tabs-buttons active-tabs" : "tabs-buttons"} onClick={() => setTab("SNOW")}>Snowfall</button>
                <button className={currentTab === "MAXT" ? "tabs-buttons active-tabs" : "tabs-buttons"} onClick={() => setTab("MAXT")}>Maximum Temperature</button>
                <button className={currentTab === "MINT" ? "tabs-buttons active-tabs" : "tabs-buttons"} onClick={() => setTab("MINT")}>Minimum Temperature</button>
            </div>

            <div className="tabs-content">
                <div className={currentTab === "PRCP" ? "tabs-content  active-content" : "tabs-content  inactive"}>
                    <h3>Rainfall</h3>
                </div>
                <div className={currentTab === "SNOW" ? "tabs-content  active-content" : "tabs-content  inactive"}>
                    <h3>Snowfall</h3>
                </div>
                <div className={currentTab === "MAXT" ? "tabs-content  active-content" : "tabs-content  inactive"}>
                    <h3>Maximum Temperature</h3>
                </div>
                <div className={currentTab === "MINT" ? "tabs-content  active-content" : "tabs-content  inactive"}>
                    <h3>Minimum Temperature</h3>
                </div>
            </div>
        </div>
    )
}
