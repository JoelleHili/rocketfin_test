"use client"

import { TrendingListTypes } from "../types/trendingTypes"
import TrendingEntry from "./trendingEntry"

const TrendingList = ({list}: TrendingListTypes) => (
    <ul className="trending__list">{list.map((item) =>
        <li key={item.symbol}>
            <TrendingEntry symbol={item.symbol} displayName={item.displayName} />
        </li>)}
    </ul>
)

export default TrendingList