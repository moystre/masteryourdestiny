"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import ContactModal from "./ContactModal"

const sans  = '"Karla", system-ui, sans-serif'
const C = { lav:"#D8B4FE", muted:"#A78BFA", cardBorder:"#6B21A8" }
const navLinks: [string, string][] = [["Program","program"],["Testimonials","testimonials"],["About us","about"],["FAQ","faq"]]
const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" })

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    if (isHome) { e.preventDefault(); setMenuOpen(false); scrollTo(id) }
    else setMenuOpen(false)
  }

  return (
    <nav style={{ width:"100%", padding:"14px 36px", display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", borderBottom:"1px solid rgba(107,33,168,0.2)", background:"linear-gradient(to right, #000000 0px, #000000 220px, rgba(20,11,34,0.97) 420px)", backdropFilter:"blur(12px)", position:"sticky", top:0, zIndex:100 }} className="r-pad">
      <Link href="/" style={{ display:"block", flexShrink:1, minWidth:0 }}>
        <img src="/images/img-1HsZ.png" alt="Master Your Destiny" className="nav-logo" style={{ height:"32px", width:"auto", display:"block", maxWidth:"100%" }} />
      </Link>
      <div style={{ display:"flex", gap:"28px", alignItems:"center" }} className="r-hide">
        {navLinks.map(([l, id]) => (
          <a key={l} href={`/#${id}`} className="nav-link" onClick={e => handleNavClick(e, id)} style={{ fontFamily:sans, fontSize:"14px", color:C.lav, textDecoration:"none", opacity:0.55, cursor:"pointer" }}>{l}</a>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
        <a href="/#signup" className="btn-ghost" onClick={e => { if (isHome) { e.preventDefault(); scrollTo("signup") } }} style={{ display:"inline-flex", alignItems:"center", fontFamily:sans, fontWeight:600, fontSize:"13px", padding:"9px 22px", backgroundColor:"transparent", color:C.lav, border:`1px solid ${C.cardBorder}`, borderRadius:"6px", textDecoration:"none", whiteSpace:"nowrap" as const, cursor:"pointer", lineHeight:1 }}>Join Waitlist</a>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span key={String(menuOpen)} className="menu-icon">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>
      <div className={`mobile-nav-dropdown${menuOpen ? " open" : ""}`}>
        {navLinks.map(([l, id]) => (
          <a key={l} href={`/#${id}`} className="nav-link" onClick={e => handleNavClick(e, id)} style={{ fontFamily:sans, color:C.lav, textDecoration:"none", display:"block" }}>{l}</a>
        ))}
        <div className="mobile-nav-footer">
          <a href="/privacy" className="mobile-nav-sec-link" onClick={() => setMenuOpen(false)}>Privacy</a>
          <a href="/terms" className="mobile-nav-sec-link" onClick={() => setMenuOpen(false)}>Terms</a>
          <button onClick={() => { setMenuOpen(false); setShowContact(true) }} className="mobile-nav-sec-link" style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>Contact</button>
        </div>
      </div>
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </nav>
  )
}
