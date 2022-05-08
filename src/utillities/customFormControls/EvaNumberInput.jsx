import React from 'react'
import EvaTextInput from './EvaTextInput'

export default function EvaNumberInput({ ...props }) {

    return (
        <EvaTextInput type="number" {...props} />
    )
}
