"use client";

import Image from "next/image";
import { AvatarImage } from "@/components/ui/avatar"; // pastikan path ini sesuai struktur proyekmu
import clsx from "clsx";

interface UserAvatarProps {
  className?: string;
  src?: string | null;
  alt?: string;
  fallbackInitials?: string;
}

export default function UserAvatar({
  className = "",
  src,
  alt = "Avatar",
  fallbackInitials,
}: UserAvatarProps) {
  const initials =
    fallbackInitials ||
    alt
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div
      className={clsx(
        `flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200`,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={32}
          height={32}
          sizes="2rem"
          className={clsx(`rounded-full object-cover`, className)}
          referrerPolicy="no-referrer"
          unoptimized
        />
      ) : initials ? (
        <span className="text-sm font-semibold text-gray-700">{initials}</span>
      ) : (
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt={alt}
          className="rounded-full"
        />
      )}
    </div>
  );
}

// export default function UserAvatar({ className = "" }) {
//   const [photoURL, setPhotoURL] = useState<string | null>(null);
//   const [initials, setInitials] = useState<string | null>(null);

//   return (
//     <div
//       className={clsx(
//         `flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200`,
//         className,
//       )}
//     >
//       {photoURL ? (
//         <Image
//           src={photoURL}
//           alt="Avatar"
//           width={1024}
//           height={1024}
//           className={clsx(`rounded-full object-cover`, className)}
//           referrerPolicy="no-referrer"
//           unoptimized
//         />
//       ) : initials ? (
//         <span className="text-sm font-semibold text-gray-700">{initials}</span>
//       ) : (
//         <AvatarImage
//           src="https://github.com/shadcn.png"
//           alt="avatar"
//           className="rounded-full"
//         />
//       )}
//     </div>
//   );
// }
