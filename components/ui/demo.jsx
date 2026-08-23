import React from "react";
import DotCard from "@/components/ui/moving-dot-card";

const DemoOne = () => {
  return (
    <div className="flex w-full min-h-[400px] justify-center items-center p-8">
      <div className="w-[320px] h-[220px]">
        <DotCard target={777000} duration={2000} label="Profile Impressions" />
      </div>
    </div>
  );
};

export { DemoOne };
export default DemoOne;
