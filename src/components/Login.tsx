import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from "@/utils/authOptions";
import { Button } from "./ui/button";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button variant={"link"} onClick={() => signOut()}>
        Signout
      </Button>
    );
  } else {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Login
      </Button>
    );
  }
};

export default Login;
