"use client";



import { Skeleton } from "@/components/ui/skeleton";
import { LiveVideo } from "./live-video";




interface VideoProps {
  hostName: string;
  hostIdentity: string;
};

export const Video = ({
  hostName,
  hostIdentity,
}: VideoProps) => {
  
 
  let content;
  content = <LiveVideo participant={hostName} />
  

  return (
    <div className="aspect-video border-b group relative ">
        
      {content}
      
    </div>
  );
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};
