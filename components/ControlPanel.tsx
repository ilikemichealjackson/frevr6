'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Repeat, Volume2 } from 'lucide-react'
import { Button } from './ui/button'
import { Slider } from './ui/slider'

type Song = {
  id: string
  title: string
  artist: string
  url: string
}

export default function ControlPanel({ currentSong }: { currentSong: Song | null }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLooping, setIsLooping] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [currentSong])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLooping
      setIsLooping(!isLooping)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-2/3 bg-gray-800 p-6 rounded-l-3xl flex flex-col justify-center items-center">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      {currentSong && (
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{currentSong.title}</h2>
          <p className="text-gray-400">{currentSong.artist}</p>
        </div>
      )}
      <div className="w-full max-w-md">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={(value) => handleSeek(value[0])}
          className="mb-4"
        />
        <div className="flex justify-between text-gray-400 mb-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="flex justify-center space-x-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)}>
            <SkipBack className="h-6 w-6 text-white" />
          </Button>
          <Button variant="ghost" size="icon" onClick={togglePlay}>
            {isPlaying ? (
              <Pause className="h-6 w-6 text-white" />
            ) : (
              <Play className="h-6 w-6 text-white" />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => audioRef.current && (audioRef.current.currentTime += 10)}>
            <SkipForward className="h-6 w-6 text-white" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Volume2 className="h-5 w-5 text-white" />
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={(value) => handleVolumeChange(value[0])}
            className="w-32"
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLoop}
          className={`mt-4 ${isLooping ? 'text-primary' : 'text-white'}`}
        >
          <Repeat className="h-5 w-5 mr-2" />
          Loop
        </Button>
      </div>
    </div>
  )
}