import * as React from 'react'
import { redirect } from 'next/navigation'

import { DemoSiteWarningNotification } from './components/demo-site-warning-notification'
import { getUserAPI } from '@/queries/server/users'

export default async function DashboardLayout({
  children,
}: {
  children?: React.ReactNode
}) {
  const { user, error } = await getUserAPI()

  if (error) {
    console.error('Error in DashboardLayout:', error)
    redirect('/auth/signin')
  }

  if (!user) redirect('/auth/signin')
  if (user?.is_ban) redirect('/auth/blocked')
  // if (user?.deleted_at) redirect('/auth/deactivated')

  return (
    <>
      {process.env.NODE_ENV === 'production' ? (
        <DemoSiteWarningNotification />
      ) : null}
      {children}
    </>
  )
}