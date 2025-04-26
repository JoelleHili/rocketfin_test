"use client"

import TransactionHistory from "@/classes/transactionHandler"
import TransactionHistoryList from "../components/transactionHistoryList"

const TransactionHistoryContainer = () => {

    const transactionHistory = TransactionHistory.getInstance()

    return (
        <div className="transaction-history widget widget__full">
            <h1>Transaction History</h1>

            <TransactionHistoryList list={transactionHistory.getTransactionHistory()} />
        </div>
    )
}

export default TransactionHistoryContainer