"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const LocationMap = dynamic(() => import("@/components/LocationMap"), { ssr: false });
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  company: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSubmitted(true);
    reset();
  };

  return (
    <>
      {/* Hero */}
      <div className="bg-navy py-14 md:py-20">
        <div className="max-w-310 mx-auto px-6">
          <p className="font-mono-brand text-carolina text-xs font-semibold tracking-[0.16em] uppercase mb-4">
            Contact Us
          </p>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-[2.875rem] leading-[1.05] tracking-[-0.02em] mb-5">
            Talk to a real person
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-lg">
            We answer questions about prices and products over the phone Mon–Fri,
            9am–3pm EST. For anything else, send a message and we'll get right back to you.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-surface-2 min-h-[60vh]">
        <div className="max-w-310 mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 items-start">

          {/* Left: stacked info card + map placeholder */}
          <div className="space-y-4">
            {/* Three-section info card */}
            <div className="bg-white border border-line rounded-[6px] overflow-hidden">
              <div className="px-6 py-5 border-b border-line">
                <p className="font-mono-brand text-slate-500 text-[10px] font-semibold tracking-[0.14em] uppercase mb-2">
                  Phone
                </p>
                <a
                  href="tel:18005237475"
                  className="font-heading font-bold text-navy text-[1.5rem] hover:text-carolina transition-colors block leading-tight"
                >
                  1-800-523-7475
                </a>
                <p className="text-slate-500 text-sm mt-1.5">Mon–Fri · 9am–3pm EST</p>
              </div>

              <div className="px-6 py-5 border-b border-line">
                <p className="font-mono-brand text-slate-500 text-[10px] font-semibold tracking-[0.14em] uppercase mb-2">
                  Email
                </p>
                <a
                  href="mailto:contact@carolinamoldings.com"
                  className="text-carolina hover:text-carolina/80 transition-colors text-sm font-medium"
                >
                  contact@carolinamoldings.com
                </a>
              </div>

              <div className="px-6 py-5">
                <p className="font-mono-brand text-slate-500 text-[10px] font-semibold tracking-[0.14em] uppercase mb-2">
                  Address
                </p>
                <p className="text-navy text-sm font-medium leading-relaxed">
                  3600 Woodpark Blvd, Suite A<br />
                  Charlotte, NC 28206
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-[6px] overflow-hidden border border-line h-72 w-full">
              <LocationMap />
            </div>
          </div>

          {/* Right: form */}
          {submitted ? (
            <div className="bg-white border border-line rounded-[6px] p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-heading font-bold text-navy text-xl mb-2">Message Sent!</h3>
              <p className="text-slate-600 text-sm mb-4">
                We've received your message and will get back to you within 1 business day.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-navy hover:bg-navy/90 text-white rounded-[3px]"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <div className="bg-white border border-line rounded-[6px] p-8">
              <h2 className="font-heading font-bold text-navy text-2xl mb-6">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm text-slate-700">
                      Full name
                    </Label>
                    <Input id="name" {...register("name")} className="rounded-[3px]" />
                    {errors.name && (
                      <p className="text-brand-red text-xs">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-sm text-slate-700">
                      Company
                    </Label>
                    <Input id="company" {...register("company")} className="rounded-[3px]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm text-slate-700">
                      Email
                    </Label>
                    <Input id="email" type="email" {...register("email")} className="rounded-[3px]" />
                    {errors.email && (
                      <p className="text-brand-red text-xs">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-sm text-slate-700">
                      Phone
                    </Label>
                    <Input id="phone" type="tel" {...register("phone")} className="rounded-[3px]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-sm text-slate-700">
                    Subject
                  </Label>
                  <Input id="subject" {...register("subject")} className="rounded-[3px]" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-sm text-slate-700">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={6}
                    {...register("message")}
                    className="rounded-[3px] resize-none"
                  />
                  {errors.message && (
                    <p className="text-brand-red text-xs">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-red hover:bg-red-700 text-white rounded-[3px] font-semibold"
                >
                  {isSubmitting ? "Sending…" : "Send message"}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
