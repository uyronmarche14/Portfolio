"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
  X,
  Upload,
} from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/shadcn/drawer";
import { Button } from "@/components/ui/shadcn/button";
import { Slider } from "@/components/ui/shadcn/slider";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  url: string;
  cover?: string;
}

interface MusicPlayerProps {
  trigger?: React.ReactNode;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ trigger }) => {
  // Sample tracks - replace with your own music files
  const [tracks] = useState<Track[]>([
    {
      id: 1,
      title: "Sample Track 1",
      artist: "Artist 1",
      duration: 180,
      url: "/sample1.mp3", // Replace with actual audio files
    },
    {
      id: 2,
      title: "Sample Track 2",
      artist: "Artist 2",
      duration: 220,
      url: "/sample2.mp3",
    },
    {
      id: 3,
      title: "Sample Track 3",
      artist: "Artist 3",
      duration: 195,
      url: "/sample3.mp3",
    },
  ]);

  // Player state
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"none" | "one" | "all">("none");
  const [isLiked, setIsLiked] = useState(false);
  const [customTracks, setCustomTracks] = useState<Track[]>([]);

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Effects
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Helper functions
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const allTracks = [...tracks, ...customTracks];

  // Player controls
  const handlePlay = (track?: Track) => {
    if (track && track !== currentTrack) {
      setCurrentTrack(track);
      setCurrentTime(0);
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (!currentTrack) return;

    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    let nextIndex;

    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * allTracks.length);
    } else {
      nextIndex = (currentIndex + 1) % allTracks.length;
    }

    const nextTrack = allTracks[nextIndex];
    setCurrentTrack(nextTrack);
    setCurrentTime(0);

    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play().catch(console.error);
      }, 100);
    }
  };

  const handlePrevious = () => {
    if (!currentTrack) return;

    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex =
      currentIndex === 0 ? allTracks.length - 1 : currentIndex - 1;
    const prevTrack = allTracks[prevIndex];

    setCurrentTrack(prevTrack);
    setCurrentTime(0);

    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play().catch(console.error);
      }, 100);
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes: ("none" | "one" | "all")[] = ["none", "one", "all"];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith("audio/")) {
        const url = URL.createObjectURL(file);
        const newTrack: Track = {
          id: Date.now() + index,
          title: file.name.replace(/\.[^/.]+$/, ""),
          artist: "Unknown Artist",
          duration: 0,
          url: url,
        };
        setCustomTracks((prev) => [...prev, newTrack]);
      }
    });
  };

  return (
    <>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          {trigger || (
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-xl px-4 py-2 border border-white/20 hover:border-white/40"
            >
              <Music className="w-4 h-4" />
            </Button>
          )}
        </DrawerTrigger>
        <DrawerContent className="h-full md:w-[50%] mt-24 ml-auto">
          <DrawerHeader className="flex flex-row items-center justify-between border-b">
            <div>
              <DrawerTitle className="text-xl font-semibold">
                Music Player
              </DrawerTitle>
              <DrawerDescription>
                Your personal music collection
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex-1 flex flex-col p-6 space-y-6">
            {/* Current Track Display */}
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-white/10">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
                  <Music className="w-16 h-16 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {currentTrack?.title || "No track selected"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentTrack?.artist || "Select a track to play"}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
                disabled={!currentTrack}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleShuffle}
                className={
                  isShuffled ? "text-blue-500" : "text-muted-foreground"
                }
              >
                <Shuffle className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={!currentTrack}
              >
                <SkipBack className="w-5 h-5" />
              </Button>

              <Button
                onClick={() => handlePlay(currentTrack || allTracks[0])}
                disabled={allTracks.length === 0}
                className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                disabled={!currentTrack}
              >
                <SkipForward className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleRepeat}
                className={
                  repeatMode !== "none"
                    ? "text-blue-500"
                    : "text-muted-foreground"
                }
              >
                <Repeat className="w-4 h-4" />
                {repeatMode === "one" && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={toggleMute}>
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="flex-1"
              />
            </div>

            {/* Track List */}
            <div className="flex-1 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Playlist</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Add Music
                </Button>
              </div>

              <div className="space-y-2">
                {allTracks.map((track) => (
                  <div
                    key={track.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      currentTrack?.id === track.id
                        ? "bg-blue-500/10 border-blue-500/30"
                        : "hover:bg-muted/50 border-transparent"
                    }`}
                    onClick={() => handlePlay(track)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
                        <Music className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{track.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {track.artist}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {currentTrack?.id === track.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike();
                          }}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isLiked
                                ? "fill-red-500 text-red-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        </Button>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatTime(track.duration)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {allTracks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No tracks available</p>
                  <p className="text-sm">
                    Upload some music files to get started
                  </p>
                </div>
              )}
            </div>
          </div>

          <DrawerFooter className="border-t">
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={toggleShuffle}>
                <Shuffle
                  className={`w-4 h-4 mr-2 ${
                    isShuffled ? "text-blue-500" : ""
                  }`}
                />
                Shuffle
              </Button>
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Add Music
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={currentTrack?.url} preload="metadata" />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />
    </>
  );
};

export default MusicPlayer;
