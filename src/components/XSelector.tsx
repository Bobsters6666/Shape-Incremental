import React, { useState } from "react";

import { Check, ChevronUp, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Options = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "10",
    label: "10",
  },
  {
    value: "100",
    label: "100",
  },
  {
    value: "max",
    label: "max",
  },
];

const XSelector = ({ value, setValue }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute right-0">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[80px] justify-between"
          >
            {value
              ? Options.find((option) => option.value === value)?.label
              : "1x"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-75" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[80px] p-0">
          <Command>
            <CommandGroup>
              {Options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : `${currentValue}`);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      value === option.value ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {option.label}
                  {option.value !== "max" && "x"}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default XSelector;
