import { useEffect, useState } from 'react'

interface DebounceTypes {
  value: string
  delay?: number
}

const useDebounce = ({ value, delay = 300 }: DebounceTypes) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(debounceFunction)
  }, [value, delay])

  return debounceValue
}

export default useDebounce
