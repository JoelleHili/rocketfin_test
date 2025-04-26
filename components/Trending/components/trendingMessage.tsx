"use client"

import { TrendingMessageTypes } from "../types/trendingTypes"

const TrendingMessage = ({ message }: TrendingMessageTypes) => (
    <div className="trending__message">
        <span>{message}</span>
    </div>
)

export default TrendingMessage