import { ParallaxLayer } from "@react-spring/parallax";
import Skill from "./components/Skill";
import { useOnScreen } from "./hooks/useOnScreen";
import { cn } from "@/lib/utils";
import skillsEn from "../lang/data-skills-en";

const HIGHLIGHT_PALETTE = [
  "radial-gradient(circle at top left, rgba(0,255,128,0.28), transparent 72%)",
  "radial-gradient(circle at top center, rgba(255,235,59,0.25), transparent 72%)",
  "radial-gradient(circle at top right, rgba(255,128,0,0.26), transparent 72%)",
  "radial-gradient(circle at center left, rgba(0,180,255,0.27), transparent 74%)",
  "radial-gradient(circle at center, rgba(0,255,196,0.23), transparent 74%)",
  "radial-gradient(circle at center right, rgba(176,96,255,0.26), transparent 74%)",
  "radial-gradient(circle at bottom left, rgba(255,80,80,0.28), transparent 72%)",
  "radial-gradient(circle at bottom center, rgba(111,196,255,0.24), transparent 72%)",
  "radial-gradient(circle at bottom right, rgba(255,64,255,0.26), transparent 72%)",
];

function Skills() {
  const [skillsRef, skillsVisible] = useOnScreen<HTMLDivElement>();
  const skills = skillsEn;

  return (
    <ParallaxLayer
      offset={3}
      speed={0}
      className="flex flex-col items-center bg-blue-9 pb-32 dark:bg-blue-4 lg:pb-40"
    >
      <div
        ref={skillsRef}
        className="p-fluide-anim relative mx-auto mb-16 mt-4 flex flex-col lg:mb-24 lg:mt-8"
        style={{
          width: "min(92vw, calc(100vh - 9rem), 860px)",
        }}
      >
        <div className="grid w-full grid-cols-2 auto-rows-auto md:grid-cols-3">
          {skills.map((skill, index) => {
            const paletteIndex = index % HIGHLIGHT_PALETTE.length;
            return (
              <div
                key={skill.id}
                className="relative min-h-0 p-2 sm:p-4"
              >
                <div
                  className="p-fluide-anim pointer-events-auto absolute inset-0 cursor-default opacity-45 transition-opacity duration-300 hover:opacity-95"
                  style={{
                    background: HIGHLIGHT_PALETTE[paletteIndex],
                    borderRight: "1px solid rgba(106, 206, 255, 0.5)",
                    borderBottom: "1px solid rgba(106, 206, 255, 0.5)",
                  }}
                />
                <Skill
                  id={skill.id}
                  className={cn(
                    "relative z-10 transition-all duration-1000 ease-in-out",
                    skillsVisible ? "" : "scale-0 opacity-0",
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </ParallaxLayer>
  );
}

export default Skills;
