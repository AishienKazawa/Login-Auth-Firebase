import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

export default function SignIn() {
  //initilize
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const [user] = useAuthState(auth);

  // firebase auth API to signin with google provider
  const googleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      GoogleAuthProvider.credentialFromResult(res);

      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  // firebase auth API to signin with facebook provider
  const facebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      FacebookAuthProvider.credentialFromResult(result);

      // auto update user profile if there's a changes in facebook platform
      let photoUrl =
        result.user.photoURL + "?height=200&access_token=" + accessToken;
      await updateProfile(auth.currentUser, { photoURL: photoUrl });

      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  // if there's a current user or not
  if (user) {
    router.push("/home");
  } else {
    return (
      <main className="w-full h-screen grid place-items-center">
        <div className="w-1/4 flex flex-col justify-center items-center">
          <Image src={"/logo.png"} alt="logo" width={40} height={40} />

          <h1 className="font-DSD text-4xl mb-3 mt-2">Evernote</h1>
          <span className="text-sm mb-10">Remember everything important.</span>

          <button
            onClick={googleLogin}
            className="w-full h-fit py-2 mb-4 flex gap-5 items-center justify-center rounded-lg border-2"
          >
            <Image src={"/google.svg"} alt="logo" width={40} height={40} />
            Continue with Google
          </button>

          <button
            onClick={facebookLogin}
            className="w-full h-fit py-2 flex gap-5 items-center justify-center rounded-lg border-2"
          >
            <Image src={"/facebook.svg"} alt="logo" width={40} height={40} />{" "}
            Continue with Facebook
          </button>

          <div className="thin-line relative my-10">
            {" "}
            <span className="thin-line-text">or</span>{" "}
          </div>

          <form className="w-full grid gap-4" autoComplete="off">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-2 p-3"
            />

            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-green-600 text-white"
            >
              Continue
            </button>
          </form>
        </div>
      </main>
    );
  }
}
