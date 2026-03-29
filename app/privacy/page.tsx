"use client"
import Link from "next/link"

const serif = '"Zodiak", Georgia, serif'
const sans  = '"Karla", system-ui, sans-serif'
const C = { bg:"#140B22", white:"#FFFFFF", lav:"#D8B4FE", muted:"#A78BFA", body:"#D0B0F2" }

export default function Privacy() {
  return (
    <div style={{ minHeight:"100vh", backgroundColor:C.bg, fontFamily:sans, color:C.white }}>
      {/* Sticky back bar — sits below shared navbar at top:62px */}
      <div style={{ position:"sticky", top:"62px", zIndex:50, background:"rgba(5,2,15,0.65)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(107,33,168,0.18)", padding:"10px 36px" }}>
        <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:"10px", fontFamily:sans, fontWeight:600, fontSize:"14px", color:C.lav, textDecoration:"none", padding:"5px 18px", border:"1px solid rgba(107,33,168,0.45)", borderRadius:"4px", lineHeight:1 }}>
          <span style={{ fontSize:"20px", lineHeight:1, fontWeight:400 }}>‹</span>
          <span>Back</span>
        </Link>
      </div>

      {/* Content */}
      <div style={{ maxWidth:"760px", margin:"0 auto", padding:"52px 36px", display:"flex", flexDirection:"column", gap:"28px" }}>
        <h1 style={{ fontFamily:serif, fontWeight:400, fontSize:"clamp(36px,4.5vw,52px)", color:C.white, lineHeight:1.1, margin:0 }}>Privacy Policy</h1>
        <p style={{ fontFamily:sans, fontSize:"13px", color:C.muted, margin:0, fontWeight:400 }}>Last updated: March 14, 2026</p>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>1. Information We Collect</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>We collect information you provide directly when you register for our waitlist or events, including your first name, last name, and email address. We may also collect usage data such as pages visited and interaction patterns to improve your experience.</p>
        </section>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>2. How We Use Your Information</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>We use your information to send you event notifications, updates about Master Your Destiny, and relevant communications related to your registration. We will never sell or share your personal data with third parties for marketing purposes.</p>
        </section>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>3. Data Security</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>We implement appropriate security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. Your data is stored securely and access is restricted to authorised personnel only.</p>
        </section>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>4. Your Rights</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>You have the right to access, correct, or delete your personal data at any time. To exercise these rights or if you have any questions about how we handle your data, please contact us at <a href="mailto:team@joshandpoliofficial.com" style={{ color:C.lav, textDecoration:"none" }}>team@joshandpoliofficial.com</a>.</p>
        </section>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>5. Cookies</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>We use cookies to improve your browsing experience and analyse site traffic. You can control cookie settings through your browser preferences at any time.</p>
        </section>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>6. Medical Disclaimer</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>You must not rely on any information on our website as an alternative to medical advice from your doctor or other professional healthcare provider. If you have any specific questions about any medical matter or if you think you may be suffering from any medical condition, you should consult your doctor or other professional healthcare provider. You should never delay seeking medical advice, disregard medical advice or discontinue medical treatment because of information on our website.</p>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>Results cannot be guaranteed. Moreover, results from individual testimonials are for reference only and your own personal experience may differ to those shown on this site.</p>
        </section>

        <section style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"24px", color:C.white, margin:0 }}>7. Third-Party Platforms</h2>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.75, margin:0, fontWeight:400 }}>This site is NOT part of the Facebook website or Meta (Facebook Inc.). Additionally, this site is NOT endorsed by Meta (Facebook) in any way. META (FACEBOOK) is a trademark of META (FACEBOOK) Inc.</p>
        </section>

        <div style={{ borderTop:"1px solid rgba(107,33,168,0.2)", paddingTop:"28px" }}>
          <p style={{ fontFamily:sans, fontSize:"14px", color:C.muted, margin:0, fontWeight:400 }}>Questions? Contact us at <a href="mailto:team@joshandpoliofficial.com" style={{ color:C.lav, textDecoration:"none" }}>team@joshandpoliofficial.com</a></p>
        </div>
      </div>
    </div>
  )
}
