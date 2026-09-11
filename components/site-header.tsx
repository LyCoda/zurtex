/* oxlint-disable next/no-html-link-for-pages -- Native navigation avoids the deployed Vinext RSC Link runtime failure. */
"use client";
import { ArrowRight, Menu, PawPrint, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
const links = [
  ["/methodology", "How it works"],
  ["/consultation", "Consultation"],
  ["/about", "Who we are"],
  ["/contact", "Contact"],
];
export function MarketingHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  function closeOnEscape(e: { key: string }) {
    if (e.key === "Escape" && open) {
      setOpen(false);
      document.getElementById("menu-toggle")?.focus();
    }
  }
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="zurtex-header">
        <a className="brand" href="/" aria-label="Zurtex home" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <PawPrint size={20} />
          </span>
          <span>Zurtex</span>
        </a>

        <a className="header-route" href="/" onClick={() => setOpen(false)}>
          Free route guide <ArrowRight size={17} />
        </a>
        <button
          id="menu-toggle"
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
          onKeyDown={closeOnEscape}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
        <nav
          id="main-menu"
          className={`zurtex-nav ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              onClick={() => setOpen(false)}
              onKeyDown={closeOnEscape}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
