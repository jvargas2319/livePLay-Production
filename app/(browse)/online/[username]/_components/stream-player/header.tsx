
import { UserIcon } from "lucide-react";


import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";

import { Actions, ActionsSkeleton } from "./actions";

import {  auth, currentUser, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById, updateCredits } from "@/lib/actions/user.actions";
import { getSelf } from "@/lib/auth-service";
import { Tip } from "@/components/tip";



interface HeaderProps {
  imageUrl: string;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  isFollowing: boolean;
  name: string;
};

export const Header = async ({
  imageUrl,
  hostName,
  hostIdentity,
  viewerIdentity,
  isFollowing,
  name,
}: HeaderProps) => {
  
  
  
  

  

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;
  const isLive  = true

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={true}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">
              {hostName} 
            </h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">
            {name}
          </p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500"> 
              <UserIcon className="h-4 w-4" />
              
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              Offline
            </p>
          )}
        </div>
        
      </div>
  
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
};
