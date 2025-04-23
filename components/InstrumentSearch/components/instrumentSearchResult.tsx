"use client"

import Card from "@/components/Card"
import { InstrumentSearchResultTypes } from "../types/instrumentSearchTypes"

const InstrumentSearchResult = ({ instrumentType, shortName, regularMarketPrice, regularMarketDayHigh, regularMarketDayLow, fullExchangeName }: InstrumentSearchResultTypes) => (
    <div>
        <div>
            <Card title="Name" value={shortName} />
            <Card title="Type" value={instrumentType} />
            <Card title="Exchange Name" value={fullExchangeName} />
        </div>
        <div>
            <Card title="Market Price" value={regularMarketPrice} />
            <Card title="Market Price Low" value={regularMarketDayLow} />
            <Card title="Market Price High" value={regularMarketDayHigh} />
        </div>
        <div className="filler" />
    </div>
)

export default InstrumentSearchResult