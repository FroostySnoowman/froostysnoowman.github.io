import { ParallaxLayer } from "@react-spring/parallax";

type Props = {
  color: string;
  offset: number;
  factor?: number;
};

function BackgroundColor({ color, offset, factor }: Props) {
  return (
    <ParallaxLayer
      offset={offset}
      factor={factor}
      className="min-h-[600px] w-full"
      style={{ backgroundColor: color }}
    ></ParallaxLayer>
  );
}

export default BackgroundColor;
