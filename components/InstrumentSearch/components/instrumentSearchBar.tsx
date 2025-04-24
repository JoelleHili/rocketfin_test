"use client"

import { InstrumentSearchBarTypes } from "../types/instrumentSearchTypes"
import { Search as SearchIcon } from "@mui/icons-material"

const InstrumentSearchBar = ({ value, setValue }: InstrumentSearchBarTypes) => (
    <div className="instrument-search__bar">
        <SearchIcon/>
        <input className="instrument-search__bar__input" placeholder="Search" value={value} onChange={(e) => setValue(e.target.value.toUpperCase())} />
    </div>
)

export default InstrumentSearchBar