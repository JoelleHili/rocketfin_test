"use client"

import { CardTypes } from "../Types/CardTypes"

const Card = ({title, value, className = ""}: CardTypes) => (
    <div className={className}>
        <h1>{title}</h1>
        <text>{value}</text>
    </div>
)

export default Card