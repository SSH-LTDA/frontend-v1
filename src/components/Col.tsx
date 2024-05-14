import React, { ReactNode } from "react";

function Col({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}

export default Col;
