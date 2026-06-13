import React from "react";

interface SpecItem {
  label: string;
  value: string;
}

interface ProjectSpecsProps {
  specs: SpecItem[];
}

export default function ProjectSpecs({ specs }: ProjectSpecsProps) {
  return (
    <div className="grid grid-cols-3 divide-x divide-neutral-800 light:divide-neutral-300 border-2 border-neutral-800 light:border-black bg-black/40 light:bg-[#f0ede6] overflow-hidden select-none">
      {specs.map((spec, i) => (
        <div key={i} className="p-4 flex flex-col justify-center min-w-0">
          <span className="text-[10px] md:text-xs uppercase font-mono tracking-widest text-[#2E86AB] light:text-blue-800 font-bold">
            {spec.label}
          </span>
          <span className="text-sm md:text-base font-mono font-black text-white light:text-black mt-1 break-words leading-none">
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  );
}
