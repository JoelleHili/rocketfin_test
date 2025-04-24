"use client"

import Card from "@/components/Card"
import { InstrumentSearchResultTypes } from "../types/instrumentSearchTypes"

const InstrumentSearchResult = ({ instrumentType, shortName, regularMarketPrice, regularMarketDayHigh, regularMarketDayLow, fullExchangeName }: InstrumentSearchResultTypes) => (
    <div className="instrument-search__result__container">
        <div className="instrument-search__result__row">
            <Card className="instrument-search__result__card" title="Name" value={shortName} />
            <Card className="instrument-search__result__card" title="Type" value={instrumentType} />
            <Card className="instrument-search__result__card" title="Exchange Name" value={fullExchangeName} />
            <Card className="instrument-search__result__card" title="Market Price" value={regularMarketPrice} />
            <Card className="instrument-search__result__card" title="Market Price Low" value={regularMarketDayLow} />
            <Card className="instrument-search__result__card" title="Market Price High" value={regularMarketDayHigh} />
        </div>
        <div className="filler"></div>
    </div>
)

export default InstrumentSearchResult