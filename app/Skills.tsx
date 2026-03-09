import { ParallaxLayer } from "@react-spring/parallax";
import Skill from "./components/Skill";
import { useOnScreen } from "./hooks/useOnScreen";
import { cn } from "@/lib/utils";
import skillsEn from "../lang/data-skills-en";

const SKILLS_COLUMNS = 3;

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
  const rows = Math.ceil(skills.length / SKILLS_COLUMNS);

  return (
    <ParallaxLayer
      offset={3}
      speed={0}
      className="min-[600px] flex flex-col items-center bg-blue-9 pb-32 dark:bg-blue-4 lg:pb-40"
    >
      <div
        ref={skillsRef}
        className="p-fluide-anim relative mx-auto mb-16 mt-4 flex flex-col lg:mb-24 lg:mt-8"
        style={{
          width: "min(92vw, calc(100vh - 9rem), 860px)",
        }}
      >
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: `repeat(${SKILLS_COLUMNS}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, auto))`,
          }}
        >
          {skills.map((skill, index) => {
            const rowIndex = Math.floor(index / SKILLS_COLUMNS);
            const colIndex = index % SKILLS_COLUMNS;
            const isLastCol = colIndex === SKILLS_COLUMNS - 1;
            const isLastRow = rowIndex === rows - 1;
            const paletteIndex = index % HIGHLIGHT_PALETTE.length;
            return (
              <div
                key={skill.id}
                className="relative min-h-0 p-4"
                style={{
                  gridColumn: colIndex + 1,
                  gridRow: rowIndex + 1,
                }}
              >
                <div
                  className="pointer-events-auto absolute inset-0 cursor-default opacity-45 transition-opacity duration-300 hover:opacity-95 p-fluide-anim"
                  style={{
                    background: HIGHLIGHT_PALETTE[paletteIndex],
                    borderRight: isLastCol
                      ? undefined
                      : "1px solid rgba(106, 206, 255, 0.5)",
                    borderBottom: isLastRow
                      ? undefined
                      : "1px solid rgba(106, 206, 255, 0.5)",
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
