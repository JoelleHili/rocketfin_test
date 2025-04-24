"use client"

import { TrendingTypes } from "../types/trendingTypes"

const TrendingEntry = ({symbol, displayName}: TrendingTypes) => (
    <div className="trending__entry">
        <span className="trending__entry__symbol">{symbol}</span>
        <span className="trending__entry__name">{displayName}</span>
    </div>
)

export default TrendingEntry