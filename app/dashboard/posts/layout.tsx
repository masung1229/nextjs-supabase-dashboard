import * as React from 'react'

import { AppBarProvider } from '@/components/app-bar/app-bar-provider'
import { AppBar } from '@/components/app-bar'
import { MiniNavigation } from '@/app/dashboard/components/mini-navigation'

import { dashboardConfig } from '@/config/dashboard'
import { getUser } from '@/queries/server'

export default async function PostListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getUser()

  return (
    <div className="body-overflow-hidden flex h-screen w-screen">
      <AppBarProvider>
        <MiniNavigation
          nav={dashboardConfig?.nav}
          user_role={user?.user?.role}
        />
        <div className="flex flex-1 flex-col">
          <AppBar />
          {children}
        </div>
      </AppBarProvider>
    </div>
  )
}
