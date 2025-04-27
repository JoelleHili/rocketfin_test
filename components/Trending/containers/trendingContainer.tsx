"use client"

import { useEffect, useState } from "react"
import { useGetTrendingByRegion } from "../helpers/useGetTrendingByRegion"
import { TrendingTypes } from "../types/trendingTypes"
import { useGetTrendingNames } from "../helpers/useGetTrendingNames"
import TrendingList from "../components/trendingList"
import TrendingMessage from "../components/trendingMessage"

const InstrumentSearchContainer = () => {

    const { data, error } = useGetTrendingByRegion({ region: "US" })

    const symbolsString = data?.finance?.result?.[0]?.quotes?.slice(0, 10)?.map(
        (item: { symbol: string }) => item.symbol
    )?.join(',') || ""

    const { data: namesData, loading: loading, error: namesError } = useGetTrendingNames({
        trendingList: symbolsString
    })

    const [trendingList, setTrendingList] = useState<Array<TrendingTypes>>()

    useEffect(() => {
        setTrendingList([])

        if (namesData?.quoteResponse?.result) {
            setTrendingList(namesData.quoteResponse.result)
        }
    }, [data?.finance?.result, namesData?.quoteResponse?.result])
    return (
        <div className="trending widget widget__half">
            <h1>Trending In The Market</h1>

            {loading && !data && <TrendingMessage message="Loading..." />}
            {(namesError || error) && loading == false && <TrendingMessage message={namesError?.message || error?.message || "Error: Unknown Message"} />}
            {data?.finance.error != null && <TrendingMessage message={data?.finance.error.code} />}
            {trendingList && trendingList.length > 0 && <TrendingList list={trendingList} />}
        </div>
    )
}

export default InstrumentSearchContainer