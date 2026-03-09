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
          "shrink-0 text-center text-lg/5 text-blue-1 sm:text-2xl/6",
          fontJersey15.className,
        )}
      >
        {selectedSkill?.title}
      </span>

      <span className="mb-1 mt-1 h-px w-4/5 shrink-0 self-center bg-blue-1 sm:mb-2"></span>

      <div className="ml-1 flex min-h-0 flex-1 flex-col sm:ml-2">
        {selectedSkill?.subSkills?.map((subSkill, index) => (
          <div key={index} className="mb-1 flex flex-row items-center sm:mb-2">
            {subSkill.image ? (
              <Image
                alt={`${texts.skills.altSkills} ${subSkill.name}`}
                src={subSkill.image}
                className="w-5 sm:w-7"
              />
            ) : (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-blue-3/60 text-[10px] text-blue-2 sm:h-7 sm:w-7 sm:text-xs">
                *
              </span>
            )}
            <span className={cn(fontInter.className, "ml-1 text-xs sm:ml-2 sm:text-sm")}>
              {subSkill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skill;
