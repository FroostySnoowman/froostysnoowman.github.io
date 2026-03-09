import { ParallaxLayer } from "@react-spring/parallax";
import Image from "next/image";
import Timeline from "./components/Timeline";
import "./style/about.css";
import Button from "./components/Button";
import Link from "next/link";
import { useOnScreen } from "./hooks/useOnScreen";
import { cn } from "@/lib/utils";
import SocialMedia from "./components/SocialMedia";
import meImg from "../public/img/me.png";
import githubBadge from "../public/img/social_media/github-badge.svg";
import linkedinBadge from "../public/img/social_media/linkedin-badge.svg";
import mailBadge from "../public/img/social_media/mail-badge.svg";
import { useLanguage } from "./contexts/language-context";

function About() {
  const [aboutRef, aboutVisible] = useOnScreen<HTMLDivElement>();
  const [imgRef, imgVisible] = useOnScreen<HTMLImageElement>();
  const [descRef, descVisible] = useOnScreen<HTMLDivElement>();
  const [cvRef, cvVisible] = useOnScreen<HTMLButtonElement>();
  const [contactRef, contactVisible] = useOnScreen<HTMLDivElement>();

  const { texts } = useLanguage();

  return (
    <ParallaxLayer
      offset={1}
      speed={0}
      className="relative flex min-h-[600px] flex-col items-center justify-evenly bg-blue-9 dark:bg-blue-4 lg:flex-row"
    >
      <div className="absolute top-0 -z-10 hidden h-32 w-full flex-col items-center bg-blue-9 dark:flex">
        <div className="half-ellipse absolute bg-blue-8"></div>
        <div className="half-ellipse absolute top-2 bg-blue-7"></div>
        <div className="half-ellipse absolute top-4 bg-blue-5"></div>
        <div className="half-ellipse absolute top-6 bg-blue-6"></div>
        <div className="half-ellipse absolute top-8 bg-blue-4"></div>
      </div>

      <div
        ref={aboutRef}
        className={cn(
          "mx-4 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-white-1/65 to-blue-5/45 transition-all duration-500 ease-in-out lg:mx-0 dark:from-blue-9 lg:h-[642px] dark:to-blue-5",
          aboutVisible ? "" : "opacity-0",
        )}
      >
        <div className="m-px flex flex-col items-center justify-evenly gap-4 rounded-2xl bg-blue-9/95 py-8 lg:h-full lg:gap-0 lg:py-0 dark:bg-blue-1/85">
          <Image
            ref={imgRef}
            id="img-me"
            src={meImg}
            alt={texts.about.altPicture}
            placeholder="blur"
            className={cn(
              "h-40 w-40 rounded-full object-cover transition-all duration-500 ease-in-out lg:h-64 lg:w-64",
              imgVisible ? "" : "translate-x-40 opacity-0",
            )}
          />

          <div
            ref={descRef}
            className={cn(
              "mx-6 max-w-[400px] text-sm transition-all duration-500 ease-in-out sm:mx-12 lg:text-base",
              descVisible ? "" : "-translate-x-40 opacity-0",
            )}
          >
            {texts.about.desc}
          </div>

          <Link href="/Jacob_Beal.pdf" target="_blank">
            <Button
              ref={cvRef}
              text={texts.about.seeCV}
              className={cn(
                "transition-all duration-500 ease-in-out",
                cvVisible ? "" : "translate-x-40 opacity-0",
              )}
            />
          </Link>

          <div
            ref={contactRef}
            className={cn(
              "flex flex-row gap-5 transition-all duration-500 ease-in-out sm:scale-110 md:scale-125",
              contactVisible ? "" : "-translate-x-40 opacity-0",
            )}
          >
            <div className="rounded-full bg-gradient-to-tr from-blue-1 to-blue-6 p-px duration-150 hover:scale-125">
              <SocialMedia
                svgSrc={githubBadge}
                num="1"
                href="https://github.com/FroostySnoowman/"
                alt={texts.hero.social.altGit}
              />
            </div>

            <div className="rounded-full bg-gradient-to-tr from-blue-1 to-blue-6 p-px duration-150 hover:scale-125">
              <SocialMedia
                svgSrc={linkedinBadge}
                num="2"
                href="https://www.linkedin.com/in/jacobjbeal/"
                alt={texts.hero.social.altLinkedin}
              />
            </div>

            <div className="rounded-full bg-gradient-to-tr from-blue-1 to-blue-6 p-px duration-150 hover:scale-125">
              <SocialMedia
                svgSrc={mailBadge}
                num="3"
                href="mailto:jacob.j.beal@icloud.com"
                alt={texts.hero.social.altMail}
              />
            </div>
          </div>
        </div>
      </div>

      <Timeline className="scale-[0.7] sm:scale-90 lg:scale-110" />
    </ParallaxLayer>
  );
}

export default About;
