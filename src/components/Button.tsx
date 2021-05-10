import { ComponentProps } from "react";
import cn from "classnames";

export interface ButtonProps extends ComponentProps<"button"> {}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold",
        className
      )}
      {...props}
    />
  );
}
