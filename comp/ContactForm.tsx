"use client";
import { apiContactForm } from "@/apis/user";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ScaleReveal } from "./MotionWrapper";

const ContactForm = ({ domain }: { domain: string }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormInvalid = !name.trim() || !email.trim() || !message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await apiContactForm(domain, name, number, email, message);

      console.log("Contact Form API Response:", res);
      const rawRes = res as any;

      if (
        res?.data ||
        rawRes?.success ||
        rawRes?.status === "success" ||
        rawRes?.status === 200
      ) {
        toast.success("Your message has been sent!");
        setName("");
        setNumber("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Form Submission Catch Error:", error);
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScaleReveal>
      <div className="relative group">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#800000]/10 rounded-full blur-[80px] group-hover:bg-[#800000]/20 transition-all duration-700" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#EADDCA]/40 rounded-full blur-[80px]" />

        {/* Main Card */}
        <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-[3rem] border border-[#EADDCA]/50 p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="mb-12 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800000]/5 border border-[#800000]/10 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#800000] opacity-30"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#800000]"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#800000]">
                Inquiry Portal
              </span>
            </div>
            <h4 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter leading-none mb-3">
              Let&apos;s Start a{" "}
              <span className="text-[#800000]">Conversation</span>
            </h4>
            <p className="text-slate-400 text-sm font-medium tracking-tight">
              Have a question or just want to say hi? We are all ears.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group/input">
                <label className="absolute -top-2.5 left-4 px-2 bg-white text-[10px] font-black text-slate-700 uppercase tracking-widest z-20 group-focus-within/input:text-[#800000] transition-all">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-6 py-4 bg-transparent border-2 border-slate-200 rounded-2xl focus:border-[#800000]/30 outline-none transition-all duration-300 text-sm font-semibold text-[#1A1A1A] placeholder:text-slate-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="relative group/input">
                <label className="absolute -top-2.5 left-4 px-2 bg-white text-[10px] font-black text-slate-700 uppercase tracking-widest z-20 group-focus-within/input:text-[#800000] transition-all">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-6 py-4 bg-transparent border-2 border-slate-200 rounded-2xl focus:border-[#800000]/30 outline-none transition-all duration-300 text-sm font-semibold text-[#1A1A1A] placeholder:text-slate-400"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="relative group/input">
              <label className="absolute -top-2.5 left-4 px-2 bg-white text-[10px] font-black text-slate-700 uppercase tracking-widest z-20 group-focus-within/input:text-[#800000] transition-all">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-6 py-4 bg-transparent border-2 border-slate-200 rounded-2xl focus:border-[#800000]/30 outline-none transition-all duration-300 text-sm font-semibold text-[#1A1A1A] placeholder:text-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative group/input">
              <label className="absolute -top-2.5 left-4 px-2 bg-white text-[10px] font-black text-slate-700 uppercase tracking-widest z-20 group-focus-within/input:text-[#800000] transition-all">
                Your Message *
              </label>
              <textarea
                rows={4}
                placeholder="How can we help you?"
                className="w-full px-6 py-4 bg-transparent border-2 border-slate-200 rounded-2xl focus:border-[#800000]/30 outline-none transition-all duration-300 text-sm font-semibold text-[#1A1A1A] placeholder:text-slate-400 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="flex justify-center lg:justify-start">
              <div
                className={loading || isFormInvalid ? "cursor-not-allowed" : ""}
              >
                <button
                  type="submit"
                  disabled={loading || isFormInvalid}
                  className="relative overflow-hidden px-14 py-4 bg-[#1A1A1A] hover:bg-[#800000] text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-full shadow-2xl shadow-black/10 transition-all duration-500 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:pointer-events-none group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />

                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {loading && (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    <span>{loading ? "Processing..." : "Send Inquiry"}</span>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ScaleReveal>
  );
};

export default ContactForm;
