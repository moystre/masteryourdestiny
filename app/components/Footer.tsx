"use client"
import { useState } from "react"
import ContactModal from "./ContactModal"

const serif = '"Zodiak", Georgia, serif'
const sans  = '"Karla", system-ui, sans-serif'
const C = { white:"#FFFFFF", lav:"#D8B4FE", muted:"#A78BFA", body:"#D0B0F2", pink:"#C2185B" }

const navLinks = [
  { label:"Program",      href:"/#program" },
  { label:"Testimonials", href:"/#testimonials" },
  { label:"About us",     href:"/#about" },
  { label:"FAQ",          href:"/#faq" },
  { label:"Join Waitlist",href:"/#signup" },
]

const linkStyle = { fontFamily:sans, fontSize:"13px", color:"rgba(167,139,250,0.55)", textDecoration:"none", transition:"color 0.15s", fontWeight:400 } as const

export default function Footer() {
  const [showContact, setShowContact] = useState(false)

  return (
    <>
      {/* Footer CTA */}
      <section style={{ width:"100%", padding:"64px 36px 52px", boxSizing:"border-box" as const, display:"flex", flexDirection:"column" as const, alignItems:"center", gap:"32px", backgroundColor:"#0C0819", textAlign:"center" as const }}>
        <p style={{ fontFamily:sans, fontSize:"12px", color:C.muted, letterSpacing:"0.14em", fontWeight:500, textTransform:"uppercase" as const, margin:0 }}>✦ Master Your Destiny</p>
        <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"clamp(34px,4.5vw,54px)", color:C.white, lineHeight:1.12, maxWidth:"700px", textAlign:"center", margin:0 }}>Your transformation starts with a single decision</h2>
        <p style={{ fontFamily:sans, fontSize:"17px", color:C.body, lineHeight:1.65, maxWidth:"480px", textAlign:"center", margin:0, fontWeight:400 }}>Join thousands who have already taken the step. Seats are limited — secure yours now before they&apos;re gone.</p>
        <a href="/#signup" className="btn-pink" style={{ fontFamily:sans, fontWeight:700, fontSize:"18px", padding:"16px 52px", backgroundColor:C.pink, color:C.white, borderRadius:"6px", textDecoration:"none", display:"inline-block", whiteSpace:"nowrap" as const }}>Reserve My Spot</a>
        <p style={{ fontFamily:sans, fontSize:"13px", color:C.muted, margin:0, fontWeight:400 }}>Questions?{" "}
          <button onClick={() => setShowContact(true)} style={{ background:"none", border:"none", cursor:"pointer", color:C.lav, fontFamily:sans, fontSize:"13px", padding:0, fontWeight:400 }}>team@joshandpoliofficial.com</button>
        </p>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor:"#000000", borderTop:"1px solid rgba(107,33,168,0.2)", padding:"48px 36px 28px", boxSizing:"border-box" as const, width:"100%" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr 1fr", gap:"40px", marginBottom:"36px" }}>

          {/* Brand */}
          <div style={{ display:"flex", flexDirection:"column" as const, gap:"16px" }}>
            <img src="/images/img-1HsZ.png" alt="Master Your Destiny" style={{ maxHeight:"32px", height:"auto", width:"auto", maxWidth:"200px", display:"block" }} />
            <p style={{ fontFamily:sans, fontSize:"13px", color:"rgba(255,255,255,0.38)", lineHeight:1.65, margin:0, maxWidth:"260px", fontWeight:400 }}>
              A transformational 2-day live event by Josh &amp; Poli — ancient wisdom engineered for modern transformation.
            </p>
          </div>

          {/* Navigation */}
          <div style={{ display:"flex", flexDirection:"column" as const, gap:"12px" }}>
            <h5 style={{ fontFamily:sans, fontSize:"11px", fontWeight:600, color:C.muted, letterSpacing:"0.12em", textTransform:"uppercase" as const, margin:0 }}>Navigation</h5>
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = C.lav)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(167,139,250,0.55)")}>
                {label}
              </a>
            ))}
          </div>

          {/* Legal & Contact */}
          <div style={{ display:"flex", flexDirection:"column" as const, gap:"12px" }}>
            <h5 style={{ fontFamily:sans, fontSize:"11px", fontWeight:600, color:C.muted, letterSpacing:"0.12em", textTransform:"uppercase" as const, margin:0 }}>Legal &amp; Contact</h5>
            <a href="/privacy" style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = C.lav)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(167,139,250,0.55)")}>Privacy Policy</a>
            <a href="/terms" style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = C.lav)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(167,139,250,0.55)")}>Terms of Service</a>
            <button
              onClick={() => setShowContact(true)}
              style={{ ...linkStyle, background:"none", border:"none", cursor:"pointer", padding:0, textAlign:"left" as const }}
              onMouseEnter={e => (e.currentTarget.style.color = C.lav)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(167,139,250,0.55)")}>
              Contact Us
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid rgba(107,33,168,0.12)", paddingTop:"20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap" as const, gap:"10px" }}>
          <span style={{ fontFamily:sans, fontSize:"12px", color:"rgba(255,255,255,0.22)", fontWeight:400 }}>© 2026 Josh &amp; Poli Official. All rights reserved.</span>
          <span style={{ fontFamily:sans, fontSize:"12px", color:"rgba(255,255,255,0.18)", fontWeight:400 }}>✦ Master Your Destiny</span>
        </div>
      </footer>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </>
  )
}
