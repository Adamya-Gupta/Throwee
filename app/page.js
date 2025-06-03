import Hero from "./_components/Hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<p>Loading Hero...</p>}>
     <Hero/>
     </Suspense>
    </div>
  );
}
