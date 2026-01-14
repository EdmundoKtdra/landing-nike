import { useState, useEffect } from "react";

interface Link {
  label: string;
  href: string;
}

interface MobileMenuProps {
  links: Link[];
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* BOTÓN */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden relative z-50 p-2 text-white hover:text-lime-400 transition-colors"
        aria-label="Abrir menú"
      >
        <span className="text-3xl leading-none">{open ? "✕" : "☰"}</span>
      </button>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* MENÚ */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-neutral-950 border-l border-white/10 z-50 transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) shadow-2xl
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-8 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <ul className="flex flex-col gap-6 mt-20">
            {links.map((link, i) => (
              <li
                key={link.href}
                className={`transform transition-all duration-500
                ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                style={{ transitionDelay: `${100 + i * 50}ms` }}
              >
                <a
                  href={link.href}
                  className="text-2xl font-black uppercase italic tracking-tighter text-white/90 hover:text-lime-400 transition-colors flex items-center group"
                  onClick={() => setOpen(false)}
                >
                  <span className="w-0 group-hover:w-4 h-[2px] bg-lime-400 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
