"use client"

import { InstrumentSearchBarTypes } from "../types/instrumentSearchTypes"
import { Search as SearchIcon } from "@mui/icons-material"

const InstrumentSearchBar = ({ value, setValue }: InstrumentSearchBarTypes) => (
    <div>
        <SearchIcon/>
        <input className="instrument-search__bar" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
)

export default InstrumentSearchBar