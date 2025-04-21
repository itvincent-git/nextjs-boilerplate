import * as React from 'react'

import { SearchForm } from '@/components/search-form'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

// This is sample data.
const data = {
  navMain: [
    {
      title: 'index',
      url: '#',
      items: [
        {
          title: 'home',
          url: '/',
        },
      ],
    },
    {
      title: 'layouts',
      url: '#',
      items: [
        {
          title: 'flex',
          url: '/flex',
        },
        {
          title: 'grid',
          url: '/grid',
          isActive: false,
        },
        {
          title: 'position',
          url: '/position',
        },
      ],
    },
    {
      title: 'Data fetching',
      url: '#',
      items: [
        {
          title: 'ISR',
          url: '/isr',
        },
      ]
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations('sidebar')

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <span className="text-center text-xl font-bold">Next Boilerplate</span>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{t(item.title)}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <div className="gap-0 p-[0px]">
                        <Link href={item.url} className="h-full w-full p-2">
                          {t(item.title)}
                        </Link>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
