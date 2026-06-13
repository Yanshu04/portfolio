import React from "react";
import FadeInSection from "./FadeInSection";

export default function Education() {
  return (
    <section className="py-24 md:py-32 px-[8%] md:px-[12%] lg:px-[14%] w-full border-t border-neutral-900 light:border-neutral-200" id="education">
      <FadeInSection className="mb-16">
        <span className="text-[#2E86AB] light:text-blue-800 font-mono text-xs uppercase tracking-widest font-black block mb-2">
          ACADEMIC PIPELINE
        </span>
        <h2 className="font-title text-[28px] md:text-[36px] font-black uppercase tracking-tight text-white light:text-black mb-4">
          Education
        </h2>
        <div className="w-24 h-2 bg-[#DC3D24]"></div>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education Item 1 - B.Tech */}
        <FadeInSection className="h-full">
          <div className="bg-[#161619] light:bg-[#fbfbf9] border-2 border-white light:border-black p-8 flex flex-col justify-between h-full shadow-bauhaus">
            <div>
              <div className="flex justify-between items-start gap-4 mb-6">
                <h3 className="text-[22px] md:text-[26px] font-title font-black uppercase tracking-tight text-white light:text-black leading-tight">
                  B.Tech in CSE
                </h3>
                <span className="px-3.5 py-1.5 bg-[#E3B448] text-black border-2 border-black font-mono text-[10px] font-black uppercase tracking-widest shrink-0">
                  In Progress
                </span>
              </div>
              <p className="font-mono text-xs text-[#2E86AB] light:text-blue-800 uppercase tracking-widest mb-4 font-black">
                Tech Institute of Excellence
              </p>
              <p className="text-[16px] md:text-[18px] text-neutral-400 light:text-neutral-700 leading-relaxed mb-6 font-sans">
                Specialization in Artificial Intelligence and Machine Learning. Cumulative GPA: 7.0/10.0.
              </p>
            </div>
            
            <div className="border-t-2 border-neutral-800 light:border-neutral-300 pt-4 mt-auto">
              <span className="font-mono text-[11px] font-black uppercase tracking-wider text-[#DC3D24] block mb-2">
                Core Domains & Coursework
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["DATA STRUCTURES", "ALGORITHMS", "NEURAL NETWORKS", "OS", "DBMS"].map((subj) => (
                  <span key={subj} className="px-2 py-1 bg-black light:bg-[#f5f2eb] border border-neutral-800 light:border-black font-mono text-[10px] text-neutral-300 light:text-neutral-750 font-bold">
                    {subj}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Education Item 2 - Diploma */}
        <FadeInSection className="h-full">
          <div className="bg-[#161619] light:bg-[#fbfbf9] border-2 border-white light:border-black p-8 flex flex-col justify-between h-full shadow-bauhaus">
            <div>
              <div className="flex justify-between items-start gap-4 mb-6">
                <h3 className="text-[22px] md:text-[26px] font-title font-black uppercase tracking-tight text-white light:text-black leading-tight">
                  Diploma in IT
                </h3>
                <span className="px-3.5 py-1.5 bg-[#2E86AB] text-white border-2 border-white light:border-black font-mono text-[10px] font-black uppercase tracking-widest shrink-0">
                  Completed
                </span>
              </div>
              <p className="font-mono text-xs text-[#2E86AB] light:text-blue-800 uppercase tracking-widest mb-4 font-black">
                Polytechnic Foundation
              </p>
              <p className="text-[16px] md:text-[18px] text-neutral-400 light:text-neutral-700 leading-relaxed mb-6 font-sans">
                Foundational computer science principles, practical software execution, and system administration. Graduated with Distinction.
              </p>
            </div>
            
            <div className="border-t-2 border-neutral-800 light:border-neutral-300 pt-4 mt-auto">
              <span className="font-mono text-[11px] font-black uppercase tracking-wider text-[#DC3D24] block mb-2">
                Core Domains & Coursework
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["NETWORKING", "WEB DEV", "SOFTWARE ENG", "SYSTEMS ANALYSIS"].map((subj) => (
                  <span key={subj} className="px-2 py-1 bg-black light:bg-[#f5f2eb] border border-neutral-800 light:border-black font-mono text-[10px] text-neutral-300 light:text-neutral-750 font-bold">
                    {subj}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
