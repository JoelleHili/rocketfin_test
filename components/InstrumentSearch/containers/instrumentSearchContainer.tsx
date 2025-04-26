"use client"

import { useEffect, useState } from "react"
import InstrumentSearchBar from "../components/instrumentSearchBar"
import InstrumentSearchResult from "../components/instrumentSearchResult"
import InstrumentSearchResultEmpty from "../components/instrumentSearchResultEmpty"
import { useGetInstrumentByTicker } from "../helpers/useGetInstrumentsByTicker"
import useDebounce from "@/hooks/useDebounce"
import HoldingsHandler from "@/classes/holdingsHandler"
import TransactionHistory from "@/classes/transactionHandler"

interface InstrumentSearchContainerTypes {
    ticker?: string
}

interface TransactionComponentTypes {
    symbol: string
    name: string
    type: "buy" | "sell"
}

const TransactionComponent = ({ symbol, name, type }: TransactionComponentTypes) => {

    const transactionHandler = TransactionHistory.getInstance()
    const holdingsHandler = HoldingsHandler.getInstance()
    const [amount, setAmount] = useState<number>(0)

    const handleSubmit = (amount: number) => {
        switch (type) {
            case "buy": {
                transactionHandler.buy(amount, symbol, name)
                break;
            }
            case "sell": {
                transactionHandler.sell(amount, symbol, name)
                break;
            }
        }
    }

    const handleChange = (amount: number) => {
        switch (type) {
            case "buy": if (amount >= 0) {
                setAmount(amount)
            }
            case "sell": {
                if (holdingsHandler.canRemove(symbol, amount) && amount >= 0) {
                    setAmount(amount)
                }
            }
        }
    }

    return <div className="transaction">
        <input type="number" value={amount} defaultValue={0} className="transaction__input" onChange={event => handleChange(event.target.valueAsNumber)} />
        <button className="transaction__submit" onClick={() => handleSubmit(amount)}>Submit</button>
    </div>
}

const InstrumentSearchContainer = ({ ticker }: InstrumentSearchContainerTypes) => {
    const [tickerSearch, setTickerSearch] = useState(ticker || "")
    const debounceValue = useDebounce({ value: tickerSearch })
    const { data, loading, error, refetch } = useGetInstrumentByTicker({ ticker: debounceValue })
    const holdingsHandler = HoldingsHandler.getInstance()
    const [holdingAmount, setHoldingAmount] = useState<number>(holdingsHandler.getHoldingAmount(debounceValue))

    useEffect(() => {
        setHoldingAmount(holdingsHandler.getHoldingAmount(debounceValue));

        const unsubscribe = holdingsHandler.subscribe(() => {
            const newAmount = holdingsHandler.getHoldingAmount(debounceValue);
            setHoldingAmount(newAmount);
        });

        return unsubscribe;
    }, [debounceValue, holdingsHandler])

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
                    fullExchangeName={data?.chart.result[0].meta.fullExchangeName}
                    currentholdings={holdingAmount || 0}
                    buy={<TransactionComponent type="buy" symbol={debounceValue} name={data?.chart.result[0].meta.shortName} />}
                    sell={<TransactionComponent type="sell" symbol={debounceValue} name={data?.chart.result[0].meta.shortName} />} />
            }

        </div>
    )
}

export default InstrumentSearchContainer