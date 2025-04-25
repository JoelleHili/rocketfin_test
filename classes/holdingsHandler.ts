interface HoldingTypes {
  symbol: string
  shortName: string
  amount: number
}

class HoldingsHandler {
  private static instance: HoldingsHandler
  private holdings: Map<string, HoldingTypes>

  private constructor() {
    this.holdings = new Map<string, HoldingTypes>()
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

  public canRemove(symbol: string, amount: number): boolean {
    const holding = this.holdings.get(symbol.toUpperCase())

    if (!holding) {
      return false
    }

    return holding.amount >= amount
  }

  public removeHolding(symbol: string, amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero')
    }

    const upperSymbol = symbol.toUpperCase()
    const holding = this.holdings.get(upperSymbol)

    if (!holding) {
      throw new Error(`No holding found for symbol ${upperSymbol}`)
    }

    if (holding.amount < amount) {
      throw new Error(
        `Insufficient amount to remove. Available: ${holding.amount}, Requested: ${amount}`
      )
    }

    holding.amount -= amount

    if (holding.amount === 0) {
      this.holdings.delete(upperSymbol)
    }
  }
}

export default HoldingsHandler
