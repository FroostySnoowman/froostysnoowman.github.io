import Image, { StaticImageData } from "next/image";
import "../style/socialMedia.css";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  svgSrc: StaticImageData;
  className?: string;
  num?: string;
  href?: string;
  alt?: string;
  title?: string;
  onClick?: () => void;
};

function SocialMedia({
  svgSrc,
  className = "",
  num = "0",
  href = "#",
  alt = "Social media icon",
  title,
  onClick,
}: Props) {
  const button = (
    <button
      type="button"
      title={title}
      className={cn(
        "p-social-media-badge animate-shimmer bg-[linear-gradient(110deg,#002545,45%,#003b64,55%,#002545)] bg-[length:200%_100%] transition-colors",
        className,
      )}
      data-num={parseInt(num)}
      id={`social-media-badge-${num}`}
      onClick={onClick}
    >
      <Image src={svgSrc} alt={alt} priority />
    </button>
  );

  if (onClick) {
    return button;
  }

  return (
    <Link href={href} target={href === "#" ? "" : "_blank"} passHref>
      {button}
    </Link>
  );
}

export default SocialMedia;
