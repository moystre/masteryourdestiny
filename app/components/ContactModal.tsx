"use client"

const sans  = '"Karla", system-ui, sans-serif'
const serif = '"Zodiak", Georgia, serif'
const C = { card:"#1A0835", cardBorder:"#6B21A8", white:"#FFFFFF", lav:"#D8B4FE", muted:"#A78BFA", body:"#D0B0F2", pink:"#C2185B" }

export default function ContactModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Overlay — starts at 62px (below navbar), so navbar stays fully visible */}
      <div
        onClick={onClose}
        style={{ position:"fixed", top:"62px", left:0, right:0, bottom:0, backgroundColor:"rgba(0,0,0,0.92)", backdropFilter:"blur(8px)", zIndex:90 }}
      />
      {/* Modal — centered in the content area below the navbar */}
      <div style={{ position:"fixed", top:"calc(50vh + 31px)", left:"50%", transform:"translate(-50%,-50%)", zIndex:91, width:"min(460px,90vw)", backgroundColor:C.card, border:`1px solid ${C.cardBorder}`, borderRadius:"10px", padding:"44px 48px", textAlign:"center", display:"flex", flexDirection:"column", gap:"18px", boxShadow:"0 24px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(107,33,168,0.18)" }}>
        <button onClick={onClose} style={{ position:"absolute", top:"16px", right:"20px", background:"none", border:"none", cursor:"pointer", fontFamily:sans, fontSize:"20px", color:C.muted, lineHeight:1, padding:"6px", opacity:0.7 }}>✕</button>
        <p style={{ fontFamily:sans, fontSize:"11px", color:C.muted, letterSpacing:"0.14em", fontWeight:500, textTransform:"uppercase" as const, margin:0 }}>✦ Get in touch</p>
        <h3 style={{ fontFamily:serif, fontWeight:400, fontSize:"30px", color:C.white, margin:0 }}>Contact Us</h3>
        <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.65, margin:0, fontWeight:400 }}>
          Have a question or need help?<br />We&apos;d love to hear from you.
        </p>
        <a
          href="mailto:team@joshandpoliofficial.com"
          style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"10px", fontFamily:sans, fontWeight:600, fontSize:"15px", color:C.white, backgroundColor:C.pink, padding:"14px 28px", borderRadius:"6px", textDecoration:"none", letterSpacing:"0.04em" }}
        >
          team@joshandpoliofficial.com
        </a>
        <p style={{ fontFamily:sans, fontSize:"13px", color:C.muted, margin:0, fontWeight:400 }}>We typically respond within 48 hours.</p>
      </div>
    </>
  )
}
