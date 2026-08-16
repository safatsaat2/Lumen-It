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
        "relative inline-flex h-11 w-[13rem] shrink-0 items-center sm:h-12 sm:w-[15rem] lg:h-14 lg:w-[17.5rem]",
        className,
      )}
    >
      <Image
        src="/logo-white.png"
        alt={alt}
        fill
        sizes="(min-width: 1024px) 280px, 240px"
        priority={priority}
        className="object-contain object-left dark:hidden"
      />
      <Image
        src="/logo-dark.png"
        alt=""
        fill
        sizes="(min-width: 1024px) 280px, 240px"
        priority={priority}
        aria-hidden
        className="hidden object-contain object-left dark:block"
      />
    </span>
  );
}
