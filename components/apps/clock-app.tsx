"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, Plus, Globe, Bell, Timer } from "lucide-react"

interface ClockAppProps {
  onClose: () => void
  isDarkMode: boolean
}

/* ── Analogue clock face ── */
function AnalogClock({ size = 200, showSeconds = true }: { size?: number; showSeconds?: boolean }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const s  = now.getSeconds()
  const m  = now.getMinutes() + s / 60
  const h  = (now.getHours() % 12) + m / 60

  const sDeg = s  * 6
  const mDeg = m  * 6
  const hDeg = h  * 30

  const cx = size / 2
  const r  = size / 2 - 4

  /* tick marks */
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const major = i % 5 === 0
    const angle  = (i / 60) * 2 * Math.PI - Math.PI / 2
    const innerR = major ? r - 10 : r - 6
    return {
      x1: cx + innerR * Math.cos(angle),
      y1: cx + innerR * Math.sin(angle),
      x2: cx + r      * Math.cos(angle),
      y2: cx + r      * Math.sin(angle),
      major,
    }
  })

  const hand = (deg: number, length: number) => {
    const rad = (deg - 90) * (Math.PI / 180)
    return { x: cx + length * Math.cos(rad), y: cx + length * Math.sin(rad) }
  }

  const hTip = hand(hDeg, r * 0.52)
  const mTip = hand(mDeg, r * 0.72)
  const sTip = hand(sDeg, r * 0.82)
  const sTail = hand(sDeg + 180, r * 0.18)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-xl">
      {/* Face */}
      <circle cx={cx} cy={cx} r={r} fill="#1c1c1e" />
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="#3a3a3c" strokeWidth="1.5" />

      {/* Tick marks */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.major ? "#ffffff" : "#555"}
          strokeWidth={t.major ? 2 : 1}
          strokeLinecap="round"
        />
      ))}

      {/* Hour numbers */}
      {[12,1,2,3,4,5,6,7,8,9,10,11].map((n, i) => {
        const angle = (i / 12) * 2 * Math.PI - Math.PI / 2
        const nr    = r * 0.76
        return (
          <text
            key={n}
            x={cx + nr * Math.cos(angle)}
            y={cx + nr * Math.sin(angle)}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={size * 0.065}
            fontWeight="600"
            fill="white"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {n}
          </text>
        )
      })}

      {/* Hour hand */}
      <line x1={cx} y1={cx} x2={hTip.x} y2={hTip.y}
        stroke="white" strokeWidth={size * 0.04} strokeLinecap="round" />

      {/* Minute hand */}
      <line x1={cx} y1={cx} x2={mTip.x} y2={mTip.y}
        stroke="white" strokeWidth={size * 0.025} strokeLinecap="round" />

      {/* Second hand */}
      {showSeconds && (
        <>
          <line x1={sTail.x} y1={sTail.y} x2={sTip.x} y2={sTip.y}
            stroke="#ff3b30" strokeWidth={size * 0.015} strokeLinecap="round" />
          <circle cx={cx} cy={cx} r={size * 0.03} fill="#ff3b30" />
        </>
      )}

      {/* Center cap */}
      <circle cx={cx} cy={cx} r={size * 0.015} fill="white" />
    </svg>
  )
}

/* ── World clock city row ── */
function CityRow({ city, timezone, isDst }: { city: string; timezone: string; isDst?: boolean }) {
  const [time, setTime] = useState<string>("")
  const [day,  setDay]  = useState<string>("")

  useEffect(() => {
    const update = () => {
      const now  = new Date()
      const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: timezone }
      const dayOpts: Intl.DateTimeFormatOptions = { weekday: "short", timeZone: timezone }
      setTime(now.toLocaleTimeString("en-US", opts))
      setDay(now.toLocaleDateString("en-US", dayOpts))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [timezone])

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/10">
      <div>
        <p className="text-white/50 text-xs">{isDst ? "Today" : day}</p>
        <p className="text-white text-lg font-medium">{city}</p>
      </div>
      <p className="text-white text-2xl font-light">{time}</p>
    </div>
  )
}

/* ── Stopwatch ── */
function StopwatchView() {
  const [running, setRunning]   = useState(false)
  const [elapsed, setElapsed]   = useState(0)
  const [laps,    setLaps]      = useState<number[]>([])
  const startRef = useRef<number>(0)
  const baseRef  = useRef<number>(0)

  useEffect(() => {
    if (!running) return
    startRef.current = Date.now()
    const id = setInterval(() => setElapsed(baseRef.current + Date.now() - startRef.current), 10)
    return () => clearInterval(id)
  }, [running])

  const fmt = (ms: number) => {
    const m   = Math.floor(ms / 60000)
    const s   = Math.floor((ms % 60000) / 1000)
    const cs  = Math.floor((ms % 1000) / 10)
    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(cs).padStart(2,"0")}`
  }

  const toggle = () => {
    if (running) baseRef.current = elapsed
    setRunning(!running)
  }

  const reset = () => { setRunning(false); setElapsed(0); setLaps([]); baseRef.current = 0 }
  const lap   = () => setLaps(prev => [elapsed, ...prev])

  return (
    <div className="flex flex-col items-center pt-2">
      <p className="text-white text-5xl font-thin tracking-tight font-mono mb-8">{fmt(elapsed)}</p>
      <div className="flex gap-6 mb-6">
        <button onClick={running ? lap : reset}
          className="w-16 h-16 rounded-full bg-white/10 text-white text-sm font-semibold active:bg-white/20 transition-colors">
          {running ? "Lap" : "Reset"}
        </button>
        <button onClick={toggle}
          className={`w-16 h-16 rounded-full text-white text-sm font-semibold transition-colors ${running ? "bg-red-500/30 border border-red-400 text-red-400" : "bg-green-500/30 border border-green-400 text-green-400"}`}>
          {running ? "Stop" : "Start"}
        </button>
      </div>
      {laps.length > 0 && (
        <div className="w-full space-y-1 max-h-32 overflow-y-auto">
          {laps.map((lap, i) => (
            <div key={i} className="flex justify-between text-white/70 text-sm px-1 py-1 border-b border-white/10">
              <span>Lap {laps.length - i}</span>
              <span className="font-mono">{fmt(lap)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Alarm list ── */
function AlarmView() {
  const [alarms] = useState([
    { time: "07:00", label: "Wake up",    on: true  },
    { time: "09:00", label: "Stand-up",   on: true  },
    { time: "13:00", label: "Lunch break",on: false },
    { time: "18:30", label: "End of day", on: true  },
  ])
  const [enabled, setEnabled] = useState(alarms.map(a => a.on))

  return (
    <div className="space-y-1">
      {alarms.map((alarm, i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-white/10">
          <div>
            <p className={`text-3xl font-light ${enabled[i] ? "text-white" : "text-white/30"}`}>
              {alarm.time}
            </p>
            <p className={`text-sm ${enabled[i] ? "text-white/60" : "text-white/25"}`}>{alarm.label}</p>
          </div>
          {/* iOS toggle */}
          <button
            onClick={() => setEnabled(prev => prev.map((v, j) => j === i ? !v : v))}
            className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${enabled[i] ? "bg-green-500" : "bg-white/20"}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${enabled[i] ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
      ))}
    </div>
  )
}

/* ── Main ClockApp ── */
type Tab = "worldclock" | "alarm" | "stopwatch" | "timer"

const WORLD_CITIES = [
  { city: "Colombo",     timezone: "Asia/Colombo" },
  { city: "London",      timezone: "Europe/London" },
  { city: "New York",    timezone: "America/New_York" },
  { city: "Los Angeles", timezone: "America/Los_Angeles" },
  { city: "Tokyo",       timezone: "Asia/Tokyo" },
  { city: "Sydney",      timezone: "Australia/Sydney" },
]

export default function ClockApp({ onClose, isDarkMode }: ClockAppProps) {
  const [tab, setTab] = useState<Tab>("worldclock")
  const [timerSecs, setTimerSecs]     = useState(0)
  const [timerInput, setTimerInput]   = useState({ h: 0, m: 5, s: 0 })
  const [timerRunning, setTimerRunning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    const total = timerInput.h * 3600 + timerInput.m * 60 + timerInput.s
    setTimerSecs(total)
    setTimerRunning(true)
  }

  useEffect(() => {
    if (!timerRunning) { if (timerRef.current) clearInterval(timerRef.current); return }
    timerRef.current = setInterval(() => {
      setTimerSecs(prev => {
        if (prev <= 1) { setTimerRunning(false); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [timerRunning])

  const fmtTimer = (s: number) =>
    `${String(Math.floor(s / 3600)).padStart(2,"0")}:${String(Math.floor((s % 3600) / 60)).padStart(2,"0")}:${String(s % 60).padStart(2,"0")}`

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "worldclock",  label: "World",     icon: <Globe     className="w-4 h-4" /> },
    { id: "alarm",       label: "Alarm",     icon: <Bell      className="w-4 h-4" /> },
    { id: "stopwatch",   label: "Stopwatch", icon: <Timer className="w-4 h-4" /> },
    { id: "timer",       label: "Timer",     icon: <span className="text-sm">⏱</span> },
  ]

  return (
    <div className="w-full h-full bg-black flex flex-col animate-zoom-in">

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <button onClick={onClose} className="text-orange-400 text-sm font-medium flex items-center gap-1">
          <ChevronLeft className="w-5 h-5" /> Home
        </button>
        <h1 className="text-white text-base font-semibold">
          {tabs.find(t => t.id === tab)?.label}
        </h1>
        <button className="text-orange-400 text-sm font-medium">
          {tab === "alarm" || tab === "worldclock" ? <Plus className="w-5 h-5" /> : <div className="w-8" />}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4">

        {/* World Clock */}
        {tab === "worldclock" && (
          <div>
            {/* Live analog clock */}
            <div className="flex justify-center my-4">
              <AnalogClock size={190} />
            </div>
            <div className="mt-2">
              {WORLD_CITIES.map(c => (
                <CityRow key={c.city} city={c.city} timezone={c.timezone} />
              ))}
            </div>
          </div>
        )}

        {/* Alarm */}
        {tab === "alarm" && (
          <div className="mt-4">
            <AlarmView />
          </div>
        )}

        {/* Stopwatch */}
        {tab === "stopwatch" && (
          <div className="mt-8">
            <StopwatchView />
          </div>
        )}

        {/* Timer */}
        {tab === "timer" && (
          <div className="flex flex-col items-center mt-6">
            {/* Circular countdown */}
            <div className="relative w-44 h-44 mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2c2c2e" strokeWidth="6" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#ff9f0a" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - timerSecs / Math.max(timerInput.h * 3600 + timerInput.m * 60 + timerInput.s, 1))}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-3xl font-light font-mono">{fmtTimer(timerSecs)}</p>
              </div>
            </div>

            {/* Picker */}
            {!timerRunning && timerSecs === 0 && (
              <div className="flex gap-3 mb-6 items-center">
                {[
                  { label: "hr",  key: "h" as const, max: 23 },
                  { label: "min", key: "m" as const, max: 59 },
                  { label: "sec", key: "s" as const, max: 59 },
                ].map(({ label, key, max }) => (
                  <div key={key} className="flex flex-col items-center gap-1">
                    <button onClick={() => setTimerInput(p => ({ ...p, [key]: Math.min(max, p[key]+1) }))}
                      className="text-orange-400 text-xl leading-none">▲</button>
                    <div className="bg-white/10 rounded-lg px-3 py-1 text-center">
                      <p className="text-white text-2xl font-light w-8 text-center">{String(timerInput[key]).padStart(2,"0")}</p>
                      <p className="text-white/40 text-[10px]">{label}</p>
                    </div>
                    <button onClick={() => setTimerInput(p => ({ ...p, [key]: Math.max(0, p[key]-1) }))}
                      className="text-orange-400 text-xl leading-none">▼</button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-6">
              <button onClick={() => { setTimerRunning(false); setTimerSecs(0) }}
                className="w-14 h-14 rounded-full bg-white/10 text-white text-sm font-semibold">
                Cancel
              </button>
              <button onClick={timerRunning ? () => setTimerRunning(false) : startTimer}
                className={`w-14 h-14 rounded-full text-sm font-semibold ${timerRunning ? "bg-red-500/30 border border-red-400 text-red-400" : "bg-orange-500/30 border border-orange-400 text-orange-400"}`}>
                {timerRunning ? "Pause" : "Start"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom tab bar */}
      <div className="flex items-center justify-around border-t border-white/10 py-2 bg-black">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${tab === t.id ? "text-orange-400" : "text-white/40 hover:text-white/70"}`}
          >
            {t.icon}
            <span className="text-[9px] font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
