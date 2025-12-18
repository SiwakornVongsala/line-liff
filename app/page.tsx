import { Suspense } from "react";

import HomeClient from "@/components/home/HomeClient";

export default function HomePage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HomeClient />
    </Suspense>
  );
}
