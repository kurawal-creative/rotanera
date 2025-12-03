"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AvatarImage } from "@/components/ui/avatar"; // pastikan path ini sesuai struktur proyekmu
import clsx from "clsx";

export default function UserAvatar({ className = "" }) {
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [initials, setInitials] = useState<string | null>(null);

  return (
    <div
      className={clsx(
        `flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200`,
        className,
      )}
    >
      {photoURL ? (
        <Image
          src={photoURL}
          alt="Avatar"
          width={1024}
          height={1024}
          className={clsx(`rounded-full object-cover`, className)}
          referrerPolicy="no-referrer"
          unoptimized
        />
      ) : initials ? (
        <span className="text-sm font-semibold text-gray-700">{initials}</span>
      ) : (
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="avatar"
          className="rounded-full"
        />
      )}
    </div>
  );
}
