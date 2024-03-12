"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";

import { Hint } from "@/components/hint";
import { Slider } from "@/components/ui/slider";
import { FormEvent, useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
};

type WSResults = {
	price: string;
	title: string;
	review: string;
	imageUrl: string;
};

export const VolumeControl = ({
  onToggle,
  onChange,
  value,
}: VolumeControlProps) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;
  const [searchPrompt, setSearchPrompt] = useState("");
	const [searchResults, setSearchResults] = useState<WSResults[]>([]);
	const [isLoading, setIsLoading] = useState(false);
  

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = isMuted ? "Unmute" : "Mute";

  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };
  const pathname = usePathname();
  const handleSubmit = async () => {
		
  const searchPrompt= pathname.substring(pathname.lastIndexOf('/') + 1);
		setIsLoading(true);

		const res = await fetch("/searchprod", {
			method: "POST",
			body: JSON.stringify({ searchPrompt}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		// const { products } = await res.json();
    

		// console.log(products);
		// setSearchResults(products);
		// console.log(searchResults);
		
	};

  return (
    <div className="flex items-center gap-2">
      
        <button
          onClick={handleSubmit}
          className="text-white hover:bg-white/10 p-1.5 rounded-lg"
          title="hi"
        >
          <Icon className="h-6 w-6" />
          mute
        </button>
      
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  );
};