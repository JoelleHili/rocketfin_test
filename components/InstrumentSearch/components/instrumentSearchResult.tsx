"use client"

import Card from "@/components/Card"
import { InstrumentSearchResultTypes } from "../types/instrumentSearchTypes"

const InstrumentSearchResult = ({ instrumentType, shortName, regularMarketPrice, regularMarketDayHigh, regularMarketDayLow, fullExchangeName, currentholdings, buy, sell }: InstrumentSearchResultTypes) => (
    <div className="instrument-search__result__container">
        <div className="instrument-search__result__row">
            <Card
                className="instrument-search__result__card"
                title="Name"
                child={<text className="instrument-search__result__card__text">{shortName}</text>} />
            <Card
                className="instrument-search__result__card"
                title="Type"
                child={<text className="instrument-search__result__card__text">{instrumentType}</text>} />
            <Card
                className="instrument-search__result__card"
                title="Exchange Name"
                child={<text className="instrument-search__result__card__text">{fullExchangeName}</text>} />
            <Card
                className="instrument-search__result__card"
                title="Market Price"
                child={<text className="instrument-search__result__card__text">{regularMarketPrice}</text>} />
            <Card
                className="instrument-search__result__card"
                title="Market Price Low"
                child={<text className="instrument-search__result__card__text">{regularMarketDayLow}</text>} />
            <Card
                className="instrument-search__result__card"
                title="Market Price High"
                child={<text className="instrument-search__result__card__text">{regularMarketDayHigh}</text>} />
            <Card
                className="instrument-search__result__card"
                title="Your Holdings"
                child={<text className="instrument-search__result__card__text">{currentholdings}</text>} />
            <Card
                className="instrument-search__result__card"
                title="Buy"
                child={buy} />
            <Card
                className="instrument-search__result__card"
                title="Sell"
                child={sell} />
        </div>
        <div className="filler"></div>
    </div>
)

export default InstrumentSearchResult