"use client"

import HoldingsList from "../components/holdingsList"
import HoldingsHandler from "@/classes/holdingsHandler"

const HoldingsContainer = () => {

    const holdings = HoldingsHandler.getInstance()

    return (
        <div className="holdings widget widget__half">
            <h1>Your Holdings</h1>

            {<HoldingsList list={holdings.getHoldings()} />}
        </div>
    )
}

export default HoldingsContainer