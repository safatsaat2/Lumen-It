export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Lumen rebuilt our entire brand and marketing site in 9 weeks. It outperforms anything we've ever shipped — pipeline tripled the quarter after launch.",
    name: "Priya Mehta",
    role: "VP Marketing",
    company: "Northwind Pay",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&q=80&auto=format&fit=crop&crop=faces",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "Easily the most senior team we've worked with. They behaved like an in-house product crew, not an agency. Our LCP went from 3.4s to 0.9s.",
    name: "Daniel Okafor",
    role: "Head of Engineering",
    company: "Lumen Cloud",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80&auto=format&fit=crop&crop=faces",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "Their AI team didn't just ship a chatbot — they shipped evals, observability and cost controls from day one. Production-grade work.",
    name: "Maya Chen",
    role: "Founder & CEO",
    company: "Harvest AI",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&q=80&auto=format&fit=crop&crop=faces",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "We've worked with global agencies. Lumen out-thought and out-shipped every one of them. Worth 10× what we paid.",
    name: "Jonas Wahlberg",
    role: "Chief Product Officer",
    company: "Atlas Mobility",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=160&q=80&auto=format&fit=crop&crop=faces",
    rating: 5,
  },
  {
    id: "5",
    quote:
      "Beautiful brand, performant site, and a design system the team still uses three years later. Genuinely strategic partners.",
    name: "Sofia Rinaldi",
    role: "Creative Director",
    company: "Moonlit",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80&auto=format&fit=crop&crop=faces",
    rating: 5,
  },
];
