"use client"

import { CardTypes } from "../Types/CardTypes"

const Card = ({title, value}: CardTypes) => (
    <div>
        <h1>{title}</h1>
        <span>{value}</span>
    </div>
)

export default Card