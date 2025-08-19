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
  MoreHorizontal,
  ListMusic,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/shadcn/drawer";
import { Button } from "@/components/ui/shadcn/button";
import { Slider } from "@/components/ui/shadcn/slider";
import { Badge } from "@/components/ui/shadcn/badge";

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

  // Helper functions
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const allTracks = React.useMemo(() => [...tracks, ...customTracks], [tracks, customTracks]);

  // Player controls
  const handleNext = React.useCallback(() => {
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
  }, [currentTrack, allTracks, isShuffled, isPlaying]);

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
  }, [currentTrack, handleNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

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
          url,
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
        <DrawerContent className="h-full md:w-[420px] mt-0 ml-auto bg-gradient-to-b from-background to-background/95 backdrop-blur-xl border-l border-primary/10">
          {/* Header */}
          <DrawerHeader className="flex flex-row items-center justify-between border-b border-primary/10 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Music className="w-4 h-4 text-white" />
              </div>
              <div>
                <DrawerTitle className="text-lg font-semibold text-foreground">
                  Music Player
                </DrawerTitle>
                <DrawerDescription className="text-xs text-muted-foreground">
                  {allTracks.length} tracks available
                </DrawerDescription>
              </div>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Now Playing Section */}
            <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-primary/10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <motion.div
                  className="relative w-40 h-40 mx-auto"
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-primary rounded-full flex items-center justify-center shadow-2xl">
                    <div className="w-32 h-32 bg-background/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Music className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
                
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {currentTrack?.title || "No track selected"}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {currentTrack?.artist || "Select a track to play"}
                  </p>
                  {currentTrack && (
                    <Badge variant="secondary" className="text-xs">
                      {isPlaying ? "Now Playing" : "Paused"}
                    </Badge>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Progress Section */}
            <div className="px-6 py-4 space-y-3 bg-background/50">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
                disabled={!currentTrack}
              />
              <div className="flex justify-between text-xs text-muted-foreground font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls Section */}
            <div className="px-6 py-4 bg-background/80 border-b border-primary/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleShuffle}
                    className={`h-8 w-8 p-0 ${isShuffled ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Shuffle className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleRepeat}
                    className={`h-8 w-8 p-0 relative ${repeatMode !== "none" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Repeat className="w-4 h-4" />
                    {repeatMode === "one" && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={!currentTrack}
                    className="h-10 w-10 p-0 hover:bg-primary/10 disabled:opacity-50"
                  >
                    <SkipBack className="w-5 h-5" />
                  </Button>

                  <Button
                    onClick={() => handlePlay(currentTrack || allTracks[0])}
                    disabled={allTracks.length === 0}
                    className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-200"
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
                    className="h-10 w-10 p-0 hover:bg-primary/10 disabled:opacity-50"
                  >
                    <SkipForward className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLike}
                    className={`h-8 w-8 p-0 ${isLiked ? "text-red-500" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 mt-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleMute}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground font-mono w-8 text-right">
                  {Math.round(isMuted ? 0 : volume * 100)}
                </span>
              </div>
            </div>

            {/* Playlist Section */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-primary/10 bg-background/50">
                <div className="flex items-center gap-2">
                  <ListMusic className="w-4 h-4 text-primary" />
                  <h4 className="font-medium text-foreground">Queue</h4>
                  <Badge variant="outline" className="text-xs">
                    {allTracks.length}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-8 text-xs hover:bg-primary/10"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>

              <div className="flex-1 overflow-auto">
                <AnimatePresence>
                  {allTracks.length > 0 ? (
                    <div className="p-2">
                      {allTracks.map((track, index) => (
                        <motion.div
                          key={track.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            currentTrack?.id === track.id
                              ? "bg-primary/10 border border-primary/20"
                              : "hover:bg-muted/50 border border-transparent"
                          }`}
                          onClick={() => handlePlay(track)}
                        >
                          <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                              {currentTrack?.id === track.id && isPlaying ? (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  <Music className="w-4 h-4 text-primary" />
                                </motion.div>
                              ) : (
                                <Music className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                            {currentTrack?.id === track.id && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm truncate ${
                              currentTrack?.id === track.id ? "text-primary" : "text-foreground"
                            }`}>
                              {track.title}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {track.artist}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs text-muted-foreground font-mono">
                              {formatTime(track.duration)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-primary/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add more options here
                              }}
                            >
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full p-8 text-center"
                    >
                      <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                        <Music className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <h3 className="font-medium text-foreground mb-2">No tracks yet</h3>
                      <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                        Upload your favorite music files to start building your playlist
                      </p>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Music
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
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
