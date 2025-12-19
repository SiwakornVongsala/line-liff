import ProfileClient from "@/components/profile/ProfileClient";
import { Suspense } from "react";


export default function ProfilePage() {
  return (
    <Suspense fallback={<p>Loading profile...</p>}>
      <ProfileClient />
    </Suspense>
  );
}
