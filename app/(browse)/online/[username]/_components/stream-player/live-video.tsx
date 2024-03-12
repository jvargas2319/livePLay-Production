"use client";

import { useRef, useState, useEffect } from "react";
import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";
import { useEventListener } from "usehooks-ts";
import { usePathname } from 'next/navigation';


import { VolumeControl } from "./volume-control";
import { FullscreenControl } from "./fullscreen-control";

interface LiveVideoProps {
  participant: string;
};

export const LiveVideo = ({
  participant,
}: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);
  const pathname = usePathname();
  const username = pathname.substring(pathname.lastIndexOf('/') + 1);

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };
  
  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };
  
  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen()
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen()
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  }

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

 

  return (
    <div 
    ref={wrapperRef}
    className="relative h-full flex"
  >
    <div className="relative w-full h-full overflow-hidden bottom-10">
  <div className="absolute bottom-0 left-0 right-0 top-0">
  <iframe
        className="iframe-data"
        title="Example iframe"
        src={`https://cherry.tv//embed/${username}/`}
        width="100%"
        height="100%"
        
      ></iframe>
  </div>
</div>
    
    <div className="absolute top-0 h-full w-full  ">
    
      <div className="absolute bottom-0 flex h-[102px] w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
        <VolumeControl
          onChange={onVolumeChange}
          value={volume}
          onToggle={toggleMute}
        />
        <FullscreenControl
          isFullscreen={isFullscreen}
          onToggle={toggleFullscreen}
        />
      </div>
    </div>
  </div>
    
  )
};
