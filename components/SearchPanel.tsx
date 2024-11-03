'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

type Song = {
  id: string
  title: string
  artist: string
  url: string
}

const mockSongs: Song[] = [
  { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', url: 'https://example.com/bohemian_rhapsody.mp3' },
  { id: '2', title: 'Imagine', artist: 'John Lennon', url: 'https://example.com/imagine.mp3' },
  { id: '3', title: 'Billie Jean', artist: 'Michael Jackson', url: 'https://example.com/billie_jean.mp3' },
]

export default function SearchPanel({ onSongSelect }: { onSongSelect: (song: Song) => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Song[]>([])

  const handleSearch = () => {
    const results = mockSongs.filter(
      song => song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  return (
    <div className="w-1/3 bg-white p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Search Music</h2>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Search for songs or artists"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      <ul className="space-y-2">
        {searchResults.map((song) => (
          <li
            key={song.id}
            className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
            onClick={() => onSongSelect(song)}
          >
            <h3 className="font-semibold">{song.title}</h3>
            <p className="text-sm text-gray-600">{song.artist}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}