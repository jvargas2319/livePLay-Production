"use client";

import { Thumbnail } from "@/components/thumbnail";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type WSResults = {
	
	title: string;
	
	imageUrl: string;
};

export const Online = async () => {
	const searchPrompt = 'watches' 
	const [searchResults, setSearchResults] = useState<WSResults[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
    const handleSubmit = async () => {
      
      setIsLoading(true);
      try {
        const res = await fetch("/ommodel", {
          method: "POST",
          body: JSON.stringify({ searchPrompt}),

          headers: {
            "Content-Type": "application/json",
          },
        });
        const { products } = await res.json();

        // Assuming products is an array of Room objects
        // Add each product to the rooms state
        if (products && Array.isArray(products)) {
          setSearchResults(products); // Directly set the rooms if products replace them entirely
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleSubmit();
  }, []); // Empty dependency array means this runs once on component mount
  return (
    <div>
      <h1>Online Rooms</h1>
      {isLoading && <div className="loader">Loading
  <span></span>
</div>}
      <ul>
        <li>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {searchResults?.map((searchResult) => (
            <>
              
              <Link href={`/online/${searchResult.title}`}>
                
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={searchResult.imageUrl}
          fallback={searchResult.title}
          isLive={true}
          username={searchResult.title}
        />
        <div className="flex gap-x-3">
         
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-blue-500">
              {searchResult.title}
            </p>
            <p className="text-muted-foreground">
              {searchResult.title}
            </p>
          </div>
        </div>
      </div>
    </Link>
          </>
        ))}
        </div>
        </li>
      </ul>
    </div>
  );
};

