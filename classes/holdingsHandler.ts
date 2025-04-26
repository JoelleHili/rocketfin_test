interface HoldingTypes {
  symbol: string
  shortName: string
  amount: number
}

type ChangeListener = () => void

class HoldingsHandler {
  private static instance: HoldingsHandler
  private holdings: HoldingTypes[] = []
  private readonly STORAGE_KEY = 'user_holdings'
  private changeListeners: ChangeListener[] = []

  private constructor() {
    this.load()
  }

  public static getInstance(): HoldingsHandler {
    if (!HoldingsHandler.instance) {
      HoldingsHandler.instance = new HoldingsHandler()
    }
    return HoldingsHandler.instance
  }

  public getHoldings(): HoldingTypes[] {
    return Array.from(this.holdings.values())
  }

  public getHoldingAmount(symbol: string): number {
    const holding = this.holdings.find(
      (x) => x.symbol.toUpperCase() === symbol.toUpperCase()
    )

    return holding?.amount || 0
  }

  public addHolding({ symbol, shortName, amount }: HoldingTypes): void {
    const holding = this.holdings.find(
      (x) => x.symbol.toUpperCase() === symbol.toUpperCase()
    )

    if (!holding) {
      this.holdings.push({ symbol, shortName, amount })
    } else {
      holding.amount = holding.amount + amount
    }

    this.save()
  }

  public canRemove(symbol: string, amount: number): boolean {
    const holding = this.holdings.find(
      (x) => x.symbol.toUpperCase() === symbol.toUpperCase()
    )

    if (!holding) {
      return false
    }

    return holding.amount >= amount
  }

  public removeHolding(symbol: string, amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero')
    }

    const holding = this.holdings.find(
      (x) => x.symbol.toUpperCase() === symbol.toUpperCase()
    )

    if (!holding) {
      throw new Error(`No holding found for symbol ${symbol.toUpperCase()}`)
    }

    if (holding.amount < amount) {
      throw new Error(
        `Insufficient amount to remove. Available: ${holding.amount}, Requested: ${amount}`
      )
    }

    holding.amount -= amount

    if (holding.amount === 0) {
      this.holdings
        .filter((x) => x.symbol.toUpperCase() === symbol.toUpperCase())
        .pop()
    }

    this.save()
  }

  private load(): void {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY)

      if (storedData) {
        const parsed = JSON.parse(storedData)
        this.holdings = parsed.map((h: any) => ({
          ...h,
        }))
      }
    } catch (error) {
      console.error('Failed to load transaction history from storage:', error)
      this.holdings = []
    }
  }

  private save(): void {
    try {
      const serializable = this.holdings.map((h) => ({
        ...h,
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

export default HoldingsHandler
