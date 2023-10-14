import Head from 'next/head'
import React, { useState } from 'react'
import AdminDashboardLayout from '../../components/layout/admin/AdminDashboardLayout'
import AdminTransaction from '../../features/admin/Transactions/AdminTransaction'
import { NextPageWithLayout } from '../_app'

const Transactions:NextPageWithLayout = () => {
  const [currentView, setCurrentView] = useState("")
  const handleClick = (text: string) => (evet: React.MouseEvent) => {
    setCurrentView(text)
  }
  return (
    <div>
        <Head>
            <title>QMSAI |Admin Transaction</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
      {currentView === "" && <AdminTransaction handleClick={handleClick}/>  }
    </div>
  )
}
Transactions.getLayout = AdminDashboardLayout
export default Transactions
