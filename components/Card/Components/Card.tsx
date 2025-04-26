"use client"

import { CardTypes } from "../Types/CardTypes"

const Card = ({title, child, className = ""}: CardTypes) => (
    <div className={className}>
        <h1>{title}</h1>
        {child}
    </div>
)

export default Card