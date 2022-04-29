import { Field, useField } from 'formik'
import React from 'react'
import { FormField, Input, Label } from 'semantic-ui-react'
import EvaTextInput from './EvaTextInput'

export default function EvaNumberInput({ ...props }) {

    return (
        <EvaTextInput type="number" {...props} />
    )
}
