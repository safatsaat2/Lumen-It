import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  alt: string;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ alt, className, priority = false }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "relative inline-flex h-9 w-[9.5rem] shrink-0 items-center sm:h-10 sm:w-[11rem]",
        className,
      )}
    >
      <Image
        src="/logo-dark.png"
        alt={alt}
        fill
        sizes="176px"
        priority={priority}
        className="object-contain object-left dark:hidden"
      />
      <Image
        src="/logo-white.png"
        alt=""
        fill
        sizes="176px"
        priority={priority}
        aria-hidden
        className="hidden object-contain object-left dark:block"
      />
    </span>
  );
}
