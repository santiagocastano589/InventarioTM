import React from 'react'
import { Table } from '../../Table/Table'
import './Main.css'
import { Header } from '../Header/Header'

export const Main = ( {children} ) => {
  return (
    <>
        <main>
            {children}
        </main>
    </>
  )
}
