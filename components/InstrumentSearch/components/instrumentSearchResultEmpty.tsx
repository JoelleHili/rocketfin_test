"use client"

import { InstrumentSearchResultEmptyTypes } from "../types/instrumentSearchTypes"

const InstrumentSearchResultEmpty = ({message}:InstrumentSearchResultEmptyTypes) => (
    <div>
        <span>{message}</span>
    </div>
)

export default InstrumentSearchResultEmpty