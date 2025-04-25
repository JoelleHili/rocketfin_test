"use client"

import { useEffect, useState } from "react"
import HoldingsList from "../components/holdingsList"
import HoldingsData from "../data/holdingsData.json"
import { HoldingsTypes } from "../types/holdingsTypes"

const HoldingsContainer = () => {

    const [holdings, setHoldings] = useState<Array<HoldingsTypes>>(HoldingsData.result)

    // useEffect(() => {
    //  setHoldings([])   
    // }, [holdings])

    return (
        <div className="holdings widget">
            <h1>Your Holdings</h1>

            {holdings.length > 0 && <HoldingsList list={holdings} />}
        </div>
    )
}

export default HoldingsContainer