import Image from "next/image";
import Link from "next/link";

import { CustomButton } from "@/components";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";

const Navbar = () => {
  const session = false;

  return (
    <header className="w-full z-10">
      <nav className="flexBetween navbar">
        <Link href="/" className="flex-1 flexStart gap-10">
          <Image
            src="./logo.svg"
            alt="logo"
            width={100}
            height={70}
            className="object-contain"
          />
        </Link>

        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>

        <div className="flexCenter gap-4">
          {session ? (
            <>
             Userphoto

             <Link href='/create-project'>
              Share Work
             </Link>
            </>
          ) : (
            <AuthProviders />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
