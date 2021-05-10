import { ComponentProps } from "react";
import cn from "classnames";

export interface LinkProps extends ComponentProps<"a"> {}

export default function Link({ className, ...props }: LinkProps) {
  return <a className={cn("hover:underline", className)} {...props} />;
}
