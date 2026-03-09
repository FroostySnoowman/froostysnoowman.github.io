import "../style/timeline.css";
import { fontJersey15, fontInter } from "@/lib/font";
import { cn } from "@/lib/utils";
import { useOnScreen } from "../hooks/useOnScreen";
import { useLanguage } from "../contexts/language-context";
import Link from "next/link";

type Props = {
  className?: string;
};

type PropsAgain = {
  name: string;
  desc: string;
  link?: string;
  right?: boolean;
};

type PropsAgainAgain = {
  name: string;
  desc: string;
  date: string;
  link?: string;
  right?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
};

type PropsAgainReally = {
  date: string;
  right?: boolean;
};

const TimelineText = ({ name, desc, link, right = false }: PropsAgain) => {
  const classes = cn(
    "p-fluide-anim flex w-20 min-h-20 flex-col items-center justify-center hover:scale-110 md:w-40 lg:min-h-32",
    right ? "timeline-end hover:translate-x-3" : "timeline-start hover:-translate-x-3",
  );

  const content = (
    <>
      <span
        className={cn(
          "text-center text-base/4 opacity-90 lg:text-xl/5",
          fontJersey15.className,
        )}
      >
        {name}
      </span>
      <div
        className={cn(
          "mt-2 hidden text-center text-xs opacity-75 md:inline-block",
          fontInter.className,
        )}
      >
        {desc}
      </div>
    </>
  );

  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <div className={classes}>
      {content}
    </div>
  );
};

const TimelineMiddle = () => {
  return (
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5 dark:brightness-[20%] "
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

const TimelineDate = ({ date, right = false }: PropsAgainReally) => {
  return (
    <div
      className={cn(
        "flex min-h-20 w-20 items-center text-xs opacity-75 md:w-40 lg:min-h-32",
        right
          ? "timeline-end justify-start text-left"
          : "timeline-start justify-end text-right",
      )}
    >
      {date}
    </div>
  );
};

const TimelineStep = ({
  name,
  desc,
  date,
  link,
  right = false,
  isFirst = false,
  isLast = false,
}: PropsAgainAgain) => {
  return (
    <li className="items-center">
      <hr className={cn(isFirst ? "first-hr" : "", "dark:invert")} />
      <TimelineMiddle />
      <TimelineText name={name} desc={desc} link={link} right={right} />
      <TimelineDate date={date} right={!right} />
      <hr className={cn(isLast ? "last-hr" : "", "dark:invert")} />
    </li>
  );
};

function Timeline({ className = "" }: Props) {
  const [lineRef, lineVisible] = useOnScreen<HTMLUListElement>();

  const { texts } = useLanguage();

  return (
    <ul
      ref={lineRef}
      className={cn(
        "delay-400 timeline transition-all duration-1000 ease-in-out lg:timeline-vertical",
        className,
        lineVisible
          ? ""
          : "-translate-y-20 opacity-0 lg:-translate-x-20 lg:-translate-y-0",
      )}
    >
      <TimelineStep
        name={texts.about.timeline.craftdownunder.name}
        desc={texts.about.timeline.craftdownunder.desc}
        date={texts.about.timeline.craftdownunder.date}
        link={texts.about.timeline.craftdownunder.link}
        isFirst
      />

      <TimelineStep
        name={texts.about.timeline.itusu.name}
        desc={texts.about.timeline.itusu.desc}
        date={texts.about.timeline.itusu.date}
        link={texts.about.timeline.itusu.link}
        right
      />

      <TimelineStep
        name={texts.about.timeline.servicesx.name}
        desc={texts.about.timeline.servicesx.desc}
        date={texts.about.timeline.servicesx.date}
        link={texts.about.timeline.servicesx.link}
      />

      <TimelineStep
        name={texts.about.timeline.mybreakpoint.name}
        desc={texts.about.timeline.mybreakpoint.desc}
        date={texts.about.timeline.mybreakpoint.date}
        link={texts.about.timeline.mybreakpoint.link}
        right
        isLast
      />
    </ul>
  );
}

export default Timeline;
