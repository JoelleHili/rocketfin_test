"use client"

import { useEffect, useState } from "react"
import InstrumentSearchBar from "../components/instrumentSearchBar"
import InstrumentSearchResult from "../components/instrumentSearchResult"
import InstrumentSearchResultEmpty from "../components/instrumentSearchResultEmpty"
import { useGetInstrumentByTicker } from "../helpers/useGetInstrumentsByTicker"
import useDebounce from "@/hooks/useDebounce"

interface InstrumentSearchContainerTypes{
    ticker?: string
}

const InstrumentSearchContainer = ({ticker}: InstrumentSearchContainerTypes) => {
    const [tickerSearch, setTickerSearch] = useState(ticker ||"")
    const debounceValue = useDebounce({ value: tickerSearch })
    const { data, loading, error, refetch } = useGetInstrumentByTicker({ ticker: debounceValue })

    useEffect(() => {
        if (debounceValue.length) { refetch() }
    }, [refetch, debounceValue])

    return (
        <div className="instrument-search">
            <InstrumentSearchBar value={tickerSearch} setValue={setTickerSearch} />

            {debounceValue.length == 0 && <InstrumentSearchResultEmpty message="Please Search Using A Ticker" />}
            {loading && !data && debounceValue.length != 0 && <InstrumentSearchResultEmpty message="Loading..." />}
            {error && loading == false && debounceValue.length != 0 && <InstrumentSearchResultEmpty message={error.message} />}
            {data?.chart.error != null && debounceValue.length != 0 && <InstrumentSearchResultEmpty message={data?.chart.error.code} />}
            {data?.chart.result &&
                <InstrumentSearchResult
                    instrumentType={data?.chart.result[0].meta.instrumentType}
                    shortName={data?.chart.result[0].meta.shortName}
                    regularMarketPrice={data?.chart.result[0].meta.regularMarketPrice}
                    regularMarketDayHigh={data?.chart.result[0].meta.regularMarketDayHigh}
                    regularMarketDayLow={data?.chart.result[0].meta.regularMarketDayLow}
                    fullExchangeName={data?.chart.result[0].meta.fullExchangeName} />
            }

        </div>
    )
}

export default InstrumentSearchContainer