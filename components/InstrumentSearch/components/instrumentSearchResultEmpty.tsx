"use client"

import { InstrumentSearchResultEmptyTypes } from "../types/instrumentSearchTypes"

const InstrumentSearchResultEmpty = ({message}:InstrumentSearchResultEmptyTypes) => (
    <div className="instrument-search__empty">
        <span>{message}</span>
    </div>
)

export default InstrumentSearchResultEmpty