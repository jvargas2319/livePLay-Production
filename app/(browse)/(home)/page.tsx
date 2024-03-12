import { Suspense } from "react";

import { Results, ResultsSkeleton } from "./_components/results";
import { Online } from "./_components/online";
import Head from "next/head";

export default function Page() {
  return (
    
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
    </Head>
      <Suspense fallback={<ResultsSkeleton />}>
      <Online />
        
      </Suspense>
    </div>
  );
};
