import React from 'react'
import { Grid } from 'semantic-ui-react'
import Dashboard from './Dashboard'
import Navi from './Navi'

export default function HomePage() {
  return (
    <div>
        <Navi/>
        <Dashboard/>
    </div>
  )
}
