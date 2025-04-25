"use client"

import { HoldingsTypes } from "../types/holdingsTypes"

const HoldingsEntry = ({ symbol, shortName, ask }: HoldingsTypes) => (
    <a className="holdings__entry" href={`/search?ticker=${symbol}`}>
        <div className="holdings__entry__instrument">
            <span className="holdings__entry__symbol">{symbol}</span>
            <span className="holdings__entry__name">{shortName}</span>
        </div>
        <span className="holdings__entry__ask">${ask}</span>
    </a>
)

export default HoldingsEntry