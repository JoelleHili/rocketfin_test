interface TransactionTypes {
  symbol: string
  shortName: string
  type: 'Bought' | 'Sold'
  amount: number
}

class TransactionHistory {
  private static instance: TransactionHistory | null = null
  private transactions: TransactionTypes[] = []

  private constructor() {}

  public static getInstance(): TransactionHistory {
    if (!TransactionHistory.instance) {
      TransactionHistory.instance = new TransactionHistory()
    }

    return TransactionHistory.instance
  }

  public addTransaction(
    symbol: string,
    shortName: string,
    type: 'Bought' | 'Sold',
    amount: number
  ): void {
    const transaction: TransactionTypes = {
      symbol,
      shortName,
      type,
      amount,
    }

    this.transactions.push(transaction)
  }

  public getTransactionHistory(): TransactionTypes[] {
    return [...this.transactions]
  }
}

// Export the class
export default TransactionHistory
