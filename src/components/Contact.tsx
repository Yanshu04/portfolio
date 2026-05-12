import { Mail, MapPin, Link as LinkIcon, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Contact() {
  return (
    <section id="contact" className="bg-bauhaus-yellow p-8 md:p-16 border-b-4 border-bauhaus-black overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-black mb-12 uppercase tracking-tighter"
      >
        LET'S <span className="italic">TALK.</span> [05]
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-col justify-center gap-8"
        >
          {/* Info blocks */}
          <motion.div variants={itemVariants} className="flex items-center gap-6 p-8 bg-white border-4 border-bauhaus-black neo-shadow-sm">
            <Mail className="text-bauhaus-red w-10 h-10 shrink-0" />
            <div>
              <span className="font-bold text-xs uppercase tracking-widest block opacity-50">Email</span>
              <span className="text-lg font-black break-all">hello@yanshushingala.dev</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6 p-8 bg-white border-4 border-bauhaus-black neo-shadow-sm">
            <MapPin className="text-bauhaus-blue w-10 h-10 shrink-0" />
            <div>
              <span className="font-bold text-xs uppercase tracking-widest block opacity-50">Location</span>
              <span className="text-lg font-black">Gujarat, India</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6 p-8 bg-white border-4 border-bauhaus-black neo-shadow-sm">
            <LinkIcon className="text-bauhaus-red w-10 h-10 shrink-0" />
            <div>
              <span className="font-bold text-xs uppercase tracking-widest block opacity-50">Socials</span>
              <div className="flex gap-4 mt-1">
                <a href="#" className="font-black underline uppercase hover:text-bauhaus-blue transition-colors">LinkedIn</a>
                <a href="#" className="font-black underline uppercase hover:text-bauhaus-blue transition-colors">Github</a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white border-4 border-bauhaus-black p-8 neo-shadow"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="font-bold text-xs block mb-2 uppercase tracking-widest">Full Name</label>
              <input
                className="w-full bg-white border-4 border-bauhaus-black p-3 focus:bg-bauhaus-yellow focus:outline-none placeholder:opacity-30 uppercase font-bold tracking-tight"
                placeholder="WASSILY KANDINSKY"
                type="text"
              />
            </div>
            <div>
              <label className="font-bold text-xs block mb-2 uppercase tracking-widest">Email Address</label>
              <input
                className="w-full bg-white border-4 border-bauhaus-black p-3 focus:bg-bauhaus-yellow focus:outline-none placeholder:opacity-30 uppercase font-bold tracking-tight"
                placeholder="WASSILY@BAUHAUS.EDU"
                type="email"
              />
            </div>
            <div>
              <label className="font-bold text-xs block mb-2 uppercase tracking-widest">Message</label>
              <textarea
                className="w-full bg-white border-4 border-bauhaus-black p-3 focus:bg-bauhaus-yellow focus:outline-none placeholder:opacity-30 uppercase font-bold tracking-tight"
                placeholder="DESCRIBE YOUR PROJECT OR INQUIRY..."
                rows={4}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-bauhaus-black text-white p-6 border-4 border-bauhaus-black font-black uppercase shadow-[4px_4px_0px_0px_#D02020] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
            >
              Send Message <ArrowRight size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
