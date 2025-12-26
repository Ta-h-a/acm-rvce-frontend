'use client'

import * as React from 'react'
import { EventHeader } from '@/components/events/events-header'
import { EventFilter } from '@/components/events/events-filter'
import { EventList } from '@/components/events/events-list'
import type { EventsQueryResult } from '@/sanity.types'

const eventConfig = {
  title: 'Events',
  description: 'Stay updated with ACM RVCE\'s latest events and activities.',
}

function getAllCategories(events: EventsQueryResult) {
  if (!events) return []
  const categories = new Set(events.map((event) => event.category).filter(Boolean) as string[])
  return Array.from(categories)
}

interface EventPageClientProps {
  events: EventsQueryResult
}

export function EventPageClient({ events }: EventPageClientProps) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

  const allEvents = events || []
  const allCategories = getAllCategories(allEvents)

  const filteredEvents = React.useMemo(() => {
    return allEvents.filter((event) => {
      if (!event) return false
      const matchesSearch =
        searchTerm === '' ||
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === null || event.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [allEvents, searchTerm, selectedCategory])

  return (
    <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
      <EventHeader
        title={eventConfig.title}
        description={eventConfig.description}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="mb-8">
        <EventFilter
          categories={allCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      <EventList events={filteredEvents} />
    </div>
  )
}
