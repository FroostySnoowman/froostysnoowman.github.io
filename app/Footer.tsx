import { ParallaxLayer } from "@react-spring/parallax";
import { fontJersey15, fontInter } from "@/lib/font";
import { cn } from "@/lib/utils";
import Link from "next/link";

import "./style/footer.css";
import { useLanguage } from "./contexts/language-context";
import { useState } from "react";


type Props = {
  name: string;
  href: string;
};

const FooterMedia = ({ name, href }: Props) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="p-fluide-anim p-footer-text transform px-2 py-3 hover:scale-105 hover:text-blue-1"
    >
      {name}
    </Link>
  );
};

function Footer() {
  const { texts } = useLanguage();
  const [discordCopied, setDiscordCopied] = useState(false);

  const handleDiscordCopy = () => {
    navigator.clipboard.writeText("someone0171");
    setDiscordCopied(true);
    setTimeout(() => setDiscordCopied(false), 2000);
  };

  return (
    <ParallaxLayer
      offset={3}
      speed={0}
      factor={1.1}
      className="pointer-events-none relative z-20"
    >
      <div className="pointer-events-auto absolute bottom-0 flex h-12 w-full flex-row items-center justify-evenly">
        <span className={cn(fontJersey15.className, "text-xl lg:text-3xl")}>
          {texts.hero.jacob}
        </span>
        <div className="h-1/2 w-px bg-white-1 md:opacity-0"></div>
        <div
          className={cn(
            fontInter.className,
            "flex flex-row gap-3 text-sm lg:gap-16 lg:text-base",
          )}
        >
          <FooterMedia
            name={texts.footer.git}
            href="https://github.com/FroostySnoowman/"
          />

          <FooterMedia
            name={texts.footer.linkedin}
            href="https://www.linkedin.com/in/jacobjbeal/"
          />

          <FooterMedia
            name={texts.footer.mail}
            href="mailto:jacob.j.beal@icloud.com"
          />

          <button
            type="button"
            onClick={handleDiscordCopy}
            className="p-fluide-anim p-footer-text transform px-2 py-3 hover:scale-105 hover:text-blue-1"
          >
            {discordCopied ? "Copied!" : texts.footer.discord}
          </button>
        </div>
      </div>
    </ParallaxLayer>
  );
}

export default Footer;
