"use client"

import { TransactionHistoryListTypes } from "../types/transactionHistoryTypes"
import TransactionHistoryEntry from "./transactionHistoryEntry"

const TransactionHistoryList = ({ list }: TransactionHistoryListTypes) => {
  return (
    <ul className="transaction-history__list">
      {list.map((item, index) => (
        <li key={`transaction_${item.symbol}_${index}`}>
          <TransactionHistoryEntry 
            symbol={item.symbol} 
            shortName={item.shortName} 
            type={item.type} 
            amount={item.amount} 
          />
        </li>
      ))}
    </ul>
  );
};

export default TransactionHistoryList;