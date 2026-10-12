import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Check, ChevronDown, Menu, X } from "lucide-react";
import { brand, navigation, seo } from "@/content/siteData";

export function Meta({ title, description, path = "" }: { title: string; description: string; path?: string }) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        if (property) tag.setAttribute("property", name); else tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", brand.name, true);
    setMeta("og:image", brand.logo, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = brand.origin ? `${brand.origin}${path || window.location.pathname}` : window.location.href.split("#")[0];
  }, [title, description, path]);
  return null;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return <span className={`brand-logo-wrap ${compact ? "brand-logo-wrap--compact" : ""}`}><img className={`brand-logo ${compact ? "brand-logo--compact" : ""}`} src={brand.logo} alt={`${brand.name} logo`} /></span>;
}

export function Button({ href, children, variant = "gold", external = false, className = "" }: { href?: string; children: ReactNode; variant?: "gold" | "outline" | "text" | "navy"; external?: boolean; className?: string }) {
  const classes = `button button--${variant} ${className}`;
  if (href) {
    if (external) return <a href={href} target="_blank" rel="noreferrer" className={classes}>{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
    return <Link href={href} className={classes}>{children}<ArrowUpRight size={16} aria-hidden="true" /></Link>;
  }
  return <button className={classes}>{children}<ArrowUpRight size={16} aria-hidden="true" /></button>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [location]);
  const darkHeader = location === "/" || location.startsWith("/services/");
  return <header className={`site-header ${darkHeader ? "header-dark" : ""} ${scrolled ? "is-scrolled" : ""}`}>
    <div className="shell header-inner">
      <Link href="/" aria-label="Victor Robert Book Marketing Agency home"><Logo compact /></Link>
      <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        {navigation.map(item => <Link key={item.href} href={item.href} className={location.startsWith(item.href) ? "is-active" : ""}>{item.label}</Link>)}
        <Link href="/contact" className="nav-cta">Discuss your book <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </nav>
      <div className="header-actions"><Link href="/contact" className="nav-cta nav-cta--desktop">Start a project <ArrowUpRight size={15} aria-hidden="true" /></Link><button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    </div>
  </header>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="shell footer-top">
      <div className="footer-intro"><Logo /><p>Strategic book marketing for authors who want their work to be easier to discover, understand, and remember.</p><Link href="/contact" className="footer-action">Bring your book into focus <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      <div className="footer-col"><span className="footer-label">Explore</span>{navigation.slice(0, 4).map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
      <div className="footer-col"><span className="footer-label">Continue</span>{navigation.slice(4).map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/contact">Contact</Link></div>
      <div className="footer-col"><span className="footer-label">Availability</span><p>Enquiries, booking links, and social profiles will be connected here once the final destinations are confirmed.</p><Link href="/conversation">See how a conversation works <ArrowUpRight size={14} /></Link></div>
    </div>
    <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Victor Robert Book Marketing Agency</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/accessibility">Accessibility</Link></div><span>{brand.strapline}</span></div>
  </footer>;
}

export function PageFrame({ children, title, description, path }: { children: ReactNode; title: string; description: string; path?: string }) {
  return <><Meta title={title} description={description} path={path} /><Header /><main>{children}</main><Footer /></>;
}

export function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) { return <div className={`section-label ${dark ? "section-label--dark" : ""}`}><span className="label-line" />{children}</div>; }
export function SectionHeading({ eyebrow, title, text, dark = false }: { eyebrow?: string; title: string; text?: string; dark?: boolean }) { return <div className={`section-heading ${dark ? "section-heading--dark" : ""}`}>{eyebrow && <SectionLabel dark={dark}>{eyebrow}</SectionLabel>}<h2>{title}</h2>{text && <p>{text}</p>}</div>; }

export function PageHero({ eyebrow, title, text, meta, image = false }: { eyebrow: string; title: string; text: string; meta?: string; image?: boolean }) {
  return <section className={`page-hero ${image ? "page-hero--image" : ""}`}>
    <div className="shell page-hero-grid"><div className="page-hero-copy"><SectionLabel>{eyebrow}</SectionLabel><h1>{title}</h1><p>{text}</p>{meta && <span className="hero-meta">{meta}</span>}</div>{image && <div className="hero-art"><img src={brand.heroImage} alt="Navy and gold hardback books arranged in a quiet editorial setting" /><span className="art-caption">A considered campaign begins with a clear point of view.</span></div>}</div>
  </section>;
}

export function SplitCTA({ title = "Your book has a next useful move.", text = "Bring the book, the ambition, and the questions. Start with a conversation about what would help most.", dark = true }: { title?: string; text?: string; dark?: boolean }) {
  return <section className={`split-cta ${dark ? "split-cta--dark" : ""}`}><div className="shell split-cta-inner"><SectionLabel dark={dark}>Next step</SectionLabel><h2>{title}</h2><p>{text}</p><Button href="/contact" variant={dark ? "gold" : "navy"}>Discuss your book</Button></div></section>;
}

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [active, setActive] = useState<number | null>(0);
  return <div className="faq-list">{items.map((item, index) => <div key={item.q} className={`faq-item ${active === index ? "is-open" : ""}`}><button className="faq-trigger" aria-expanded={active === index} onClick={() => setActive(active === index ? null : index)}><span>{item.q}</span><ChevronDown size={20} aria-hidden="true" /></button><div className="faq-answer" hidden={active !== index}><p>{item.a}</p></div></div>)}</div>;
}

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<Record<string, string>>({});
  const update = (key: string, value: string) => setForm(current => ({ ...current, [key]: value }));
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "The enquiry destination is not connected yet.");
      setStatus("success"); setMessage(data.message || "Your enquiry has been received.");
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "The enquiry could not be sent. Please try again later."); }
  }
  const Field = ({ name, label, type = "text", required = false, placeholder = "" }: { name: string; label: string; type?: string; required?: boolean; placeholder?: string }) => <label className="field"><span>{label}{required && " *"}</span><input name={name} type={type} required={required} placeholder={placeholder} onChange={e => update(name, e.target.value)} /></label>;
  return <form className="inquiry-form" onSubmit={submit} noValidate><div className="form-grid"><Field name="name" label="Your name" required /><Field name="email" label="Email address" type="email" required /><Field name="country" label="Country" /><Field name="bookTitle" label="Book title" required /><label className="field"><span>Book genre *</span><select name="genre" required onChange={e => update("genre", e.target.value)}><option value="">Select a genre</option><option>Fiction</option><option>Nonfiction</option><option>Children's</option><option>Business / self-help</option><option>Memoir</option><option>Specialist / educational</option><option>Other</option></select></label><label className="field"><span>Publishing status *</span><select name="publishingStatus" required onChange={e => update("publishingStatus", e.target.value)}><option value="">Select one</option><option>Preparing to publish</option><option>Recently published</option><option>Already established</option><option>Managing multiple titles</option></select></label><Field name="launchDate" label="Publication or launch date" type="date" /><Field name="bookUrl" label="Book or website link" placeholder="https://" /></div><label className="field"><span>Services of interest</span><input name="services" placeholder="For example: launch strategy, Amazon, author platform" onChange={e => update("services", e.target.value)} /></label><label className="field"><span>What would you most like to change?</span><textarea name="goals" rows={3} onChange={e => update("goals", e.target.value)} /></label><div className="form-grid"><label className="field"><span>Approximate budget range</span><select name="budget" onChange={e => update("budget", e.target.value)}><option value="">Prefer to discuss</option><option>Focused project</option><option>Launch campaign</option><option>Ongoing support</option><option>Custom / publisher scope</option></select></label><label className="field"><span>Preferred contact method</span><select name="contactMethod" onChange={e => update("contactMethod", e.target.value)}><option>Email</option><option>Conversation / call</option><option>Message, once connected</option></select></label></div><label className="field"><span>Anything else we should know?</span><textarea name="description" rows={5} onChange={e => update("description", e.target.value)} /></label><label className="consent"><input type="checkbox" name="consent" required onChange={e => update("consent", String(e.target.checked))} /><span>I understand that this enquiry form is being prepared for connection to a real inbox or CRM, and I consent to my details being used to respond to this enquiry. *</span></label>{status === "success" && <div className="form-status form-status--success"><Check size={18} />{message}</div>}{status === "error" && <div className="form-status form-status--error">{message}</div>}<button className="button button--gold" type="submit" disabled={status === "sending"}>{status === "sending" ? "Preparing…" : "Send project enquiry"}<ArrowUpRight size={16} aria-hidden="true" /></button><p className="form-note">No guarantee of sales, rankings, or bestseller status is implied. Any advertising budget or third-party cost is separate from agency fees unless a proposal says otherwise.</p></form>;
}

export function PlaceholderMedia({ label, tall = false }: { label: string; tall?: boolean }) { return <div className={`placeholder-media ${tall ? "placeholder-media--tall" : ""}`}><div className="placeholder-spine" /><div className="placeholder-copy"><span>Image slot</span><strong>{label}</strong><small>Replace with an approved brand, founder, book, or campaign asset.</small></div></div>; }

export function ProofPlaceholder({ label = "Approved proof placeholder" }: { label?: string }) { return <div className="proof-placeholder"><span className="proof-dot" /><span>{label}</span><span className="proof-rule" /></div>; }

export function PageIntro({ kicker, title, text }: { kicker: string; title: string; text: string }) { return <div className="shell page-intro"><SectionLabel>{kicker}</SectionLabel><h1>{title}</h1><p>{text}</p></div>; }

export { seo };
