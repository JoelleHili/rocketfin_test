"use client"

import { TrendingTypes } from "../types/trendingTypes"

const TrendingEntry = ({symbol, displayName}: TrendingTypes) => (
    <a className="trending__entry" href={`/search?ticker=${symbol}`}>
        <span className="trending__entry__symbol">{symbol}</span>
        <span className="trending__entry__name">{displayName}</span>
    </a>
)

export default TrendingEntry