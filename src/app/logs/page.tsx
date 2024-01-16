import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="max-w-[1080px] mx-auto mt-8">
      <h2 className="text-3xl font-bold underline">Logs</h2>
      <div>
        <h3 className="text-xl font-bold mt-12 mb-4">v1.02</h3>
        <ul className="flex flex-col gap-2">
          <li className="">Added bulk upgrades for hero</li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mt-12 mb-4">v1.01</h3>
        <ul className="flex flex-col gap-2">
          <li className="">Can now equip different equipments</li>
          <li>Different equipments provides different bonuses</li>
          <li>Boss now drops equipments every 5 stages</li>
          <li>Added shiny enemies</li>
        </ul>
      </div>

      <div className="mt-8">
        <Button variant={"link"}>
          <Link href="/">Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
