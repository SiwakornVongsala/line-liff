import ProfileClient from "@/components/index/ProfileClient";
import { Suspense } from "react";


export default function ProfilePage() {
  return (
    <Suspense fallback={<p>Loading profile...</p>}>
      <ProfileClient />
    </Suspense>
  );
}
