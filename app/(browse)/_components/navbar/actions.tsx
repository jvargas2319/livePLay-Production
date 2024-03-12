import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { 
  SignInButton, 
  SignUpButton, 
  UserButton, 
  auth, 
  currentUser
} from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUserByUsername } from "@/lib/user-service";
import { getUserById } from "@/lib/actions/user.actions";

export const Actions = async () => {
  const user = await currentUser();
  const { userId } = auth();

  
  
  let user1
  if (!userId) {
   console.log('hi')
  } else {
     user1 = await getUserById(userId);
    
  }
  
  
  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <>
        <SignUpButton>
          <Button size="sm" variant="primary">
            Sign Up
          </Button>
        </SignUpButton>
        <SignInButton>
        <Button size="sm" variant="primary">
          Login
        </Button>
      </SignInButton>
      </>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          Tokens: {user1.creditBalance}
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">
                Dashboard
              </span>
            </Link>
          </Button>
          <UserButton
            afterSignOutUrl="/"
          />
        </div>
      )}
    </div>
  );
};
