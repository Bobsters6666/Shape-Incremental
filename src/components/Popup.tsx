import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Popup {
  title?: string;
  description?: string;
  type: string;
}

const Popup = ({ title, description, type }: Popup) => {
  return (
    <div>
      {(() => {
        switch (type) {
          case "top":
            return (
              <>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 font-semibold text-lg">
                  |* New Equipment Unlocked *|
                </div>
              </>
            );
          case "popup":
            return (
              <Dialog defaultOpen>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle className="mb-10 text-lg text-center">
                      {title}
                    </DialogTitle>
                    <DialogDescription className="flex flex-col gap-4 text-center ">
                      {description}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            );
        }
      })()}
    </div>
  );
};

export default Popup;
