import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return <button onClick={() => signOut()}>Signout</button>;
  } else {
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Login
      </div>
    );
  }
};

export default Login;
