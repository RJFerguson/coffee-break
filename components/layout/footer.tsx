import Link from "next/link";
import { navLinks, navSignedLinks } from "@/lib/links";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Footer(isAuthenticated: any) {
  const handleLinks = (auth: boolean) => {
    if (auth) {
      return navSignedLinks.map((link) => {
        if (link.route === "Sign Up") {
          return (
            <li key={link.route}>
              <LogoutLink className="mr-4 hover:underline md:mr-6">
                Sign up
              </LogoutLink>
            </li>
          );
        }
        if (link.route === "Sign In") {
          return (
            <li key={link.route}>
              <LoginLink className="mr-4 hover:underline md:mr-6">
                Sign in
              </LoginLink>
            </li>
          );
        } else {
          return (
            <li key={link.route}>
              <Link href={link.path}>{link.route}</Link>
            </li>
          );
        }
      });
    } else {
      return navLinks.map((link) => {
        if (link.route === "Sign Up") {
          return (
            <li key={link.route}>
              <RegisterLink>Sign up</RegisterLink>
            </li>
          );
        }
        if (link.route === "Sign In") {
          return (
            <li key={link.route}>
              <LoginLink>Sign in</LoginLink>
            </li>
          );
        } else {
          return (
            <li key={link.route}>
              <Link href={link.path} className="mr-4 hover:underline md:mr-6">
                {link.route}
              </Link>
            </li>
          );
        }
      });
    }
  };
  return (
    <footer className="mt-auto">
      <div className="mx-auto w-full max-w-screen-xl p-6 md:py-8">
        <div className="flex flex-col">
          <hr className="my-6 text-muted-foreground sm:mx-auto lg:my-8" />

          <ul className="mb-6 flex flex-wrap items-center text-primary opacity-60 mb-0 justify-between text-sm">
            {handleLinks(isAuthenticated.isAuthenticated)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
