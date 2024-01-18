import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Change =
  | string
  | {
      [key: string]: string[];
    };

const logs = [
  {
    version: 1.03,
    changes: [
      {
        "Added Achievement Shop:": [
          "Can use achievement points to purchase permanent multipliers",
        ],
      },
      "Completing achievements now grants achievement points",
    ],
  },
  {
    version: 1.02,
    changes: ["Added bulk upgrades for hero"],
  },
  {
    version: 1.01,
    changes: [
      "Can now equip different equipments",
      "Different equipments provide different bonuses",
      "Boss now drops equipments every 5 stages",
      "Added shiny enemies",
    ],
  },
];

const page = () => {
  return (
    <div className="max-w-[1080px] mx-auto mt-8">
      <h2 className="text-3xl font-bold underline">Logs</h2>

      <div>
        {logs.map((log) => (
          <div key={log.version}>
            <h3 className="text-xl font-bold mt-12 mb-4">{log.version}</h3>
            <ul className="flex flex-col gap-2 list-disc">
              {/* Mapping through logs array */}
              {log.changes.map((change: Change) => {
                // If list item is object we need to do nested map
                if (typeof change === "object") {
                  return Object.keys(change).map((obj) => (
                    <ul
                      key={obj.slice(0, 3)}
                      className="flex flex-col gap-2 font-semibold list-disc mb-2"
                    >
                      <li className="ml-4">{obj}</li>
                      {change[obj].map((c) => (
                        <li className="font-[400] ml-10" key={c}>
                          {c}
                        </li>
                      ))}
                    </ul>
                  ));
                }
                // Otherwise just simply return the list item
                else {
                  return (
                    <li className="ml-4" key={change}>
                      {change}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        ))}
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
