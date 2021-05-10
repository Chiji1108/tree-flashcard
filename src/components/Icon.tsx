import { ComponentProps } from "react";
import cn from "classnames";

export interface IconProps extends ComponentProps<"span"> {}

export default function Icon({ className, ...props }: IconProps) {
  return <span className={cn("material-icons", className)} {...props} />;
}
