import React, { useState, useEffect } from "react";
import { Send, CheckCircle, Terminal, HelpCircle, Trash2 } from "lucide-react";
import { ContactMessage } from "../types";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [messageLog, setMessageLog] = useState<ContactMessage[]>([]);

  // Load guest records from localstorage
  useEffect(() => {
    const saved = localStorage.getItem("yanshu_portfolio_messages");
    if (saved) {
      try {
        setMessageLog(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newMessage: ContactMessage = {
        name,
        email,
        subject: subject || "General Inquiry",
        message,
        timestamp: new Date().toLocaleString()
      };

      const updated = [newMessage, ...messageLog];
      setMessageLog(updated);
      localStorage.setItem("yanshu_portfolio_messages", JSON.stringify(updated));

      // Reset Form fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1200);
  };

  const clearGuestbook = () => {
    if (window.confirm("Do you want to clear your local message logs?")) {
      setMessageLog([]);
      localStorage.removeItem("yanshu_portfolio_messages");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-neutral-200">
      {/* Actual Form container (7 columns) */}
      <div className="lg:col-span-7 bg-[#161619] light:bg-[#fbfbf9] border-2 border-white light:border-black p-6 md:p-8 shadow-bauhaus">
        <h3 className="font-title text-base font-black text-white light:text-black uppercase tracking-widest border-b-2 border-neutral-800 light:border-black pb-4 mb-6 flex items-center gap-2">
          <Send className="w-5 h-5 text-[#DC3D24]" /> Dispatch New Transmission
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-mono uppercase tracking-wider text-neutral-400 light:text-neutral-700 block font-bold">
                Sender Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Yanshu Shingala"
                className="w-full font-mono text-xs md:text-sm py-2.5 px-3 bg-black light:bg-[#f5f2eb] text-white light:text-black border-2 border-neutral-800 light:border-black focus:outline-none focus:border-[#DC3D24] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-mono uppercase tracking-wider text-neutral-400 light:text-neutral-700 block font-bold">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@gmail.com"
                className="w-full font-mono text-xs md:text-sm py-2.5 px-3 bg-black light:bg-[#f5f2eb] text-white light:text-black border-2 border-neutral-800 light:border-black focus:outline-none focus:border-[#DC3D24] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs md:text-sm font-mono uppercase tracking-wider text-neutral-400 light:text-neutral-700 block font-bold">
              Inquiry Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. AI Research Partnership, Frontend Project Contract"
              className="w-full font-mono text-xs md:text-sm py-2.5 px-3 bg-black light:bg-[#f5f2eb] text-white light:text-black border-2 border-neutral-800 light:border-black focus:outline-none focus:border-[#DC3D24] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs md:text-sm font-mono uppercase tracking-wider text-neutral-400 light:text-neutral-700 block font-bold">
              Your Message *
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your design objectives, required parameters, and technological platform stacks."
              className="w-full font-mono text-xs md:text-sm py-2.5 px-3 bg-black light:bg-[#f5f2eb] text-white light:text-black border-2 border-neutral-800 light:border-black focus:outline-none focus:border-[#DC3D24] transition-colors resize-y"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#DC3D24] text-white font-mono text-xs md:text-sm font-black uppercase tracking-widest hover:bg-[#e4513a] disabled:bg-neutral-800 disabled:text-neutral-500 border-2 border-white light:border-black shadow-bauhaus-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>MODEM SENDING...</span>
                </>
              ) : (
                <>
                  <Send className="w-4.5 h-4.5" />
                  <span>TRANSMIT MESSAGE</span>
                </>
              )}
            </button>

            {submitSuccess && (
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs md:text-sm font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>LOGGED SECURELY IN GUESTBOOK</span>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* guest logs column (5 columns) */}
      <div className="lg:col-span-5 bg-black light:bg-[#fbfbf9] border-2 border-white light:border-black p-6 flex flex-col justify-between max-h-[460px] shadow-bauhaus">
        <div>
          <div className="flex items-center justify-between border-b-2 border-neutral-800 light:border-black pb-3 mb-4">
            <h4 className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#E3B448] light:text-blue-700 flex items-center gap-2 font-bold">
              <Terminal className="w-4 h-4 text-[#2E86AB]" /> Client Guest Message logs
            </h4>
            {messageLog.length > 0 && (
              <button
                onClick={clearGuestbook}
                className="text-xs md:text-sm text-red-400 light:text-red-700 hover:text-red-300 font-mono flex items-center gap-1 font-bold cursor-pointer"
                title="Clear personal guest log"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[320px] pr-1.5 select-none">
            {messageLog.length === 0 ? (
              <div className="text-center py-12 text-neutral-550 font-mono text-xs md:text-sm">
                <HelpCircle className="w-8 h-8 text-neutral-800 light:text-neutral-400 mx-auto mb-2.5" />
                <span>NO TRANSMISSIONS LOGGED</span>
                <p className="text-xs md:text-sm text-neutral-600 mt-1">Submit a test message using the form to populate this terminal stream instantly!</p>
              </div>
            ) : (
              messageLog.map((log, index) => (
                <div key={index} className="bg-[#161619] light:bg-[#f5f2eb] p-3.5 border-2 border-neutral-800 light:border-black">
                  <div className="flex justify-between items-start text-xs md:text-sm font-mono text-neutral-400 light:text-neutral-600 mb-1">
                    <span className="font-bold text-[#2E86AB]">{log.name}</span>
                    <span>{log.timestamp.split(",")[1]?.trim() || log.timestamp}</span>
                  </div>
                  <span className="text-xs md:text-sm font-mono tracking-wide text-white light:text-black font-bold block mb-1">
                    {log.subject}
                  </span>
                  <p className="text-xs md:text-sm text-neutral-300 light:text-neutral-700 font-mono leading-relaxed line-clamp-3 break-words">
                    {log.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border-t-2 border-neutral-800 light:border-black pt-4 text-xs md:text-sm font-mono text-neutral-500 light:text-neutral-600 mt-4 leading-normal font-bold">
          <span>* Decoded locally: These logs are retained strictly in your browser session storage, simulating end-to-end telemetry verification.</span>
        </div>
      </div>
    </div>
  );
}
