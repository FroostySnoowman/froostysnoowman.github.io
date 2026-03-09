import { ParallaxLayer } from "@react-spring/parallax";
import { useEffect } from "react";
import SocialMedia from "./SocialMedia";
import discordBadge from "../../public/img/social_media/discord-badge.svg";
import githubBadge from "../../public/img/social_media/github-badge.svg";
import linkedinBadge from "../../public/img/social_media/linkedin-badge.svg";
import mailBadge from "../../public/img/social_media/mail-badge.svg";
import { useLanguage } from "../contexts/language-context";
import { MAILTO_URL } from "@/lib/contact";

type Props = {
  speed: number;
};

export default function SocialMediaBar({ speed }: Props) {
  useEffect(() => {
    headerSetup();
  }, );

  function headerSetup() {
    const selecteurBar = document.getElementById("social-media-selecteur-bar");

    const selecteurText = document.getElementById(
      "social-media-selecteur-text",
    );

    const allSocialMedia = document.getElementsByClassName(
      "p-social-media-badge",
    );

    for (const socialMedia of Array.from(allSocialMedia) as HTMLElement[]) {
      socialMedia.addEventListener("mouseenter", () => {
        const num = parseInt(socialMedia.dataset.num ?? "0");

        const offset = socialMedia?.offsetLeft ?? 0;

        const offset_first =
          document.getElementById(`social-media-badge-${1}`)?.offsetLeft ?? 0;

        if (selecteurBar) {
          selecteurBar.style.width = `${socialMedia.clientWidth}px`;
          selecteurBar.style.left = `${offset - offset_first}px`;
        }

        if (selecteurText) {
          switch (num) {
            case 1:
              selecteurText.textContent = texts.footer.git;
              break;
            case 2:
              selecteurText.textContent = texts.footer.linkedin;
              break;
            case 3:
              selecteurText.textContent = texts.footer.mail;
              break;
            case 4:
              selecteurText.textContent = texts.footer.discord;
              break;
          }
        }
      });

      socialMedia.addEventListener("mouseleave", () => {
        if (selecteurBar) {
          selecteurBar.style.width = `100%`;
          selecteurBar.style.left = `0`;
        }
        if (selecteurText) {
          selecteurText.textContent = " ";
        }
      });
    }
  }

  const { texts } = useLanguage();
  
  return (
    <ParallaxLayer
      id="social-media-layer"
      offset={0}
      speed={speed}
      className="flex justify-start sm:ml-0 sm:justify-center"
    >
      <div id="social-media-outer" className="flex flex-col gap-2 p-3">
        <div className="flex flex-row gap-7 sm:gap-10">
          <SocialMedia
            svgSrc={githubBadge}
            num="1"
            href="https://github.com/FroostySnoowman/"
            alt={texts.hero.social.altGit}
            title={texts.footer.git}
          />

          <SocialMedia
            svgSrc={linkedinBadge}
            num="2"
            href="https://www.linkedin.com/in/jacobjbeal/"
            alt={texts.hero.social.altLinkedin}
            title={texts.footer.linkedin}
          />

          <SocialMedia
            svgSrc={mailBadge}
            num="3"
            href={MAILTO_URL}
            alt={texts.hero.social.altMail}
            title={texts.footer.mail}
          />

          <SocialMedia
            svgSrc={discordBadge}
            num="4"
            alt={texts.hero.social.altDiscord}
            title={texts.footer.discord}
            onClick={() => {
              navigator.clipboard.writeText("someone0171");
              const el = document.getElementById("social-media-selecteur-text");
              if (el) {
                el.textContent = "Copied!";
                setTimeout(() => {
                  el.textContent = "";
                }, 2000);
              }
            }}
          />
        </div>

        <div
          id="social-media-selecteur"
          className="flex flex-col items-center rounded-full"
        >
          <div
            id="social-media-selecteur-bar"
            className="w-full rounded-full"
          />
          <div
            id="social-media-selecteur-text"
            className="mt-2 min-h-[1.25rem] text-nowrap text-center text-sm text-blue-8"
          ></div>
        </div>
      </div>
    </ParallaxLayer>
  );
}
