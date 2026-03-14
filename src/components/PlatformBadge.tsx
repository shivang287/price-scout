import { Platform, platformMeta } from "@/data/products";
import { cn } from "@/lib/utils";

type PlatformBadgeProps = {
  platform: Platform;
  className?: string;
};

export const PlatformBadge = ({ platform, className }: PlatformBadgeProps) => {
  const meta = platformMeta[platform];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        platform === "blinkit" && "bg-blinkit/20 text-foreground",
        platform === "amazon" && "bg-amazon/20 text-foreground",
        platform === "flipkart" && "bg-flipkart/20 text-foreground",
        className
      )}
    >
      <span>{meta.icon}</span>
      {meta.label}
    </span>
  );
};
