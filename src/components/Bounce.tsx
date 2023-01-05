import { animated } from "@react-spring/web";
import { useBounce, type BounceParams } from "@utils/hooks";

type BounceProps = {
  children: React.ReactNode;
  method: "hover" | "click";
  bounceConfig?: BounceParams;
};

export default function Bounce({
  children,
  method,
  bounceConfig,
}: BounceProps) {
  const { style, trigger } = useBounce(bounceConfig);

  return (
    <animated.div
      style={style}
      onMouseEnter={method === "hover" ? trigger : undefined}
      onMouseDown={method === "click" ? trigger : undefined}
    >
      {children}
    </animated.div>
  );
}
