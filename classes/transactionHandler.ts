import HoldingsHandler from './holdingsHandler'

interface TransactionTypes {
  symbol: string
  shortName: string
  type: 'Bought' | 'Sold'
  amount: number
}

type ChangeListener = () => void

class TransactionHistory {
  private static instance: TransactionHistory | null = null
  private transactions: TransactionTypes[] = []
  private readonly STORAGE_KEY = 'user_transaction_history'
  private changeListeners: ChangeListener[] = []

  private constructor() {
    this.load()
  }

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
    this.save()
  }

  public getTransactionHistory(): TransactionTypes[] {
    return [...this.transactions]
  }

  public buy(amount: number, symbol: string, shortName: string): void {
    console.log('Buying:', { amount, symbol, shortName })
    const holdingsHandler = HoldingsHandler.getInstance()

    this.addTransaction(symbol, shortName, 'Bought', amount)
    holdingsHandler.addHolding({ symbol, shortName, amount })

    this.save()
  }

  public sell(amount: number, symbol: string, shortName: string): void {
    console.log('Selling:', { amount, symbol, shortName })
    const holdingsHandler = HoldingsHandler.getInstance()

    if (holdingsHandler.canRemove(symbol, amount)) {
      this.addTransaction(symbol, shortName, 'Sold', amount)
      holdingsHandler.removeHolding(symbol, amount)
    } else {
      throw new Error(`Insufficient amount to remove`)
    }

    this.save()
  }

  private load(): void {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY)

      if (storedData) {
        const parsed = JSON.parse(storedData)
        this.transactions = parsed.map((t: TransactionTypes[]) => ({
          ...t,
        }))
      }
    } catch (error) {
      console.error('Failed to load transaction history from storage:', error)
      this.transactions = []
    }
  }

  private save(): void {
    try {
      const serializable = this.transactions.map((t) => ({
        ...t,
      }))

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(serializable))
      this.notifyChangeListeners()
    } catch (error) {
      console.error('Failed to save transaction history to storage:', error)
    }
  }

  private notifyChangeListeners(): void {
    this.changeListeners.forEach((listener) => listener())
  }

  public subscribe(listener: ChangeListener): () => void {
    this.changeListeners.push(listener)

    return () => {
      this.changeListeners = this.changeListeners.filter((l) => l !== listener)
    }
  }
}

export default TransactionHistory
