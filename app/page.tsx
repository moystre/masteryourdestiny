"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import LiquidEther from "./components/LiquidEther"

const C = {
  bg:"#140B22", bgMid:"#110820", bgDark:"#0A0514",
  card:"#2D0A64", cardBorder:"#6B21A8",
  accent:"#A855F7", btn:"#581C87", btnBorder:"#7C3AED",
  white:"#FFFFFF", lav:"#D8B4FE", muted:"#A78BFA", body:"#D0B0F2",
  gold:"#FBBF24", pink:"#C2185B",
}
const serif = '"Zodiak", Georgia, serif'
const sans  = '"Karla", system-ui, sans-serif'
const sec: React.CSSProperties = { width:"100%", padding:"56px 36px", boxSizing:"border-box", display:"flex", flexDirection:"column", alignItems:"center", gap:"32px" }
const inn: React.CSSProperties = { width:"100%", maxWidth:"1080px" }
const h2s: React.CSSProperties = { fontFamily:serif, fontWeight:400, fontSize:"clamp(32px,3.8vw,48px)", color:C.white, lineHeight:1.12, margin:0 }
const bdy: React.CSSProperties = { fontFamily:sans, fontSize:"16px", color:C.body, lineHeight:1.65, margin:0, fontWeight:400 }
const crd: React.CSSProperties = { backgroundColor:C.card, borderRadius:"6px", border:`1px solid ${C.cardBorder}`, padding:"24px", display:"flex", flexDirection:"column", gap:"12px" }
const inp: React.CSSProperties = { width:"100%", padding:"12px 16px", backgroundColor:"rgba(168,85,247,0.15)", border:"1px solid rgba(168,85,247,0.5)", borderRadius:"6px", color:C.white, fontSize:"15px", fontFamily:sans, boxSizing:"border-box", outline:"none" }

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" })

function Btn({ children, variant="solid", style={}, onClick }: { children:React.ReactNode; variant?:"solid"|"ghost"|"outline-gold"|"pink"; style?:React.CSSProperties; onClick?:()=>void }) {
  const base: React.CSSProperties = { border:"none", borderRadius:"6px", cursor:"pointer", fontFamily:sans, fontWeight:600, fontSize:"14px", padding:"10px 24px", whiteSpace:"nowrap", ...style }
  if (variant==="pink")         return <button onClick={onClick} className="btn-pink"  style={{ ...base, backgroundColor:C.pink, color:C.white }}>{children}</button>
  if (variant==="outline-gold") return <button onClick={onClick} className="btn-gold"  style={{ ...base, backgroundColor:"transparent", color:"#F59E0B", border:"1px solid #F59E0B", letterSpacing:"0.08em" }}>{children}</button>
  return <button onClick={onClick} className={variant==="solid"?"btn-solid":"btn-ghost"} style={variant==="solid" ? { ...base, backgroundColor:C.btn, color:C.white, border:`1px solid ${C.btnBorder}` } : { ...base, backgroundColor:"transparent", color:C.lav, border:`1px solid ${C.cardBorder}` }}>{children}</button>
}
function Eye({ children, align="center" }: { children:React.ReactNode; align?:"center"|"left" }) {
  return <p style={{ fontFamily:sans, fontSize:"12px", color:C.muted, letterSpacing:"0.14em", fontWeight:500, textTransform:"uppercase", margin:0, textAlign:align }}>✦ {children}</p>
}
function StarIcon() {
  return <svg width="13" height="13" viewBox="0 0 51 48" fill="#FBBF24" style={{ display:"block", flexShrink:0 }}><path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/></svg>
}
function Stars() {
  return (
    <div style={{ display:"flex", gap:"5px", alignItems:"center" }}>
      {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
      <span style={{ fontFamily:sans, fontSize:"14px", color:C.muted, marginLeft:"5px" }}>5.0/5</span>
    </div>
  )
}

/* ── Fade-in on scroll ── */
function FadeIn({ children, delay=0, style={} }: { children:React.ReactNode; delay?:number; style?:React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold:0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(16px)", transition:`opacity 1.1s ease ${delay}ms, transform 1.1s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

/* ── Mini stacked reviews ── */
function MiniReviews() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
      <div style={{ display:"flex" }}>
        {["/images/avatar-1.png","/images/avatar-2.png","/images/avatar-3.png","https://picsum.photos/seed/av4/60/60","https://picsum.photos/seed/av5/60/60"].map((src,i) => (
          <img key={i} src={src} alt="" style={{ width:"34px", height:"34px", borderRadius:"50%", border:"2px solid #140B22", marginLeft:i===0?0:"-9px", objectFit:"cover", display:"block" }} />
        ))}
      </div>
      <span style={{ fontFamily:sans, fontSize:"13px", color:C.muted, fontWeight:500 }}>1,173+ reviews</span>
    </div>
  )
}

/* ── Vimeo — autoplay (muted) when scrolled into view; click unmutes ── */
function VimeoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = containerRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } }, { threshold:0.4 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div ref={containerRef} onClick={() => { if (!active) setActive(true) }} style={{ width:"100%", maxWidth:"1040px", aspectRatio:"16/9", borderRadius:"6px", overflow:"hidden", border:`1px solid ${C.cardBorder}`, backgroundColor:"#1A0835", position:"relative", cursor:active?"default":"pointer" }}>
      {active ? (
        <iframe src="https://player.vimeo.com/video/910750337?autoplay=1&muted=1&autopause=0&color=7C3AED&title=0&byline=0&portrait=0" width="100%" height="100%" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{ display:"block", width:"100%", height:"100%", position:"absolute", inset:0 }} />
      ) : (
        <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"16px" }}>
          <div style={{ width:"68px", height:"68px", backgroundColor:C.btn, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid ${C.btnBorder}` }}>
            <span style={{ fontSize:"22px", marginLeft:"4px", color:C.white }}>▶</span>
          </div>
          <span style={{ fontFamily:sans, fontSize:"14px", color:C.muted }}>Watch — discover the truth behind this process</span>
        </div>
      )}
    </div>
  )
}

/* ── Curriculum Carousel — arrows below ── */
type CurrItem = { label:string; title:string; body:string; img:string }
function CurriculumCarousel({ items, cardMinTextHeight=0 }: { items:CurrItem[]; cardMinTextHeight?:number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [st, setSt] = useState({ over:false, start:true, end:false })
  const check = useCallback(() => {
    const el = ref.current; if (!el) return
    setSt({ over: el.scrollWidth > el.clientWidth + 2, start: el.scrollLeft <= 2, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2 })
  }, [])
  useEffect(() => {
    check()
    const el = ref.current
    el?.addEventListener("scroll", check, { passive:true })
    window.addEventListener("resize", check)
    return () => { el?.removeEventListener("scroll", check); window.removeEventListener("resize", check) }
  }, [check])
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 340, behavior:"smooth" })
  return (
    <div>
      <div ref={ref} className="no-scrollbar" style={{ display:"flex", gap:"16px", overflowX:"auto", scrollSnapType:"x mandatory", WebkitOverflowScrolling:"touch", alignItems:"stretch" } as React.CSSProperties}>
        {items.map((c,i) => (
          <div key={i} style={{ ...crd, padding:0, overflow:"hidden", minWidth:"280px", flex:"1 0 calc(33% - 12px)", maxWidth:"400px", scrollSnapAlign:"start", display:"flex", flexDirection:"column" }}>
            <img src={c.img} alt="" style={{ width:"100%", aspectRatio:"4/3", objectFit:"cover", display:"block", flexShrink:0 }} />
            <div style={{ padding:"18px", display:"flex", flexDirection:"column", gap:"8px", flex:1, minHeight: cardMinTextHeight > 0 ? cardMinTextHeight : undefined }}>
              <span style={{ fontFamily:sans, fontSize:"11px", color:C.muted, fontWeight:500, letterSpacing:"0.08em" }}>{c.label}</span>
              <h4 style={{ fontFamily:serif, fontSize:"18px", fontWeight:400, color:C.white, margin:0, lineHeight:1.3 }}>{c.title}</h4>
              <p style={{ fontFamily:sans, fontSize:"14px", color:C.body, margin:0, lineHeight:1.6 }}>{c.body}</p>
            </div>
          </div>
        ))}
      </div>
      {st.over && (
        <div style={{ display:"flex", gap:"6px", marginTop:"14px", justifyContent:"center" }}>
          <button onClick={() => scroll(-1)} disabled={st.start} style={{ background:"none", border:`1px solid rgba(107,33,168,${st.start?"0.2":"0.45"})`, cursor:st.start?"default":"pointer", color:st.start?"rgba(168,85,247,0.28)":C.lav, padding:"6px 20px", borderRadius:"4px", fontFamily:sans, fontSize:"20px", lineHeight:1, transition:"all 0.15s" }}>‹</button>
          <button onClick={() => scroll(1)}  disabled={st.end}   style={{ background:"none", border:`1px solid rgba(107,33,168,${st.end  ?"0.2":"0.45"})`, cursor:st.end  ?"default":"pointer", color:st.end  ?"rgba(168,85,247,0.28)":C.lav, padding:"6px 20px", borderRadius:"4px", fontFamily:sans, fontSize:"20px", lineHeight:1, transition:"all 0.15s" }}>›</button>
        </div>
      )}
    </div>
  )
}

/* ── All-Days Carousel — single scroll, DAY labels above correct cards ── */
function AllDaysCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const [st, setSt] = useState({ over:false, start:true, end:false })
  const check = useCallback(() => {
    const el = ref.current; if (!el) return
    setSt({ over: el.scrollWidth > el.clientWidth + 2, start: el.scrollLeft <= 2, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2 })
  }, [])
  useEffect(() => {
    check()
    const el = ref.current
    el?.addEventListener("scroll", check, { passive:true })
    window.addEventListener("resize", check)
    return () => { el?.removeEventListener("scroll", check); window.removeEventListener("resize", check) }
  }, [check])
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 360, behavior:"smooth" })
  const groups = [{ day:"DAY 1", items:DAY1_ITEMS }, { day:"DAY 2", items:DAY2_ITEMS }]
  return (
    <div>
      <div style={{ position:"relative" }}>
        <div ref={ref} className="no-scrollbar" style={{ display:"flex", gap:"16px", overflowX:"auto", alignItems:"stretch", padding:"4px 36px 0" } as React.CSSProperties}>
          {groups.map(({ day, items }) => (
            <div key={day} style={{ display:"flex", flexDirection:"column", gap:"14px", flexShrink:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                <span style={{ fontFamily:sans, fontSize:"13px", fontWeight:500, color:C.muted, letterSpacing:"0.08em", whiteSpace:"nowrap" }}>◈ {day}</span>
                <div style={{ flex:1, height:"1px", backgroundColor:"rgba(107,33,168,0.3)", minWidth:"60px" }} />
              </div>
              <div style={{ display:"flex", gap:"16px", flex:1, alignItems:"stretch" }}>
                {items.map((c, i) => (
                  <div key={i} style={{ ...crd, padding:0, overflow:"hidden", width:"280px", flexShrink:0, display:"flex", flexDirection:"column" }}>
                    <img src={c.img} alt="" style={{ width:"100%", aspectRatio:"4/3", objectFit:"cover", display:"block", flexShrink:0 }} />
                    <div style={{ padding:"18px", display:"flex", flexDirection:"column", gap:"8px", flex:1 }}>
                      <span style={{ fontFamily:sans, fontSize:"11px", color:C.muted, fontWeight:500, letterSpacing:"0.08em" }}>{c.label}</span>
                      <h4 style={{ fontFamily:serif, fontSize:"18px", fontWeight:400, color:C.white, margin:0, lineHeight:1.3 }}>{c.title}</h4>
                      <p style={{ fontFamily:sans, fontSize:"14px", color:C.body, margin:0, lineHeight:1.6 }}>{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {st.over && (
        <div style={{ display:"flex", gap:"6px", marginTop:"24px", justifyContent:"center" }}>
          <button onClick={() => scroll(-1)} disabled={st.start} style={{ background:"none", border:`1px solid rgba(107,33,168,${st.start?"0.2":"0.45"})`, cursor:st.start?"default":"pointer", color:st.start?"rgba(168,85,247,0.28)":C.lav, padding:"6px 20px", borderRadius:"4px", fontFamily:sans, fontSize:"20px", lineHeight:1, transition:"all 0.15s" }}>‹</button>
          <button onClick={() => scroll(1)}  disabled={st.end}   style={{ background:"none", border:`1px solid rgba(107,33,168,${st.end?"0.2":"0.45"})`, cursor:st.end?"default":"pointer", color:st.end?"rgba(168,85,247,0.28)":C.lav, padding:"6px 20px", borderRadius:"4px", fontFamily:sans, fontSize:"20px", lineHeight:1, transition:"all 0.15s" }}>›</button>
        </div>
      )}
    </div>
  )
}

/* ── Count Up ── */
function fmtN(n: number, to: number, raw=false): string {
  if (raw) return String(n)
  if (to >= 1000000) return (n / 1000000).toFixed(n >= to ? 0 : 1).replace(/\.0$/,"") + "M"
  return String(n)
}
function CountUp({ to, suffix="", raw=false }: { to:number; suffix?:string; raw?:boolean }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const ran = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true; obs.disconnect()
        const start = Date.now(), dur = 4500
        const tick = () => {
          const p = Math.min((Date.now()-start)/dur, 1)
          setN(Math.round((1 - Math.pow(1-p, 3)) * to))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold:0.5 })
    obs.observe(el); return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{fmtN(n, to, raw)}{suffix}</span>
}

/* ── Testimonial Tickers ── */
const TICKERS = [
  [
    { quote:"I've invested in a few coaching programs over the past 3 years and NOTHING IS BETTER THAN THIS ONE!", name:"Kina Y", role:"YouTuber / Tarot Reader" },
    { quote:"They have helped me release years and years and years of suppressed energy and stuck emotions (In only 4 weeks)", name:"JP", role:"Masculinity Coach" },
    { quote:"It's life changing, I've felt the shift inside of me… There's less fogginess in my headspace… It's like instant rapid change!", name:"Kina Y", role:"YouTuber / Tarot Reader" },
    { quote:"These techniques are different from anything else that I've experienced before. It changed my perception and has reignited a spark within me. Honestly life changing!", name:"Mandy D", role:"" },
  ],
  [
    { quote:"I've done meditations all the time but I've never really had that silence... But this was so profound. I had that connection so deeply (for the first time)", name:"Coryn B", role:"Entrepreneur" },
    { quote:"Within the first week or two of the course I had 2 manifestations happen... 1 Which has been a manifestation of the last 3 years!! The transformational shifts were really fast!", name:"Coryn B", role:"Entrepreneur" },
    { quote:"I gained peace, knowledge, insights about my internal patterns, which I wasn't fully aware of. Even though I'm a hypnotherapist and my daily job is to work with the unconscious mind. But it gave me profound insight into myself.", name:"Jo G", role:"Hypnotherapist" },
    { quote:"I cannot recommend it enough! I didn't really know I just felt like something was missing (in life)… And that has completely gone! I'm so grateful that I took the decision. I feel like a new person and I cannot thank them enough", name:"J Mylard", role:"" },
  ],
  [
    { quote:"I wholeheartedly encourage you to join them... You will feel like a new person, liberated and connected to what you're truly looking for and your higher self", name:"Jo G", role:"Hypnotherapist" },
    { quote:"I'm so happy that I trusted them because I knew what they would teach and share would be extremely beneficial to my process too!", name:"Jo G", role:"Hypnotherapist" },
    { quote:"I've finally been able to release the self doubts I've been carrying for years... I was able to shift into the new timeline, the new me, the new reality... I feel like I'm always in High Vibes (now)", name:"Jo G", role:"Hypnotherapist" },
    { quote:"I received guidance, I had such clarity… I now understand what was limiting me… A new level of consciousness… A new level of love and a new level of soul connection", name:"Jules W", role:"" },
  ],
  [
    { quote:"They have got me to recognise the blocked energies that I have stored over the years and release them... And now I feel so much freer", name:"Angela B", role:"Teacher" },
    { quote:"I've been able to gain back my energy and the motivation to shed my light! I'm now able to be calm when stressful situations arise. I'm so grateful I took that leap of faith — I'm in a completely different place than when I started", name:"Angela B", role:"Teacher" },
    { quote:"I have done a lot of courses but nothing was like this! I went from serious financial crisis, relationship crisis and even wanted to end my life... But after I went through the program it was one of the best things that happened to me.", name:"Smitha V", role:"Healer" },
    { quote:"It was the best 2 days of my life! Thank you… Thank you Josh & Poli", name:"Gregy S", role:"" },
    { quote:"It was deep, It was intense, It was NEEDED!", name:"JP", role:"Masculinity Coach" },
    { quote:"You changed my life, like no words can describe the experience, and anyone who's considering this… Be prepared to have your soul awakened and your life changed forever!", name:"J Wong", role:"" },
    { quote:"I took the leap of faith… Talk about blown away. That pain had been lifted, this was incredible. Absolutely fabulous!", name:"Drew R", role:"" },
    { quote:"The attention to detail to every single person… A rebirth has occurred. I'm so grateful that I took a leap of faith", name:"Wendylis", role:"" },
    { quote:"It's hands down one of the best things I've decided to do… Feelings that I've never felt before… That I found really profound and powerful.", name:"Joe M", role:"" },
  ],
]

function quoteWidth(q: string): string {
  if (q.length < 110) return "230px"
  if (q.length < 190) return "300px"
  return "370px"
}

function TickerRow({ items, direction, speed }: { items:typeof TICKERS[0]; direction:"left"|"right"; speed:string }) {
  const cls = direction==="left" ? (speed==="fast"?"ticker-l":"ticker-l2") : (speed==="fast"?"ticker-r":"ticker-r2")
  const doubled = [...items, ...items]
  return (
    <div className="ticker-wrap" style={{ padding:"6px 0" }}>
      <div className={cls}>
        {doubled.map((t,i) => (
          <div key={i} style={{ display:"inline-flex", flexDirection:"column", padding:"18px 20px", margin:"0 8px", backgroundColor:C.card, borderRadius:"6px", border:`1px solid ${C.cardBorder}`, width:quoteWidth(t.quote), flexShrink:0, whiteSpace:"normal", minHeight:"210px" }}>
            {/* Stars pinned top */}
            <Stars />
            {/* Quote vertically centered in remaining space */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"14px 0" }}>
              <p style={{ fontFamily:serif, fontSize:"14px", fontStyle:"italic", fontWeight:400, color:C.body, lineHeight:1.6, margin:0 }}>"{t.quote}"</p>
            </div>
            {/* Name pinned bottom */}
            <div>
              <span style={{ fontFamily:sans, fontSize:"12px", fontWeight:500, color:C.lav }}>— {t.name}</span>
              {t.role && <span style={{ fontFamily:sans, fontSize:"11px", color:C.muted }}> · {t.role}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── FAQ — controlled accordion ── */
function FAQItem({ q, a, open, onToggle }: { q:string; a:string; open:boolean; onToggle:()=>void }) {
  return (
    <div style={{ borderBottom:"1px solid rgba(107,33,168,0.3)" }}>
      <button onClick={onToggle} style={{ width:"100%", background:"none", border:"none", cursor:"pointer", padding:"22px 0", display:"flex", justifyContent:"space-between", alignItems:"center", textAlign:"left", gap:"20px" }}>
        <span style={{ fontFamily:sans, fontSize:"16px", fontWeight:400, color:C.white }}>{q}</span>
        <span style={{ color:C.muted, fontSize:"22px", flexShrink:0, lineHeight:1, transform:open?"rotate(45deg)":"none", transition:"transform 0.28s cubic-bezier(0.4,0,0.2,1)", display:"inline-block" }}>+</span>
      </button>
      <div className={`faq-body${open?" open":""}`}>
        <div>
          <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.7, margin:0, paddingBottom:"22px" }}>{a}</p>
        </div>
      </div>
    </div>
  )
}

const FAQ_ITEMS = [
  { q:"What is the Master Your Destiny event?", a:"A 2-day live immersive experience that combines superconscious activation techniques with ancient spiritual wisdom to produce profound personal transformation." },
  { q:"Who is this event for?", a:"Anyone who feels stuck, unfulfilled, or knows they're capable of more — regardless of background, belief system, or previous personal development experience." },
  { q:"Where is the event held?", a:"The event is held online via Zoom. It is intentionally kept intimate to ensure deep, personal transformation for every attendee." },
  { q:"Is there a money-back guarantee?", a:"Yes. If after Day 1 you feel this isn't the right fit, simply let us know and we'll arrange a full refund. No questions asked." },
  { q:"What makes this different from other events?", a:"The combination of group size, the depth of the superconscious techniques, and the personalised breakthrough session on Day 2. Larger events simply cannot create this level of transformation." },
  { q:"Do I need any prior experience?", a:"No prior experience is necessary. Whether you're new to personal development or have tried many programs before, this event meets you exactly where you are." },
]

function FAQList() {
  const [openIdx, setOpenIdx] = useState<number|null>(null)
  return (
    <div style={{ borderTop:"1px solid rgba(107,33,168,0.3)" }}>
      {FAQ_ITEMS.map((item, i) => (
        <FAQItem
          key={i}
          q={item.q}
          a={item.a}
          open={openIdx === i}
          onToggle={() => setOpenIdx(openIdx === i ? null : i)}
        />
      ))}
    </div>
  )
}

/* ── Story Slider ── */
const SLIDES = [
  {
    eyebrow: "The Question",
    headline: "Have you ever wondered why some people seem to have everything they want?",
    body: "They live their dreams, lead abundant lives, and seem to have it all — while somehow you're not quite where you want to be yet. Do they know something you don't?\n\nAre there secrets or hidden principles for becoming truly happy, successful, and living a deeply purposeful life? The answer is yes — and you're about to find out. You may have tried many things and walked many paths, yet something still feels missing. Fortunately, that's all about to change. During this event, you'll discover the unspoken laws by which this reality is governed.",
    bold: "Open your mind and heart to this perspective, and things that once felt hard to achieve will begin to flow to you.",
    img: "/images/img-GyuX.png"
  },
  {
    eyebrow: "What This Event Is Not",
    headline: "This is not another sales pitch, recycled seminar, or repeat of what you've already heard",
    body: "Josh and Poli's main intention is genuine transformation — not a pitch disguised as value. This event is a complete solution, not a teaser for something else.\n\nAfter a profound experience in Asia, they discovered a missing link that most spiritual teachers overlook. You'll encounter techniques that deliver real results — not just inspiration. This event doesn't recycle mainstream content; it includes powerful breakthrough activities designed to permanently remove hidden limiting beliefs.",
    bold: "Over five years working with more than 100,000 people — these are the exact practices that produce the fastest, most lasting shifts.",
    img: "/images/img-FhCB.jpeg"
  },
  {
    eyebrow: "The Hidden Codes",
    headline: "There are codes within you that mainstream methods alone simply cannot unlock",
    body: "Positive thinking, the law of attraction, motivational videos — these have brought you this far. But the Master Your Destiny event operates on a different level. Its intimate, personalised nature is precisely what makes deep reality-shifting possible. You came to this planet as pure love, light, and infinite potential. Somewhere along the way, you began listening to your smaller self more than your higher self — and nobody gave you the blueprint to overcome that. Until now.",
    bold: "Generic mainstream methods got you here. This event gets you to where you actually want to be.",
    img: "/images/img-NCVS.png"
  },
  {
    eyebrow: "Your Transformation",
    headline: "Register, show up, and let your higher self take care of the rest",
    body: "During these two transformational days, you'll discover practical tools to permanently shift your energy, release stagnating beliefs you may not even be aware of, and reconnect with your soul's true path. The event is intentionally small and personal — because real transformation requires real attention. Josh and Poli have guided thousands of people through exactly this process, and the results speak for themselves.",
    bold: "You'll be amazed by your transformation and deeply grateful to yourself that you took this step.",
    img: "/images/img-SKl4.png"
  },
]
function StorySlider() {
  const [cur, setCur] = useState(0)
  const s = SLIDES[cur]
  return (
    <section style={{ ...sec, backgroundColor:C.bg }} className="r-pad">
      <div style={inn}>
        <div className="slider-card" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", height:"480px", border:`1px solid ${C.cardBorder}`, borderRadius:"6px", overflow:"hidden", backgroundColor:C.card }}>
          <div className="slider-text-panel" style={{ display:"flex", flexDirection:"column", overflow:"hidden" }}>
            {/* Sticky header — does not scroll */}
            <div key={"h"+cur} className="slide-enter" style={{ padding:"28px 44px 18px", flexShrink:0, borderBottom:"1px solid rgba(107,33,168,0.18)" }}>
              <Eye align="left">{s.eyebrow}</Eye>
              <h2 style={{ fontFamily:serif, fontWeight:400, fontSize:"clamp(18px,2.2vw,26px)", color:C.white, lineHeight:1.22, margin:"8px 0 0" }}>{s.headline}</h2>
            </div>
            {/* Scrollable body */}
            <div key={"b"+cur} className="slide-enter" style={{ display:"flex", flexDirection:"column", gap:"14px", flex:1, overflowY:"auto", padding:"18px 44px 16px" } as React.CSSProperties}>
              {s.body.split("\n\n").map((p,i) => <p key={i} style={{ ...bdy, fontSize:"14px" }}>{p}</p>)}
              <p style={{ fontFamily:serif, fontSize:"16px", fontWeight:400, fontStyle:"italic", color:C.lav, margin:0 }}>{s.bold}</p>
            </div>
            <div style={{ display:"flex", alignItems:"center", padding:"16px 44px 28px", flexShrink:0, borderTop:"1px solid rgba(107,33,168,0.2)" }}>
              <div style={{ flex:"0 0 72px" }}>
                {cur > 0 && <button onClick={() => setCur(cur-1)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:sans, fontSize:"13px", fontWeight:600, color:C.lav, letterSpacing:"0.08em", padding:0 }}>← BACK</button>}
              </div>
              <div style={{ flex:1, display:"flex", gap:"8px", alignItems:"center", justifyContent:"center" }}>
                {SLIDES.map((_,i) => <button key={i} onClick={() => setCur(i)} style={{ width:i===cur?"22px":"8px", height:"8px", borderRadius:"4px", backgroundColor:i===cur?C.accent:"rgba(168,85,247,0.3)", border:"none", cursor:"pointer", transition:"all 0.25s ease", padding:0, flexShrink:0 }} />)}
              </div>
              <div style={{ flex:"0 0 72px", display:"flex", justifyContent:"flex-end" }}>
                {cur < SLIDES.length-1 && <button onClick={() => setCur(cur+1)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:sans, fontSize:"13px", fontWeight:600, color:C.lav, letterSpacing:"0.08em", padding:0 }}>NEXT →</button>}
              </div>
            </div>
          </div>
          <div className="slider-img-panel" style={{ overflow:"hidden", position:"relative" }}>
            <img key={cur} src={s.img} alt="" className="slide-enter slider-img" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Waitlist form with email validation ── */
function WaitlistForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [done, setDone] = useState(false)
  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  const handleSubmit = () => {
    if (!isValidEmail(email)) { setEmailErr("Please enter a valid email address"); return }
    setEmailErr(""); setDone(true)
    fetch("https://formsubmit.co/ajax/team@joshandpoliofficial.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, _subject: "New Waitlist Signup — Master Your Destiny", _template: "table" })
    }).catch(() => {})
  }
  if (done) return (
    <div style={{ padding:"48px 24px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:"14px" }}>
      <span style={{ fontSize:"36px", color:C.accent }}>✦</span>
      <h3 style={{ fontFamily:serif, fontSize:"26px", fontWeight:400, color:C.white, margin:0 }}>You&apos;re on the list!</h3>
      <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.65, margin:0, maxWidth:"260px" }}>We&apos;ll notify you as soon as the next event opens. Your transformation is coming.</p>
    </div>
  )
  return (
    <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:"14px" }}>
      <p style={{ fontFamily:sans, fontSize:"11px", color:C.muted, letterSpacing:"0.14em", fontWeight:500, margin:0, textAlign:"center" }}>✧ YOU STILL HAVE A CHANCE!</p>
      <h3 style={{ fontFamily:serif, fontSize:"34px", fontWeight:400, color:C.white, textAlign:"center", margin:0 }}>Waitlist</h3>
      <p style={{ fontFamily:sans, fontSize:"14px", color:C.body, textAlign:"center", lineHeight:1.65, margin:"0 auto", maxWidth:"280px" }}>Get notified about the next Master Your Destiny event by signing up here.</p>
      <div style={{ display:"flex", gap:"12px" }} className="r-col">
        <div style={{ display:"flex", flexDirection:"column", gap:"6px", flex:1 }}><label style={{ fontFamily:sans, fontSize:"13px", color:C.lav, fontWeight:500 }}>First Name</label><input type="text" placeholder="Jane" value={firstName} onChange={e => setFirstName(e.target.value)} style={inp} /></div>
        <div style={{ display:"flex", flexDirection:"column", gap:"6px", flex:1 }}><label style={{ fontFamily:sans, fontSize:"13px", color:C.lav, fontWeight:500 }}>Last Name</label><input type="text" placeholder="Smith" value={lastName} onChange={e => setLastName(e.target.value)} style={inp} /></div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
        <label style={{ fontFamily:sans, fontSize:"13px", color:C.lav, fontWeight:500 }}>Email Address</label>
        <input
          type="email"
          placeholder="janesmith@gmail.com"
          value={email}
          onChange={e => { setEmail(e.target.value); if (emailErr) setEmailErr("") }}
          style={{ ...inp, border: emailErr ? "1px solid rgba(236,72,153,0.65)" : "1px solid rgba(168,85,247,0.5)" }}
        />
        {emailErr && <span style={{ fontFamily:sans, fontSize:"12px", color:"#F87171", marginTop:"2px" }}>{emailErr}</span>}
      </div>
      <p style={{ fontFamily:sans, fontSize:"13px", color:C.muted, textAlign:"center", margin:0, marginTop:"6px" }}>Submit to start the shift.</p>
      <Btn variant="pink" style={{ width:"100%", padding:"15px", fontSize:"15px", fontWeight:700, letterSpacing:"0.1em" }} onClick={handleSubmit}>SUBMIT</Btn>
    </div>
  )
}

/* ── Auto-updating date (2 weeks ago) ── */
function UpdatedDate() {
  const d = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  const str = d.toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" })
  return <span style={{ fontFamily:sans, fontSize:"12px", color:"rgba(255,255,255,0.3)" }}>Updated: {str}</span>
}

/* ── Parallax text wrapper ── */
function ParallaxText({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [y, setY] = useState(0)
  useEffect(() => {
    const update = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = ((rect.top + rect.height / 2) / vh - 0.5) * 2
      setY(progress * 18)
    }
    window.addEventListener("scroll", update, { passive:true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])
  return (
    <div ref={ref}>
      <div style={{ transform:`translateY(${y}px)`, transition:"transform 0.12s linear", willChange:"transform" }}>
        {children}
      </div>
    </div>
  )
}

/* ══════════════════════ CURRICULUM DATA ══════════════════════ */
const DAY1_ITEMS: CurrItem[] = [
  { label:"◈ DAY 1", title:"The 'trap' over 97% of people fall into", body:"That leaves them feeling stuck, lost, unmotivated, or unfulfilled — like life has become a never-ending treadmill with hardly any progress. Along with what you can do to finally break free.", img:"/images/img-WQdk.jpeg" },
  { label:"◈ DAY 1", title:"How to tap straight into your superconscious", body:"So that you can recalibrate your energetic field to attract the most positive life and opportunities — and finally operate from your highest potential.", img:"/images/img-NCVS.png" },
  { label:"◈ DAY 1", title:"Why no other event has transformed your life like this one will", body:"Josh and Poli purposefully keep this event small and personal so they can facilitate intense, powerful sessions including a deep breakthrough activity for every attendee.", img:"/images/curriculum-why-no-other.png" },
]
const DAY2_ITEMS: CurrItem[] = [
  { label:"◈ DAY 2", title:"The exact roadmap to make your next 6 months better than the last 10 years", body:"A bold claim — but one Josh and Poli back fully. You'll leave with a clear, practical roadmap for the transformation you've been seeking.", img:"/images/curriculum-roadmap.png" },
  { label:"◈ DAY 2", title:"What prevents most people from manifesting what they want", body:"Discover the one thing more powerful than most mainstream manifestation techniques — something very few people are ever told about, yet makes all the difference.", img:"/images/curriculum-what-prevents.png" },
  { label:"◈ DAY 2", title:"Whether you are living your soul's true life purpose", body:"Delve into hidden ancient teachings that reveal the truth about the nature of this reality and your unique life purpose — so you can finally act from full alignment.", img:"/images/curriculum-highest-purpose.png" },
]

/* ── Video Testimonial Carousel ── */
const VIDEOS = [
  { id:"910682022", thumb:"https://i.vimeocdn.com/video/1794881227-f70e1606fc985ea9f11be74c297d7abfce005c844fead933335f5bc4e529c2ba-d_295x166?region=us" },
  { id:"910681545", thumb:"https://i.vimeocdn.com/video/1794903453-421e46c020d0f5763634e0d6cb123481004434d18f9432ff62932327f54881cc-d_295x166?region=us" },
  { id:"910682119", thumb:"https://i.vimeocdn.com/video/1794789188-b63c591313087ce275f05f4e154db836874ead4473ab8f37273524a2403e1c46-d_295x166?region=us" },
  { id:"911039145", thumb:"https://i.vimeocdn.com/video/1795325882-7ab0beaf524b6bc898fa4054f047d30586cf211ef8a4e958646a9935012a1e1d-d_200x150?region=us" },
  { id:"910682067", thumb:"https://i.vimeocdn.com/video/1794788321-65666322e65fdc80e9768d90b6d049bbce61b2d2dc807a7cc94779f56d4c1537-d_295x166?region=us" },
  { id:"910683081", thumb:"https://i.vimeocdn.com/video/1794790031-10663a0e0d35d2c10231a77fee47d04f5c3d43abb707158b1f5436d1a0856d92-d_200x150?region=us" },
]

function VideoCarousel() {
  const total = VIDEOS.length
  const [idx, setIdx] = useState(2)
  const [activated, setActivated] = useState<Record<number,boolean>>({})
  const touchStartX = useRef(0)
  const CARD_W = 373, CARD_H = 210, GAP = 16

  const prev = () => setIdx(i => Math.max(0, i - 1))
  const next = () => setIdx(i => Math.min(total - 1, i + 1))
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) dx > 0 ? next() : prev()
  }
  const activateVideo = (i: number) => setActivated(a => ({ ...a, [i]: true }))

  return (
    <section style={{ ...sec, backgroundColor:C.bg, padding:"56px 0" }}>
      <div style={{ width:"100%", maxWidth:"1080px", padding:"0 36px", boxSizing:"border-box" as const }}><FadeIn><Eye>Working with us</Eye></FadeIn></div>
      <div style={{ width:"100%", overflow:"hidden", cursor:"grab", userSelect:"none" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div style={{ display:"flex", gap:GAP, transform:`translateX(calc(50vw - ${CARD_W/2}px - ${idx*(CARD_W+GAP)}px))`, transition:"transform 0.35s cubic-bezier(0.4,0,0.2,1)", padding:"4px 0 16px" }}>
          {VIDEOS.map((vid, i) => {
            const isActive = activated[i]
            return (
              <div key={i} onClick={() => !isActive && activateVideo(i)} style={{ width:CARD_W, height:CARD_H, flexShrink:0, borderRadius:"6px", overflow:"hidden", border:`1px solid ${C.cardBorder}`, backgroundColor:"#1A0835", position:"relative", cursor:isActive?"default":"pointer" }}>
                {isActive ? (
                  <iframe src={`https://player.vimeo.com/video/${vid.id}?autoplay=1&muted=0&autopause=0&title=0&byline=0&portrait=0`} width="100%" height="100%" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{ display:"block", position:"absolute", inset:0 }} />
                ) : (
                  <>
                    <img src={vid.thumb} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", inset:0, backgroundColor:"rgba(10,5,20,0.35)" }} />
                    <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <div style={{ width:"48px", height:"48px", backgroundColor:"rgba(88,28,135,0.85)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid ${C.btnBorder}` }}>
                        <span style={{ fontSize:"16px", marginLeft:"3px", color:C.white }}>▶</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ width:"100%", maxWidth:"1080px", padding:"0 36px", boxSizing:"border-box" as const, display:"flex", gap:"6px", marginTop:"10px", justifyContent:"center" }}>
        <button onClick={prev} disabled={idx===0} style={{ background:"none", border:`1px solid rgba(107,33,168,${idx===0?"0.2":"0.45"})`, cursor:idx===0?"default":"pointer", color:idx===0?"rgba(168,85,247,0.28)":C.lav, padding:"6px 20px", borderRadius:"4px", fontFamily:sans, fontSize:"20px", lineHeight:1, transition:"all 0.15s" }}>‹</button>
        <button onClick={next} disabled={idx===total-1} style={{ background:"none", border:`1px solid rgba(107,33,168,${idx===total-1?"0.2":"0.45"})`, cursor:idx===total-1?"default":"pointer", color:idx===total-1?"rgba(168,85,247,0.28)":C.lav, padding:"6px 20px", borderRadius:"4px", fontFamily:sans, fontSize:"20px", lineHeight:1, transition:"all 0.15s" }}>›</button>
      </div>
    </section>
  )
}

/* ── Story Accordion ── */
function StoryAccordion() {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <section style={{ ...sec, backgroundColor:C.bg }} className="r-pad">
      <div style={inn}>
        <FadeIn style={{ textAlign:"center", display:"flex", flexDirection:"column", gap:"10px", alignItems:"center" }}>
          <Eye>Dive Deeper</Eye>
          <h2 style={{ ...h2s, margin:0 }}>The story behind this event</h2>
        </FadeIn>
        <FadeIn delay={80} style={{ width:"100%", marginTop:"28px" }}>
          <div style={{ border:`1px solid ${C.cardBorder}`, borderRadius:"8px", overflow:"hidden", backgroundColor:C.card }}>
            {SLIDES.map((s, i) => (
              <div key={i} style={{ borderBottom: i < SLIDES.length-1 ? "1px solid rgba(107,33,168,0.25)" : "none" }}>
                <button
                  onClick={() => setOpen(open===i ? null : i)}
                  style={{ width:"100%", background:"none", border:"none", cursor:"pointer", padding:"22px 28px", display:"flex", justifyContent:"space-between", alignItems:"center", textAlign:"left", gap:"20px" }}
                >
                  <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
                    <span style={{ fontFamily:sans, fontSize:"11px", color:C.muted, fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase" as const }}>✦ {s.eyebrow}</span>
                    <span style={{ fontFamily:serif, fontSize:"clamp(16px,2vw,21px)", fontWeight:400, color:C.white, lineHeight:1.22 }}>{s.headline}</span>
                  </div>
                  <span style={{ color:C.muted, fontSize:"24px", flexShrink:0, lineHeight:1, transform:open===i?"rotate(45deg)":"none", transition:"transform 0.28s cubic-bezier(0.4,0,0.2,1)", display:"inline-block" }}>+</span>
                </button>
                <div className={`faq-body${open===i?" open":""}`}>
                  <div>
                    <div style={{ padding:"28px 36px", display:"flex", flexDirection:"column", gap:"14px" }}>
                      {s.body.split("\n\n").map((p, pi) => <p key={pi} style={{ ...bdy, fontSize:"14px" }}>{p}</p>)}
                      <p style={{ fontFamily:serif, fontSize:"15px", fontWeight:400, fontStyle:"italic", color:C.lav, margin:0 }}>{s.bold}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ══════════════════════ PAGE ══════════════════════ */
export default function Home() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ width:"100%", backgroundColor:C.bg, fontFamily:sans, color:C.white, overflowX:"hidden" }}>

      {/* HERO */}
      <section style={{ width:"100%", height:"calc(100vh - 62px)", minHeight:"580px", display:"flex", flexDirection:"column", backgroundColor:C.bg, position:"relative" }}>
        {/* Liquid ether — extends below hero with fade-out mask */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"160%", pointerEvents:"none", zIndex:0, WebkitMaskImage:"linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 55%, rgba(0,0,0,0) 100%)", maskImage:"linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.32) 55%, rgba(0,0,0,0) 100%)" }}>
          <LiquidEther colors={["#4C1D95","#6D28D9","#9333EA","#A855F7"]} autoDemo={true} style={{ width:"100%", height:"100%" }} />
        </div>
        <img src="/images/img-WNBL.png" alt="" style={{ position:"absolute", width:"600px", height:"600px", top:"-200px", left:"50%", transform:"translateX(-50%)", opacity:0.5, pointerEvents:"none", userSelect:"none", zIndex:0 }} />
        <img src="/images/img-uDX1.png" alt="" style={{ position:"absolute", width:"400px", height:"400px", bottom:"-100px", right:"-100px", opacity:0.3, pointerEvents:"none", userSelect:"none", zIndex:0 }} />
        {/* Announcement ticker — ✦ centered between texts */}
        <div style={{ width:"100%", borderBottom:"1px solid rgba(107,33,168,0.25)", backgroundColor:"rgba(0,0,0,0.45)", overflow:"hidden", flexShrink:0, zIndex:2, position:"relative" }}>
          <div className="ticker-announce" style={{ padding:"9px 0", alignItems:"center" }}>
            {Array.from({length:10}).map((_,i) => (
              <span key={i} style={{ display:"inline-flex", alignItems:"center", flexShrink:0 }}>
                <span style={{ fontFamily:sans, fontSize:"12px", color:C.muted, padding:"0 22px", whiteSpace:"nowrap" }}>
                  This event is sold out. Signups for waitlist are now open. Updated: {new Date(Date.now()-14*24*60*60*1000).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}.
                </span>
                <span style={{ color:C.muted, fontSize:"10px", flexShrink:0 }}>✦</span>
              </span>
            ))}
          </div>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"24px", padding:"32px 36px", boxSizing:"border-box", position:"relative", zIndex:1 }} className="r-pad">
          <div className="hero-anim hero-d1"><MiniReviews /></div>
          <div className="hero-anim hero-d2"><Eye>A Transformational 2-Day Live Event</Eye></div>
          <h1 className="hero-anim hero-d3" style={{ fontFamily:serif, fontWeight:400, fontSize:"clamp(38px,7vw,90px)", color:C.white, lineHeight:1.02, textAlign:"center", maxWidth:"880px", margin:0 }}>Make your next 6 months better than the last 10 years</h1>
          <p className="hero-anim hero-d4" style={{ fontFamily:sans, fontSize:"18px", color:C.lav, textAlign:"center", maxWidth:"520px", margin:0, lineHeight:1.65, fontWeight:400 }}>Using Superconscious spiritual teachings — ancient wisdom engineered for modern transformation</p>
          <div className="hero-anim hero-d5 hero-btns" style={{ display:"flex", gap:"14px", flexWrap:"wrap", justifyContent:"center" }}>
            <Btn variant="pink"  style={{ fontSize:"16px", padding:"14px 40px" }} onClick={() => scrollTo("signup")}>Join Waitlist</Btn>
            <Btn variant="ghost" style={{ fontSize:"16px", padding:"14px 40px" }} onClick={() => scrollTo("program")}>Learn More</Btn>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section style={{ ...sec, backgroundColor:C.bg, padding:"48px 36px" }} className="r-pad">
        <FadeIn style={inn}>
          <VimeoPlayer />
        </FadeIn>
      </section>

      {/* ARE YOU ASKING */}
      <section style={{ ...sec, backgroundColor:C.bg }} className="r-pad">
        <div style={inn}>
          <FadeIn style={{ textAlign:"center" }}><h2 style={{ ...h2s, marginBottom:"22px" }}>Are you asking yourself...</h2></FadeIn>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {["Is this just another self-help program that won't actually help me figure things out?","I've been feeling stuck for so long — will anything ever really change?","Will this event actually help me get clarity and stay on track?","I've tried so many things before, is it even worth trying again?","I'm so busy, why does it feel like days keep passing by with no real progress?"].map((q,i) => (
              <FadeIn key={i} delay={i * 60}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:"14px", padding:"16px 20px", backgroundColor:"rgba(50,14,100,0.35)", borderRadius:"6px", border:"1px solid rgba(107,33,168,0.3)" }}>
                  <span style={{ color:C.accent, fontSize:"16px", marginTop:"2px", flexShrink:0 }}>◈</span>
                  <span style={{ fontFamily:sans, fontSize:"16px", color:C.lav, lineHeight:1.55 }}>{q}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROGRAM */}
      <section id="program" style={{ ...sec, backgroundColor:C.bgMid, padding:"56px 0" }}>
        <div style={{ width:"100%", maxWidth:"1080px", padding:"0 36px", boxSizing:"border-box" as const }} className="r-pad">
          <FadeIn><Eye>The Program</Eye></FadeIn>
          <FadeIn delay={60} style={{ textAlign:"center" }}><h2 style={{ ...h2s, margin:"6px auto 0" }}>What you will discover with us</h2></FadeIn>
        </div>
        <FadeIn style={{ width:"100%", marginTop:"-8px" }}>
          <AllDaysCarousel />
        </FadeIn>
        <div style={{ width:"100%", maxWidth:"1080px", padding:"0 36px", boxSizing:"border-box" as const }} className="r-pad">
          <FadeIn delay={80}>
            <div style={{ padding:"40px", backgroundColor:"#170531", borderRadius:"6px", border:`1px solid rgba(107,33,168,0.5)`, display:"flex", alignItems:"center", justifyContent:"space-between", gap:"28px", flexWrap:"wrap" as const }}>
              <div>
                <h3 style={{ fontFamily:serif, fontSize:"28px", fontWeight:400, color:C.white, margin:"0 0 8px" }}>Ready to experience this yourself?</h3>
                <p style={{ fontFamily:sans, fontSize:"15px", color:C.lav, margin:"0 0 6px", fontWeight:400 }}>Seats are extremely limited — don't miss the next event.</p>
                <UpdatedDate />
              </div>
              <div className="ready-exp-btn-wrap"><Btn variant="pink" style={{ fontSize:"16px", padding:"14px 36px", flexShrink:0 }} onClick={() => scrollTo("signup")}>Join Waitlist</Btn></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SIDE EFFECTS */}
      <section style={{ ...sec, backgroundColor:C.bg }} className="r-pad">
        <div style={inn}>
          <FadeIn><Eye>What happens after</Eye></FadeIn>
          <FadeIn delay={60} style={{ textAlign:"center" }}><h2 style={{ ...h2s, margin:"10px auto 24px" }}>Common side effects of this process</h2></FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(12,1fr)", gap:"12px" }}>
            {[
              { icon:"𓇬", quote:'"I never knew life could feel so good!"',                colors:["#3B0764","#6D28D9","#A855F7","#C026D3"] },
              { icon:"✺",  quote:'"I\'ve finally found my purpose and know exactly what decisions I need to make to achieve it!!"', colors:["#1E0A3C","#4C1D95","#7C3AED","#A855F7"] },
              { icon:"𓇬", quote:'"I didn\'t realise how small I was thinking for so long!"',                                        colors:["#2D0A64","#5B21B6","#8B5CF6","#C026D3"] },
              { icon:"✺",  quote:'"I\'ve shifted reality — it really works! I now see that I really can have anything I want!"',    colors:["#1A0835","#4C1D95","#9333EA","#A855F7"] },
            ].map((item,i) => (
              <div key={i} className={`se-card-${i}`} style={{ minWidth:0, display:"flex", flexDirection:"column" }}>
                <FadeIn delay={i * 80} style={{ flex:1, display:"flex", flexDirection:"column" }}>
                  <div className="se-card-shell" style={{ minHeight:"180px" }}>
                    {/* LiquidEther flame effect fills the card background */}
                    <div style={{ position:"absolute", inset:0, opacity:0.6, zIndex:0 }}>
                      <LiquidEther colors={item.colors} autoDemo={true} style={{ width:"100%", height:"100%" }} />
                    </div>
                    <div style={{ position:"relative", zIndex:1, padding:"26px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"12px", textAlign:"center", flex:1 }}>
                      <span style={{ fontSize:"22px", color:C.lav, lineHeight:1 }}>{item.icon}</span>
                      <p style={{ fontFamily:serif, fontSize:"16px", fontStyle:"italic", fontWeight:400, color:"#F3E8FF", lineHeight:1.6, margin:0 }}>{item.quote}</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ ...sec, backgroundColor:C.bgMid, padding:"52px 0", gap:"14px", overflow:"hidden" }}>
        <div style={{ width:"100%", maxWidth:"1080px", padding:"0 36px", boxSizing:"border-box", textAlign:"center" }}>
          <Eye>Real Transformations</Eye>
          <FadeIn style={{ textAlign:"center" }}><h2 style={{ ...h2s, margin:"12px auto 0" }}>What our community says</h2></FadeIn>
        </div>
        <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:"10px", marginTop:"12px" }}>
          <TickerRow items={TICKERS[0]} direction="left"  speed="fast" />
          <TickerRow items={TICKERS[1]} direction="right" speed="slow" />
          <TickerRow items={TICKERS[2]} direction="left"  speed="slow" />
          <TickerRow items={TICKERS[3]} direction="right" speed="fast" />
        </div>
      </section>

      {/* WAITLIST / EVENT SECTION */}
      <section id="signup" style={{ ...sec, backgroundColor:C.bg }} className="r-pad">
        <div style={{ ...inn, display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:"48px", alignItems:"start" }} className="r-grid-2">
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            <FadeIn>
              <p style={{ fontFamily:sans, fontSize:"12px", color:C.muted, letterSpacing:"0.14em", fontWeight:500, textTransform:"uppercase" as const, margin:0, textAlign:"center" }}>✦ Sign Up</p>
            </FadeIn>
            <FadeIn delay={60}>
              <div style={{ borderRadius:"6px", border:`1px solid ${C.cardBorder}`, overflow:"hidden", backgroundColor:C.card }}>
                <img src="/images/event-signup.png" alt="Event" style={{ width:"100%", aspectRatio:"1/1", objectFit:"cover", display:"block" }} />
                <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:"12px", alignItems:"center", textAlign:"center" }}>
                  <p style={{ fontFamily:sans, fontSize:"11px", color:C.muted, letterSpacing:"0.14em", fontWeight:500, margin:0 }}>✧ 2-DAYS EXCLUSIVE EVENT</p>
                  <h3 style={{ fontFamily:serif, fontSize:"30px", fontWeight:400, color:C.white, margin:0 }}>Master Your Destiny</h3>
                  <p style={{ fontFamily:sans, fontSize:"14px", color:C.muted, margin:0, fontWeight:400 }}>○ Online via Zoom</p>
                  <p style={{ fontFamily:sans, fontSize:"15px", color:C.body, lineHeight:1.65, margin:0, maxWidth:"400px", fontWeight:400 }}>In just two days, learn how to make your next 6 months better than the last 10 years with rediscovered science-based ancient spiritual teachings.</p>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px", maxWidth:"340px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", width:"100%" }}>
                      <div style={{ flex:1, height:"1px", backgroundColor:"rgba(107,33,168,0.3)" }} />
                      <span style={{ color:C.muted, fontSize:"11px" }}>✦</span>
                      <div style={{ flex:1, height:"1px", backgroundColor:"rgba(107,33,168,0.3)" }} />
                    </div>
                    <p style={{ fontFamily:sans, fontSize:"12px", color:"rgba(167,139,250,0.42)", lineHeight:1.7, margin:0, fontWeight:400, textAlign:"center" }}><span style={{ color:"rgba(167,139,250,0.55)", fontWeight:500 }}>Guaranteed.</span> If we won&apos;t exceed your expectations, we will refund your money and give you $100 extra. That&apos;s how confident we are that this event will change your life.</p>
                  </div>
                  <button className="btn-soldout" onClick={() => scrollTo("signup")} style={{ width:"100%", padding:"13px", fontSize:"13px", fontFamily:sans, fontWeight:600, letterSpacing:"0.1em", borderRadius:"6px", marginTop:"6px", backgroundColor:"transparent", color:C.muted, border:`1px solid rgba(167,139,250,0.3)`, cursor:"pointer", whiteSpace:"nowrap" as const }}>THIS EVENT IS SOLD OUT</button>
                </div>
              </div>
            </FadeIn>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"22px" }}>
            <FadeIn>
              <Eye>Join our waitlist</Eye>
            </FadeIn>
            <FadeIn delay={60}>
              {/* Waitlist card */}
              <div style={{ borderRadius:"6px", border:`1px solid ${C.cardBorder}`, overflow:"hidden", backgroundColor:C.card }}>
                <WaitlistForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section style={{ ...sec, backgroundColor:C.bgMid, padding:"28px 36px" }} className="r-pad">
        <div style={{ ...inn, maxWidth:"680px" }}>
          <FadeIn>
            <div style={{ borderTop:"1px solid rgba(107,33,168,0.18)", paddingTop:"22px", textAlign:"center" }}>
              <p style={{ fontFamily:sans, fontSize:"10px", color:"rgba(167,139,250,0.55)", letterSpacing:"0.18em", fontWeight:500, textTransform:"uppercase" as const, margin:"0 0 10px" }}>✦ Disclaimer</p>
              <p style={{ fontFamily:sans, fontSize:"12px", color:"rgba(167,139,250,0.48)", lineHeight:1.8, margin:0, fontWeight:400 }}>Our intention at this event is to assist with your personal wellbeing and personal development. This is not medical, psychological, financial, or legal advice. By attending you acknowledge that results shared are individual experiences and your results may vary. We encourage you to approach this event with an open heart and a very open mind.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" style={{ ...sec, backgroundColor:C.bgMid }} className="r-pad">
        <div style={inn}>
          <FadeIn><Eye>Your Guides</Eye></FadeIn>
          <FadeIn delay={60} style={{ textAlign:"center" }}><h2 style={{ ...h2s, margin:"10px auto 28px" }}>About us</h2></FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:"44px", alignItems:"start" }} className="r-grid-2">
            <FadeIn>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                <img src="/images/about-josh.png" alt="Josh" style={{ borderRadius:"6px", objectFit:"cover", width:"100%", display:"block" }} />
                <img src="/images/about-poli.png" alt="Poli" style={{ borderRadius:"6px", objectFit:"cover", width:"100%", display:"block" }} />
              </div>
            </FadeIn>
            <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
              <FadeIn delay={80}><h3 style={{ fontFamily:serif, fontSize:"34px", fontWeight:400, color:C.white, margin:0 }}>Josh & Poli</h3></FadeIn>
              <FadeIn delay={140}><p style={bdy}>Josh and Poli are passionate about helping people live their best life. They have experienced deep transformations themselves which gave them the desire to help others. Together, they combine ancient wisdom with cutting-edge techniques to create powerful, lasting change.</p></FadeIn>
              <FadeIn delay={180}><p style={bdy}>Their mission is to help as many people as possible to break free from limitations, discover their true purpose, and live a life full of joy, abundance, and fulfilment — having facilitated transformations for thousands of people across the globe.</p></FadeIn>
              <FadeIn delay={220}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginTop:"6px" }}>
                  {([{to:100,suffix:"%",label:"Attendance satisfaction",raw:false},{to:312,suffix:"+",label:"Completed events",raw:true},{to:11300,suffix:"+",label:"Assisted individuals",raw:true},{to:7,suffix:"+",label:"Years of coaching experience",raw:true}] as {to:number;suffix:string;label:string;raw:boolean}[]).map((s,i) => (
                    <div key={i} style={{ padding:"16px", backgroundColor:"rgba(50,14,100,0.4)", borderRadius:"6px", border:"1px solid rgba(107,33,168,0.3)" }}>
                      <div style={{ fontFamily:serif, fontSize:"32px", fontWeight:400, color:C.white, lineHeight:1 }}><CountUp to={s.to} suffix={s.suffix} raw={s.raw} /></div>
                      <div style={{ fontFamily:sans, fontSize:"13px", color:C.muted, marginTop:"4px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO TESTIMONIALS */}
      <VideoCarousel />

      {/* STORY ACCORDION — Dive Deeper */}
      <StoryAccordion />

      {/* FAQ */}
      <section id="faq" style={{ ...sec, background:"linear-gradient(to bottom, #110820 0%, #1A0B30 100%)" }} className="r-pad">
        <div style={inn}>
          <FadeIn><Eye>Common Questions</Eye></FadeIn>
          <FadeIn delay={60} style={{ marginTop:"24px" }}><FAQList /></FadeIn>
        </div>
      </section>

    </div>
  )
}
