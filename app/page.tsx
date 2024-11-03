'use client'

import { useState } from 'react'
import SearchPanel from '../components/SearchPanel'
import ControlPanel from '../components/ControlPanel'

type Song = {
  id: string
  title: string
  artist: string
  url: string
}

export default function Home() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)

  return (
    <main className="flex min-h-screen bg-gray-100">
      <SearchPanel onSongSelect={setCurrentSong} />
      <ControlPanel currentSong={currentSong} />
    </main>
  )
}