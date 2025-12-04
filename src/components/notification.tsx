"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const Notification = () => {
  const [open, setOpen] = useState(false);
  const notifications: never[] = []; // dummy kosong

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-lg border shadow-xs"
        >
          <Bell className="h-5 w-5 text-neutral-700" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" align="end" className="w-72 p-3">
        <div className="mb-2 text-sm font-medium">Notifikasi</div>
        {notifications.length === 0 ? (
          <div className="text-sm text-neutral-500">Tidak ada notifikasi</div>
        ) : (
          <div className="space-y-2">{/* map notifikasi di sini */}</div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
