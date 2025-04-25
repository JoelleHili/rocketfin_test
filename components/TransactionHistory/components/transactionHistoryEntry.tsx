"use client"

import { TransactionHistoryTypes } from "../types/transactionHistoryTypes"

const TransactionHistoryEntry = ({ symbol, shortName, type, amount }: TransactionHistoryTypes) => (
    <a className="transaction-history__entry" href={`/search?ticker=${symbol}`}>
        <div className="transaction-history__entry__instrument">
            <span className="transaction-history__entry__symbol">{symbol}</span>
            <span className="transaction-history__entry__name">{shortName}</span>
        </div>
        <span className={`transaction-history__entry__type
            ${type == "Bought" ? "transaction-history__entry__bought" : ""}
            ${type == "Sold" ? "transaction-history__entry__sold" : ""}`}>
            ${type}
        </span>
        <span className="transaction-history__entry__amount">${amount}</span>
    </a>
)

export default TransactionHistoryEntry