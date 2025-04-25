"use client"

import { TransactionHistoryListTypes } from "../types/transactionHistoryTypes"
import TransactionHistoryEntry from "./transactionHistoryEntry"

const TransactionHistoryList = ({ list }: TransactionHistoryListTypes) => (
    <ul className="transaction-history__list">{list.map((item) =>
        <li key={item.symbol}>
            <TransactionHistoryEntry symbol={item.symbol} shortName={item.shortName} type={item.type} amount={item.amount} />
        </li>)}
    </ul>
)

export default TransactionHistoryList