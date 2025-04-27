"use client"

import { useState, useEffect } from 'react'
import { HoldingsListTypes } from "../types/holdingsTypes"
import HoldingsEntry from "./holdingsEntry"

const HoldingsList = ({ list }: HoldingsListTypes) => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <ul className="holdings__list"></ul>
  }
  
  return (
    <ul className="holdings__list">
      {list.map((item, index) => (
        <li key={`holding_${item.symbol}_${index}`}>
          <HoldingsEntry 
            symbol={item.symbol} 
            shortName={item.shortName} 
            amount={item.amount} 
          />
        </li>
      ))}
    </ul>
  )
}

export default HoldingsList