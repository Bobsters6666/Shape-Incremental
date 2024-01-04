import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="max-w-[1080px] mx-auto mt-8">
      <h2 className="text-3xl font-bold underline">Logs</h2>
      <div></div>
      <div>
        <Button variant={"link"}>
          <Link href="/">Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
