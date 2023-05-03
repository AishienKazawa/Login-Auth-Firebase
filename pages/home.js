import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const regex = /\([^\)]*\)\s*$/;

  const username = user?.displayName.replace(regex, ""); // remove if there's a matches based on the regex

  // if there's a current user or not
  if (user) {
    return (
      <main className="h-screen grid place-items-center">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={user.photoURL}
            alt={user.photoURL}
            width={100}
            height={100}
            className="rounded-full"
          />

          <h2>{username}</h2>
          <button
            onClick={() => auth.signOut()}
            className="w-fit p-3 rounded-lg bg-green-600 text-white"
          >
            Sign out
          </button>
        </div>
      </main>
    );
  } else {
    router.push("/signIn");
  }
}
