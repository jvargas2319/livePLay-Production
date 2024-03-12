'use client'


import { Header } from './_components/stream-player/header';


import { cn } from '@/lib/utils';
import { useChatSidebar } from '@/store/use-chat-sidebar';
// app/(browse)/online/[username]/page.tsx
import { usePathname } from 'next/navigation';
import { Video } from './_components/stream-player/video';
import { ChatToggle } from './_components/stream-player/chat-toggle';
import { InfoCard } from './_components/stream-player/info-card';
import { AboutCard } from './_components/stream-player/about-card';
import { Chat } from './_components/stream-player/chat';



const UserPage = () => {
  const pathname = usePathname();
  const username = pathname.substring(pathname.lastIndexOf('/') + 1);
  const id = "1234"
  const identity = "hi"
  const token = id
  const imageUrl = 'hi'
  const isFollowing = true
  const num = 2324
  const thumbnailUrl = 'hi'

  const { collapsed } = useChatSidebar((state) => state);

  return (
    <>
    {collapsed && (
      <div className="hidden lg:block fixed top-[100px] right-2 z-50">
        <ChatToggle />
      </div>
    )}
    <div
      
      className={cn(
        "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
        collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
      )}
    >
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <Video
          hostName={username}
          hostIdentity={id}
        />
         <Header
            hostName={username}
            hostIdentity={id}
            viewerIdentity={identity}
            imageUrl={imageUrl}
            isFollowing={isFollowing}
            name={username}
          />
        
        <InfoCard
          hostIdentity={id}
          viewerIdentity={identity}
          name={username}
          thumbnailUrl={thumbnailUrl}
        />
        <AboutCard
          hostName={username}
          hostIdentity={id}
          viewerIdentity={identity}
          bio={username}
          followedByCount={num}
        />
      </div>
      <div
        className={cn(
          "col-span-1",
          collapsed && "hidden"
        )}
      >
        <Chat
          viewerName={username}
          hostName={username}
          hostIdentity={id}
          isFollowing={isFollowing}
          isChatEnabled={true}
          isChatDelayed={false}
          isChatFollowersOnly={false}
        />
      </div>
    </div>
  </>
  );
};

export default UserPage;