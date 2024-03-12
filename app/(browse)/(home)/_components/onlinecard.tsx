import Link from "next/link";
import { Stream, User } from "@prisma/client";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { LiveBadge } from "@/components/live-badge";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";

interface OnlineCardProps {
  data: {
    username: string,
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
};

export const OnlineCard = ({
  data,
}: OnlineCardProps) => {
  return (
    <Link href={`/${data.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.name}
          isLive={data.isLive}
          username={data.username}
        />
        <div className="flex gap-x-3">
         
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-blue-500">
              {data.name}
            </p>
            <p className="text-muted-foreground">
              {data.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const OnlineCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24"/>
        </div>
      </div>
    </div>
  );
};
