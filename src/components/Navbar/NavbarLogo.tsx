import Link from "next/link";
import Image from "next/image";

export const NavbarLogo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image src="/logo.png" width={64} height={64} alt={"skeleton"} />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Full Skeleton
      </span>
    </Link>
  );
};
