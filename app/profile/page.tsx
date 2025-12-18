import { Suspense } from "react";

import ProfileClient from "@/components/profile/ProfileClient";

export default function ProfilePage() {
  return (
    <Suspense fallback={<p>Loading profile...</p>}>
      <ProfileClient />
    </Suspense>
  );
}
