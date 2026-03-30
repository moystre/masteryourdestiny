"use client"
import Link from "next/link"

const serif = '"Zodiak", Georgia, serif'
const sans  = '"Karla", system-ui, sans-serif'
const C = { bg:"#140B22", white:"#FFFFFF", lav:"#D8B4FE", muted:"#A78BFA", body:"#D0B0F2" }

export default function Terms() {
  return (
    <div className="legal-page" style={{ minHeight:"100vh", backgroundColor:C.bg, fontFamily:sans, color:C.white }}>
      {/* Sticky back bar — sits below shared navbar at top:62px */}
      <div style={{ position:"sticky", top:"62px", zIndex:50, background:"rgba(5,2,15,0.65)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(107,33,168,0.18)", padding:"10px 36px" }}>
        <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:"10px", fontFamily:sans, fontWeight:600, fontSize:"14px", color:C.lav, textDecoration:"none", padding:"5px 18px", border:"1px solid rgba(107,33,168,0.45)", borderRadius:"4px", lineHeight:1 }}>
          <span style={{ fontSize:"20px", lineHeight:1, fontWeight:400 }}>‹</span>
          <span>Back</span>
        </Link>
      </div>

      {/* Content */}
      <div style={{ maxWidth:"760px", margin:"0 auto", padding:"52px 36px", display:"flex", flexDirection:"column", gap:"28px" }}>
        <h1 style={{ fontFamily:serif, fontWeight:400, fontSize:"clamp(36px,4.5vw,52px)", color:C.white, lineHeight:1.1, margin:0 }}>Terms & Conditions</h1>
        <p style={{ fontFamily:sans, fontSize:"13px", color:C.muted, margin:0, fontWeight:400 }}>Last updated: March 14, 2026</p>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>1. Acceptance of Terms</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>By accessing or using this website and registering for any Master Your Destiny event, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.</p>
        </section>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>2. Event Participation</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>Participants agree to engage respectfully with all facilitators and attendees. Josh & Poli Official reserve the right to remove any participant from the event without refund if their behaviour is disruptive or harmful to others.</p>
        </section>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>3. Refund Policy</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>We offer a full money-back guarantee. If you feel the event did not meet your expectations after Day 1, contact us and we will arrange a full refund plus $100. Refund requests must be submitted within 48 hours of the event conclusion.</p>
        </section>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>4. Disclaimer & No Medical Advice</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>Master Your Destiny events are for personal development purposes only. Content presented does not constitute medical, psychological, financial, or legal advice. Results mentioned are individual experiences and yours may vary. By participating you acknowledge this disclaimer.</p>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>You must not rely on any information on our website as an alternative to medical advice from your doctor or other professional healthcare provider. If you have any specific questions about any medical matter or if you think you may be suffering from any medical condition, you should consult your doctor or other professional healthcare provider. You should never delay seeking medical advice, disregard medical advice or discontinue medical treatment because of information on our website.</p>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>Results cannot be guaranteed. Moreover, results from individual testimonials are for reference only and your own personal experience may differ to those shown on this site.</p>
        </section>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>5. Intellectual Property</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>All content, materials, techniques, and methodologies presented during Master Your Destiny events are the intellectual property of Josh & Poli Official. Recording, reproduction, or distribution of event content without written permission is strictly prohibited.</p>
        </section>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>6. Third-Party Platforms</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>This site is NOT part of the Facebook website or Meta (Facebook Inc.). Additionally, this site is NOT endorsed by Meta (Facebook) in any way. META (FACEBOOK) is a trademark of META (FACEBOOK) Inc.</p>
        </section>

        <div style={{ borderTop:"1px solid rgba(107,33,168,0.2)", paddingTop:"28px" }}>
          <p style={{ fontFamily:sans, fontSize:"14px", color:C.muted, margin:0, fontWeight:400 }}>Questions? Contact us at <a href="mailto:team@joshandpoliofficial.com" style={{ color:C.lav, textDecoration:"none" }}>team@joshandpoliofficial.com</a></p>
        </div>
      </div>
    </div>
  )
}
