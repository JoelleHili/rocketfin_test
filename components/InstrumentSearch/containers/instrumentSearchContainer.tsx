"use client"

import { useEffect, useState } from "react"
import InstrumentSearchBar from "../components/instrumentSearchBar"
import InstrumentSearchResult from "../components/instrumentSearchResult"
import InstrumentSearchResultEmpty from "../components/instrumentSearchResultEmpty"
import { useGetInstrumentByTicker } from "../helpers/instrumentSearchCall"
import useDebounce from "@/hooks/useDebounce"

const InstrumentSearchContainer = () => {

    const [tickerSearch, setTickerSearch] = useState("")
    const { data, loading, error, refetch } = useGetInstrumentByTicker({ ticker: tickerSearch })
    const debounceValue = useDebounce({value: tickerSearch})

    useEffect(() => {
        if (debounceValue.length >= 3) { refetch() }
    }, [refetch, debounceValue])

    return (
        <>
            <InstrumentSearchBar value={tickerSearch} setValue={setTickerSearch} />
            {debounceValue}


            {tickerSearch === "" && <InstrumentSearchResultEmpty message="Please Search Using A Ticker" />}
            {loading && <InstrumentSearchResultEmpty message="Loading..." />}
            {error && loading == false && <InstrumentSearchResultEmpty message={error.message} />}
            {data?.chart.error != null && <InstrumentSearchResultEmpty message={data?.chart.error} />}
            {data?.chart.result &&
                <InstrumentSearchResult
                    instrumentType={data?.chart.result[0].meta.instrumentType}
                    shortName={data?.chart.result[0].meta.shortName}
                    regularMarketPrice={data?.chart.result[0].meta.regularMarketPrice}
                    regularMarketDayHigh={data?.chart.result[0].meta.regularMarketDayHigh}
                    regularMarketDayLow={data?.chart.result[0].meta.regularMarketDayLow}
                    fullExchangeName={data?.chart.result[0].meta.fullExchangeName} />
            }

        </>
    )
}

export default InstrumentSearchContainer