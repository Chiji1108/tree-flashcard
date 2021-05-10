import { ComponentProps } from "react";
import cn from "classnames";

export interface GridProps extends ComponentProps<"ul"> {}

export default function Grid({ className, ...props }: GridProps) {
  return (
    <ul
      {...props}
      role="list"
      className={cn(
        "grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    />
  );
}
