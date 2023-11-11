import { cn } from "../../../utils/cn";

export const PageLayout = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "block ml-auto mr-auto px-8 min-h-[100vh] max-w-4xl",
        className
      )}
      {...props}
    />
  );
};
