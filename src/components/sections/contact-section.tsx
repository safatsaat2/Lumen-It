"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";

function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Message received — we'll be in touch within 24 hours.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-border bg-card/80 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Alex Rivera" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            autoComplete="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" placeholder="Acme Inc." autoComplete="organization" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Project details</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="What are you building? Timeline? Budget band?"
          required
        />
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
        {loading ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

function ContactFormSkeleton() {
  return (
    <div
      className="space-y-5 rounded-3xl border border-border bg-card/80 p-6 sm:p-8"
      aria-hidden
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="h-16 animate-pulse rounded-xl bg-muted" />
        <div className="h-16 animate-pulse rounded-xl bg-muted" />
      </div>
      <div className="h-16 animate-pulse rounded-xl bg-muted" />
      <div className="h-32 animate-pulse rounded-xl bg-muted" />
      <div className="h-12 animate-pulse rounded-full bg-muted" />
    </div>
  );
}

export function ContactSection() {
  const [formReady, setFormReady] = useState(false);

  useEffect(() => {
    setFormReady(true);
  }, []);

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-violet-600/10 via-card to-fuchsia-500/5">
          <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
            <div className="space-y-8">
              <SectionHeading
                badge="Contact"
                title="Let's build something remarkable"
                description="Tell us about your timeline, budget band and goals. We'll respond with next steps — no pitch deck required."
                align="left"
                className="mx-0 max-w-none"
              />
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{siteConfig.phone}</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{siteConfig.address}</span>
                </li>
              </ul>
            </div>

            {formReady ? <ContactForm /> : <ContactFormSkeleton />}
          </div>
        </div>
      </div>
    </section>
  );
}
