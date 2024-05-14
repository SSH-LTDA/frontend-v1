import React, { ReactNode } from "react";

type Props = {
  align?: "center" | "right" | "left";
  justify?: "center" | "space-between" | "space-around";
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

function Row({ align, justify, fullWidth, className, children }: Props) {
  return (
    <div className={`flex` + ` ${align}` + ` ${justify}` + fullWidth && " w-full" + ` ${className}`}>{children}</div>
  );
}

export default Row;
