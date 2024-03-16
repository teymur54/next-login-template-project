"use client";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <p className="text-sky-600"> Hello {session?.user.username}</p>
      <button className="text-red-500" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
}
