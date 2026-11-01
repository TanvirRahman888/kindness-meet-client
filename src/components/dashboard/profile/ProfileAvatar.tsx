
"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  name: string;
  image?: string | null;
  size?: "md" | "lg";
};

export default function ProfileAvatar({
  name,
  image,
  size = "lg",
}: Props) {
  const [failedImage, setFailedImage] = useState<string | null>(
    null
  );

  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  const showImage = image && failedImage !== image;

  const sizeClass =
    size === "lg"
      ? "size-28 text-3xl sm:size-32"
      : "size-16 text-xl";

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-surface bg-accent/10 font-bold text-accent shadow-md ${sizeClass}`}
    >
      {showImage ? (
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          sizes="128px"
          onError={() => setFailedImage(image)}
          className="object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}
