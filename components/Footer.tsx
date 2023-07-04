import { footerLinks } from "@/constants";

import Image from "next/image";
import Link from "next/link";

type ColumnProps = {
  links: Array<string>;
  title: string;
};

const FooterColumn = ({ links, title }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image
            src="./logo-purple.svg"
            alt="flexibble purple logo"
            width={114}
            height={40}
          />

          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Flexibble is your number one source for dev and design work. Find
            designers and developers to collaborate with on your next project.
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          {footerLinks?.map((links) => (
            <FooterColumn
              title={links.title}
              links={links.links}
            />
          ))}
        </div>
      </div>

      <div className="flexBetween footer_copyright">
         <p>@ 2023 Flexibble. All right reserved</p>
         <p className="text-gray">
          <span className="text-black font-semibold">10,214 </span>
          Projects submitted
         </p>
      </div>
    </footer>
  );
};

export default Footer;
