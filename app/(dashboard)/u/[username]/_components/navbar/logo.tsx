import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className=" rounded-full  mr-12 shrink-0 lg:mr-0 lg:shrink">
          <Image
            src="/assets/images/logo.png"
            alt="Gamehub"
            height="70"
            width="70"
          />
        </div>
        <div className={cn(
          "hidden lg:block",
          font.className
        )}>
          <p className="text-lg font-semibold">
            LivePlay
          </p>
          <p className="text-xs text-muted-foreground">
          Passion Unleashed, Desires Streamed
          </p>
        </div>
      </div>
    </Link>
  );
};
