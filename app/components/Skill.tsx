import { fontJersey15, fontInter } from "@/lib/font";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "../contexts/language-context";
import skillsEn from "../../lang/data-skills-en";
import { CSSProperties } from "react";

type Props = {
  id: number;
  className?: string;
  style?: CSSProperties;
};

function Skill({ id, className = "", style }: Props) {
  const skills = skillsEn;

  const selectedSkill = skills.find((skill) => skill.id === id);

  const { texts } = useLanguage();

  return (
    <div
      className={cn("pointer-events-none z-50 flex h-full min-h-0 flex-col", className)}
      style={style}
    >
      <span
        className={cn(
          "shrink-0 text-center text-2xl/6 text-blue-1 lg:text-2xl",
          fontJersey15.className,
        )}
      >
        {selectedSkill?.title}
      </span>

      <span className="mb-2 mt-1 h-px w-4/5 shrink-0 self-center bg-blue-1"></span>

      <div className="ml-2 flex min-h-0 flex-1 flex-col">
        {selectedSkill?.subSkills?.map((subSkill, index) => (
          <div key={index} className="mb-2 flex flex-row items-center">
            {subSkill.image ? (
              <Image
                alt={`${texts.skills.altSkills} ${subSkill.name}`}
                src={subSkill.image}
                className="w-7"
              />
            ) : (
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-blue-3/60 text-xs text-blue-2">
                *
              </span>
            )}
            <span className={cn(fontInter.className, "ml-2 text-sm")}>
              {subSkill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skill;
