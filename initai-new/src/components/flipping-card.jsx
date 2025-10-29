import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 300,
  width = 350
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const heightValue = typeof height === 'number' ? `${height}px` : height;
  const widthValue = typeof width === 'number' ? `${width}px` : width;

  return (
    <div
      className="group/flipping-card [perspective:1000px] cursor-pointer"
      style={{
        "--height": heightValue,
        "--width": widthValue
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative rounded-xl transition-all duration-700 [transform-style:preserve-3d]",
          "h-[var(--height)] w-[var(--width)] bg-transparent overflow-visible",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
          className
        )}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 h-full w-full rounded-[inherit] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)] bg-transparent flex items-center justify-center"
        >
          {frontContent}
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 h-full w-full rounded-[inherit] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)] bg-transparent flex items-center justify-center"
        >
          {backContent}
        </div>
      </div>
    </div>
  );
}
