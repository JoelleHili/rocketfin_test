"use client"

import { HoldingsListTypes } from "../types/holdingsTypes"
import HoldingsEntry from "./holdingsEntry"

const HoldingsList = ({list}: HoldingsListTypes) => (
    <ul className="holdings__list">{list.map((item) =>
        <li key={item.symbol}>
            <HoldingsEntry symbol={item.symbol} shortName={item.shortName} ask={item.ask} />
        </li>)}
    </ul>
)

export default HoldingsList