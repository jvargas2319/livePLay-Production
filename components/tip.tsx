'use client'
import { UserIcon } from "lucide-react";


import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";



import {  auth, currentUser, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {  updateCredits } from "@/lib/actions/user.actions";
import { getSelf } from "@/lib/auth-service";
import { getUserByUsername } from "@/lib/user-service";
import { getUsers } from "@/actions/user";
import { TailwindcssButtons } from "./buttons";
import { usePathname } from 'next/navigation'
import { InsufficientCreditsModal } from "./InsufficientCreditsModal";
import { useEffect, useState } from "react";
import { getUserById } from "@/lib/actions/user.actions";

interface UserDetails {
  id: string;
  creditBalance: number;
  userDetails : number
  // other properties
}

interface HeaderProps {
  imageUrl: string;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  isFollowing: boolean;
  name: string;
};

export const Tip =  () => {
  const creditFee = -30
  const pathname = usePathname()
  const isDynamicRoute = /\/online\/[^\/]+$/.test(pathname);
  console.log(isDynamicRoute)
  console.log( 'path', pathname)

  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  if (!user){
    console.log('no user')
  }

  if (!userDetails){
    console.log('no user')
  }
  console.log(user)

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const user1 = await getUserById(user.id);
          console.log(user1.creditBalance)
          setUserDetails(user1);
        } catch (error) {
          console.error('Failed to fetch user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [user]);

   
    
 
  
 


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    

    event.preventDefault();
    if (!userDetails || userDetails.creditBalance === undefined || userDetails.creditBalance < Math.abs(creditFee)) {
      console.log('Insufficient credits or user details not loaded');
      return; // Stop function execution
    }
   

  const   user   = await getUsers()
  console.log('hii',user)
    
    await updateCredits(user, creditFee)
    window.location.reload();
   
  };
  

 

  return (
  
      <>

{isDynamicRoute && userDetails &&  (
        <form onSubmit={handleSubmit}>
          
          { userDetails.creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}
        <button type="submit" className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Tip 30 Tokens!
          </span>
        </button>
        
      </form>
      )}
      
    
    
    </>
  );
};

