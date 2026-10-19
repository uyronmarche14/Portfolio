"use client";

import type { ComponentType, CSSProperties } from "react";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";

/**
 * One layered SVG scene per project. They reuse the Experience visual kit, loop
 * only while on screen, and are conceptual: they only draw ideas that appear in
 * each project's own description.
 */

const rows = (n: number) => Array.from({ length: n }, (_, i) => i);

/** Codex Express: a calendar where a free slot gets booked, then a notification arrives. */
const CodexExpress = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={330} h={330} e={1} />
    <Text x={58} y={86} size={11} opacity={0.5}>APPOINTMENTS</Text>
    {rows(7).map((c) => (
      <Text key={c} x={66 + c * 44} y={116} size={11} anchor="middle" opacity={0.45}>{"SMTWTFS"[c]}</Text>
    ))}
    {rows(28).map((i) => {
      const x = 48 + (i % 7) * 44;
      const y = 130 + Math.floor(i / 7) * 56;
      const booked = [3, 9, 16, 20].includes(i);
      return <rect key={i} x={x} y={y} width={36} height={44} rx={8} fill={booked ? C.accentSoft : C.faint} />;
    })}
    <Loop a={{ opacity: [0, 0, 1, 1, 0] }} d={8} times={[0, 0.2, 0.28, 0.9, 1]} ease="linear">
      <rect x={224} y={242} width={36} height={44} rx={8} fill={C.accent} />
      <path d="m234 264 5 5 9-10" stroke={C.onAccent} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Loop>
    <Loop a={{ x: [0, 0, 0, 0], y: [0, 0, 0, 0], opacity: [0, 0, 1, 1, 0, 0] }} d={8} times={[0, 0.34, 0.42, 0.8, 0.88, 1]} ease="easeOut">
      <Surface x={320} y={300} w={204} h={68} r={14} e={2} />
      <circle cx={346} cy={334} r={11} fill={C.accentSoft} stroke={C.accent} strokeOpacity={0.6} />
      <Text x={366} y={330} size={12} weight={600} mono={false}>Booking confirmed</Text>
      <Text x={366} y={348} size={11} opacity={0.55}>email sent</Text>
    </Loop>
    <Surface x={388} y={72} w={136} h={150} e={1} />
    <Text x={404} y={98} size={11} opacity={0.5}>LOCATIONS</Text>
    {rows(3).map((i) => (
      <g key={i}>
        <circle cx={410} cy={124 + i * 32} r={5} fill={i === 0 ? C.accent : C.bar} />
        <rect x={426} y={119 + i * 32} width={70 - i * 8} height={8} rx={4} fill={C.bar} />
      </g>
    ))}
  </VisualFrame>
);

/** Reservation Desktop: a desktop clinic window with a doctor schedule and a billing panel. */
const ReservationDesktop = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={488} h={330} e={1} />
    <path d="M36 92h488" stroke={C.line} />
    {rows(3).map((i) => <circle key={i} cx={56 + i * 14} cy={74} r={4} fill={C.faint} />)}
    <rect x={36} y={92} width={110} height={294} fill={C.faint} />
    {["Appointments", "Doctors", "Billing", "Reports"].map((l, i) => (
      <Text key={l} x={52} y={124 + i * 34} size={12} weight={i === 0 ? 600 : 400} opacity={i === 0 ? 1 : 0.55} mono={false}>{l}</Text>
    ))}
    {rows(5).map((r) => (
      <g key={r}>
        <rect x={166} y={112 + r * 40} width={190} height={30} rx={8} fill={C.faint} />
        <rect x={176} y={123 + r * 40} width={70} height={7} rx={3.5} fill={C.bar} />
        <rect x={264} y={123 + r * 40} width={36} height={7} rx={3.5} fill={C.line} />
      </g>
    ))}
    <Loop a={{ y: [0, 0, 40, 80, 80, 0] }} d={9} times={[0, 0.15, 0.35, 0.55, 0.9, 1]}>
      <rect x={164} y={110} width={194} height={34} rx={9} fill="none" stroke={C.accent} strokeWidth={2} />
    </Loop>
    <Surface x={374} y={112} w={134} h={150} r={12} e={2} />
    <Text x={388} y={138} size={11} opacity={0.5}>BILL</Text>
    {rows(3).map((i) => <rect key={i} x={388} y={152 + i * 22} width={80 - i * 10} height={7} rx={3.5} fill={C.bar} />)}
    <rect x={388} y={226} width={104} height={24} rx={12} fill={C.accent} />
    <Text x={440} y={243} size={12} anchor="middle" fill={C.onAccent} weight={500} mono={false}>Print report</Text>
  </VisualFrame>
);

/** Jobint: a phone with an interview question and a speech waveform. */
const Jobint = () => (
  <VisualFrame>
    <Surface x={190} y={44} w={180} h={352} r={30} e={2} />
    <rect x={250} y={58} width={60} height={8} rx={4} fill={C.faint} />
    <Text x={212} y={104} size={11} opacity={0.5}>MOCK INTERVIEW</Text>
    <Surface x={208} y={118} w={144} h={80} r={14} e={0} fill={C.faint} />
    <rect x={222} y={134} width={112} height={8} rx={4} fill={C.ink} opacity={0.6} />
    <rect x={222} y={152} width={96} height={8} rx={4} fill={C.bar} />
    <rect x={222} y={170} width={64} height={8} rx={4} fill={C.bar} />
    {rows(13).map((i) => (
      <Loop key={i} a={{ scaleY: [0.3, 1, 0.45, 0.85, 0.3] }} d={1.6 + (i % 4) * 0.3} delay={i * 0.07} origin="center">
        <rect x={214 + i * 10.5} y={236} width={5} height={44} rx={2.5} fill={C.accent} />
      </Loop>
    ))}
    <rect x={208} y={310} width={144} height={34} rx={17} fill={C.accent} />
    <Text x={280} y={332} size={13} anchor="middle" fill={C.onAccent} weight={500} mono={false}>Recording</Text>
    <Loop a={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, 0] }} d={7} times={[0, 0.2, 0.8, 1]} ease="easeOut">
      <Surface x={384} y={150} w={142} h={64} r={12} e={1} />
      <Text x={398} y={174} size={11} opacity={0.5}>FEEDBACK</Text>
      <rect x={398} y={186} width={110} height={8} rx={4} fill={C.faint} />
      <rect x={398} y={186} width={82} height={8} rx={4} fill={C.accent} />
    </Loop>
  </VisualFrame>
);

/** Best Brew Coffee: an order flow with a loyalty ring. */
const BestBrew = () => (
  <VisualFrame>
    <Surface x={120} y={44} w={180} h={352} r={30} e={2} />
    <Text x={142} y={90} size={11} opacity={0.5}>MENU</Text>
    {rows(3).map((i) => (
      <g key={i}>
        <rect x={140} y={106 + i * 72} width={140} height={60} rx={12} fill={C.faint} />
        <circle cx={166} cy={136 + i * 72} r={16} fill={i === 1 ? C.accentSoft : C.line} />
        <rect x={192} y={124 + i * 72} width={64} height={8} rx={4} fill={C.ink} opacity={0.55} />
        <rect x={192} y={142 + i * 72} width={40} height={7} rx={3.5} fill={C.bar} />
      </g>
    ))}
    <Loop a={{ opacity: [0, 0, 1, 1, 0], scale: [0.9, 0.9, 1, 1, 0.9] }} d={8} times={[0, 0.25, 0.32, 0.9, 1]} ease="easeOut">
      <rect x={140} y={178} width={140} height={60} rx={12} fill="none" stroke={C.accent} strokeWidth={2} />
    </Loop>
    <Surface x={332} y={96} w={190} h={150} e={1} />
    <Text x={350} y={122} size={11} opacity={0.5}>LOYALTY</Text>
    <circle cx={427} cy={178} r={34} fill="none" stroke={C.line} strokeWidth={8} />
    <Loop a={{ rotate: [0, 0, 0] }} d={8}>
      <circle cx={427} cy={178} r={34} fill="none" stroke={C.accent} strokeWidth={8} strokeLinecap="round" strokeDasharray="214" strokeDashoffset="70" transform="rotate(-90 427 178)" />
    </Loop>
    <Text x={427} y={183} size={13} anchor="middle" weight={600} mono={false}>points</Text>
    <Surface x={332} y={262} w={190} h={96} e={1} />
    <Text x={350} y={288} size={11} opacity={0.5}>ORDER TRACKING</Text>
    <path d="M356 326h140" stroke={C.line} strokeWidth={3} strokeLinecap="round" />
    <Loop a={{ scaleX: [0, 1, 1, 0] }} d={8} times={[0, 0.7, 0.92, 1]} origin="left center" ease="linear">
      <rect x={356} y={324.5} width={140} height={3} rx={1.5} fill={C.accent} />
    </Loop>
  </VisualFrame>
);

/** SwiftPass Guard: a QR scan at an ESP32 reader that opens a lock. */
const SwiftPass = () => (
  <VisualFrame>
    <Surface x={36} y={90} w={150} h={260} r={26} e={2} />
    <Text x={54} y={126} size={11} opacity={0.5}>STUDENT</Text>
    <rect x={66} y={150} width={90} height={90} rx={10} fill={C.paper} stroke={C.line} />
    {rows(25).map((i) => (
      <rect key={i} x={74 + (i % 5) * 16} y={158 + Math.floor(i / 5) * 16} width={11} height={11} rx={2} fill={C.ink} opacity={[0, 2, 4, 6, 8, 10, 12, 14, 18, 20, 22, 24].includes(i) ? 0.85 : 0.2} />
    ))}
    <rect x={66} y={268} width={90} height={26} rx={13} fill={C.accent} />
    <Text x={111} y={286} size={12} anchor="middle" fill={C.onAccent} weight={500} mono={false}>Show QR</Text>
    <Loop a={{ x: [0, 0, 110, 110, 0] }} d={8} times={[0, 0.15, 0.42, 0.85, 1]} ease="easeInOut">
      <rect x={186} y={186} width={22} height={22} rx={5} fill={C.accent} opacity={0.85} />
    </Loop>
    <Surface x={290} y={120} w={130} h={80} r={12} e={1} />
    <Text x={305} y={146} size={11} opacity={0.55}>ESP32</Text>
    {rows(6).map((i) => <rect key={i} x={304 + i * 16} y={158} width={9} height={22} rx={2} fill={C.bar} />)}
    <Loop a={{ opacity: [0, 0, 1, 1, 0] }} d={8} times={[0, 0.4, 0.46, 0.85, 1]} ease="linear">
      <path d="M420 160h40" stroke={C.accent} strokeWidth={2} strokeDasharray="4 4" />
    </Loop>
    <Surface x={444} y={130} w={80} h={120} r={14} e={2} />
    <rect x={466} y={150} width={36} height={36} rx={10} fill={C.faint} />
    <Loop a={{ rotate: [0, 0, -35, -35, 0] }} d={8} times={[0, 0.4, 0.55, 0.85, 1]} origin="left bottom">
      <path d="M472 168v-14a12 12 0 0 1 24 0v14" stroke={C.accent} strokeWidth={4} fill="none" strokeLinecap="round" />
    </Loop>
    <rect x={462} y={186} width={44} height={36} rx={8} fill={C.accent} />
    <Surface x={290} y={240} w={130} h={80} r={12} e={1} />
    <Text x={305} y={264} size={11} opacity={0.5}>ATTENDANCE</Text>
    {rows(2).map((i) => <rect key={i} x={305} y={278 + i * 18} width={100 - i * 22} height={8} rx={4} fill={C.bar} />)}
  </VisualFrame>
);

/** Solace Hotel: room availability with a booking state. */
const SolaceHotel = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={360} h={330} e={1} />
    <Text x={58} y={86} size={11} opacity={0.5}>ROOMS</Text>
    {rows(4).map((r) => (
      <g key={r}>
        <Text x={58} y={130 + r * 62} size={12} opacity={0.7} mono={false}>{`Room ${101 + r}`}</Text>
        {rows(7).map((c) => {
          const busy = (r + c) % 3 === 0;
          return <rect key={c} x={130 + c * 36} y={112 + r * 62} width={30} height={30} rx={7} fill={busy ? C.accentSoft : C.faint} />;
        })}
      </g>
    ))}
    <Loop a={{ scaleX: [0, 0, 1, 1, 0] }} d={9} times={[0, 0.2, 0.4, 0.85, 1]} origin="left center">
      <rect x={202} y={236} width={102} height={30} rx={8} fill={C.accent} />
    </Loop>
    <Surface x={416} y={96} w={108} h={130} r={14} e={2} />
    <Text x={430} y={122} size={11} opacity={0.5}>GUEST</Text>
    <circle cx={470} cy={158} r={16} fill={C.faint} />
    <rect x={434} y={186} width={72} height={8} rx={4} fill={C.bar} />
    <rect x={434} y={204} width={48} height={8} rx={4} fill={C.line} />
    <Surface x={416} y={246} w={108} h={96} r={14} e={1} />
    <Text x={430} y={272} size={11} opacity={0.5}>ADMIN</Text>
    <rect x={430} y={286} width={78} height={22} rx={11} fill={C.faint} stroke={C.line} />
    <rect x={430} y={314} width={56} height={14} rx={7} fill={C.accentSoft} />
  </VisualFrame>
);

/** LMS: role-gated courses, progress, and a file going to cloud storage. */
const Lms = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={300} h={200} e={1} />
    <Text x={58} y={86} size={11} opacity={0.5}>COURSES</Text>
    {rows(3).map((i) => (
      <g key={i}>
        <rect x={58} y={104 + i * 50} width={256} height={40} rx={10} fill={C.faint} />
        <rect x={72} y={118 + i * 50} width={90} height={8} rx={4} fill={C.ink} opacity={0.55} />
        <rect x={72} y={132 + i * 50} width={256 - 40 - 10} height={4} rx={2} fill={C.line} />
        <Loop a={{ scaleX: [0, 1, 1, 0] }} d={9} times={[0, 0.3 + i * 0.1, 0.92, 1]} origin="left center">
          <rect x={72} y={132 + i * 50} width={(0.8 - i * 0.2) * 216} height={4} rx={2} fill={C.accent} />
        </Loop>
      </g>
    ))}
    <Surface x={36} y={276} w={140} h={110} e={2} />
    <Text x={52} y={302} size={11} opacity={0.5}>UPLOAD</Text>
    <rect x={52} y={316} width={108} height={50} rx={10} fill={C.faint} stroke={C.line} strokeDasharray="4 4" />
    <Loop a={{ y: [0, 0, 22, 22, 0], opacity: [0, 1, 1, 0, 0] }} d={8} times={[0, 0.1, 0.45, 0.6, 1]}>
      <rect x={90} y={322} width={32} height={26} rx={5} fill={C.accent} />
    </Loop>
    <Loop a={{ x: [0, 0, 140, 140, 0], opacity: [0, 1, 1, 0, 0] }} d={8} times={[0, 0.5, 0.75, 0.8, 1]} ease="easeInOut">
      <circle cx={190} cy={331} r={6} fill={C.accent} />
    </Loop>
    <Surface x={346} y={286} w={178} h={100} e={1} />
    <Text x={362} y={312} size={11} opacity={0.5}>STORAGE</Text>
    <rect x={362} y={326} width={146} height={42} rx={10} fill={C.accentSoft} stroke={C.accent} strokeOpacity={0.5} />
    <Surface x={356} y={96} w={168} h={150} r={14} e={2} />
    <Text x={372} y={122} size={11} opacity={0.5}>ACCESS</Text>
    {["Learner", "Admin"].map((r, i) => (
      <g key={r}>
        <rect x={372} y={136 + i * 44} width={136} height={34} rx={17} fill={i === 1 ? C.accent : "none"} stroke={i === 1 ? C.accent : C.line} />
        <Text x={440} y={158 + i * 44} size={12} anchor="middle" fill={i === 1 ? C.onAccent : C.ink} opacity={i === 1 ? 1 : 0.65}>{r}</Text>
      </g>
    ))}
  </VisualFrame>
);

/** SQM: a multi-step approval track beside a role and permission matrix. */
const Sqm = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={488} h={130} e={1} />
    <path d="M110 120H450" stroke={C.line} strokeWidth={3} strokeLinecap="round" />
    <Loop a={{ scaleX: [0, 0, 1, 1, 0], opacity: [1, 1, 1, 1, 0] }} d={10} times={[0, 0.08, 0.7, 0.92, 1]} origin="left center">
      <rect x={110} y={118.5} width={340} height={3} rx={1.5} fill={C.accent} />
    </Loop>
    {["Draft", "Submitted", "Review", "Approved"].map((l, i) => (
      <g key={l}>
        <circle cx={110 + i * (340 / 3)} cy={120} r={18} fill={C.paper} stroke={C.bar} strokeWidth={1.5} />
        <Loop a={{ opacity: [0, 0, 1, 1, 0] }} d={10} times={[0, 0.08 + i * 0.2, 0.14 + i * 0.2, 0.92, 1]} ease="linear">
          <circle cx={110 + i * (340 / 3)} cy={120} r={18} fill={C.accent} />
        </Loop>
        <Text x={110 + i * (340 / 3)} y={160} size={11} anchor="middle" opacity={0.65}>{l}</Text>
      </g>
    ))}
    <Surface x={36} y={206} w={488} h={180} r={16} e={2} />
    <Text x={58} y={236} size={11} opacity={0.5}>PERMISSIONS</Text>
    {["Supplier", "Checker", "SQE", "Approver"].map((r, i) => (
      <Text key={r} x={58} y={268 + i * 30} size={12} opacity={0.75} mono={false}>{r}</Text>
    ))}
    {["View", "Edit", "Approve"].map((a, c) => (
      <g key={a}>
        <Text x={236 + c * 96} y={236} size={11} anchor="middle" opacity={0.5}>{a}</Text>
        {rows(4).map((r) => {
          const on = c === 0 || (c === 1 && r < 2) || (c === 2 && r === 3);
          return <circle key={r} cx={236 + c * 96} cy={264 + r * 30} r={7} fill={on ? C.accent : "none"} stroke={on ? C.accent : C.line} />;
        })}
      </g>
    ))}
  </VisualFrame>
);

/** CICT: web admin and a phone sharing one API, with a QR scan. */
const Cict = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={290} h={200} e={1} />
    <path d="M36 90h290" stroke={C.line} />
    {rows(3).map((i) => <circle key={i} cx={54 + i * 13} cy={73} r={3.5} fill={C.faint} />)}
    <Text x={56} y={118} size={11} opacity={0.5}>EVENTS</Text>
    {rows(3).map((i) => (
      <g key={i}>
        <rect x={56} y={130 + i * 38} width={250} height={30} rx={8} fill={C.faint} />
        <rect x={68} y={141 + i * 38} width={84} height={7} rx={3.5} fill={C.bar} />
        <rect x={252} y={138 + i * 38} width={44} height={14} rx={7} fill={i === 0 ? C.accent : C.line} />
      </g>
    ))}
    <Surface x={384} y={80} w={120} h={240} r={24} e={2} />
    <rect x={426} y={92} width={36} height={6} rx={3} fill={C.faint} />
    <rect x={402} y={124} width={84} height={84} rx={10} fill={C.paper} stroke={C.line} />
    {rows(16).map((i) => <rect key={i} x={412 + (i % 4) * 17} y={134 + Math.floor(i / 4) * 17} width={11} height={11} rx={2} fill={C.ink} opacity={i % 3 === 0 ? 0.8 : 0.2} />)}
    <Loop a={{ y: [0, 72, 0] }} d={3.2} ease="linear">
      <rect x={402} y={126} width={84} height={3} rx={1.5} fill={C.accent} />
    </Loop>
    <rect x={402} y={232} width={84} height={26} rx={13} fill={C.accent} />
    <Text x={444} y={250} size={12} anchor="middle" fill={C.onAccent} weight={500} mono={false}>Attendance</Text>
    <path d="M326 156h58" stroke={C.accent} strokeWidth={2} strokeDasharray="5 5" />
    <Surface x={36} y={290} w={488} h={96} e={1} />
    <Text x={58} y={318} size={11} opacity={0.5}>SHARED API</Text>
    {["Content", "Events", "Roles", "Attendance"].map((l, i) => (
      <g key={l}>
        <rect x={58 + i * 114} y={332} width={100} height={32} rx={16} fill={i === 3 ? C.accentSoft : C.faint} stroke={i === 3 ? C.accent : "none"} strokeOpacity={0.5} />
        <Text x={108 + i * 114} y={353} size={12} anchor="middle" opacity={0.8}>{l}</Text>
      </g>
    ))}
  </VisualFrame>
);

/** Archon: a Kanban board where a task card moves between columns. */
const Archon = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={488} h={330} e={1} />
    {["To do", "In progress", "Done"].map((l, c) => (
      <g key={l}>
        <Text x={58 + c * 156} y={88} size={11} opacity={0.55}>{l.toUpperCase()}</Text>
        <rect x={52 + c * 156} y={100} width={140} height={272} rx={12} fill={C.faint} />
        {rows(c === 0 ? 3 : 2).map((i) => (
          <g key={i}>
            <rect x={62 + c * 156} y={112 + i * 66} width={120} height={54} rx={9} fill={C.paper} stroke={C.line} />
            <rect x={72 + c * 156} y={124 + i * 66} width={76} height={7} rx={3.5} fill={C.ink} opacity={0.55} />
            <rect x={72 + c * 156} y={140 + i * 66} width={50} height={6} rx={3} fill={C.bar} />
          </g>
        ))}
      </g>
    ))}
    <Loop a={{ x: [0, 0, 156, 156, 312, 312, 0], y: [0, 0, 0, 0, 0, 0, 0] }} d={10} times={[0, 0.12, 0.32, 0.5, 0.7, 0.9, 1]}>
      <rect x={62} y={244} width={120} height={54} rx={9} fill={C.paper} stroke={C.accent} strokeWidth={2} />
      <rect x={72} y={256} width={76} height={7} rx={3.5} fill={C.accent} />
      <rect x={72} y={272} width={50} height={6} rx={3} fill={C.bar} />
    </Loop>
    <Surface x={384} y={32} w={140} h={44} r={12} e={2} />
    <circle cx={406} cy={54} r={9} fill={C.accentSoft} stroke={C.accent} strokeOpacity={0.6} />
    <rect x={424} y={48} width={84} height={7} rx={3.5} fill={C.bar} />
  </VisualFrame>
);

/** AI Command Center: a progress dashboard with a trend line. */
const CommandCenter = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={300} h={170} e={1} />
    <Text x={58} y={84} size={11} opacity={0.5}>PROGRESS</Text>
    <path d="M58 200l40-30 40 14 44-50 40 24 46-36 30-6V210H58z" fill={C.accentSoft} />
    <Loop a={{ opacity: [1, 1, 1, 0], pathLength: [0, 1, 1, 1] }} d={9} times={[0, 0.5, 0.92, 1]}>
      <path d="M58 200l40-30 40 14 44-50 40 24 46-36 30-6" stroke={C.accent} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Loop>
    {rows(3).map((i) => (
      <Surface key={i} x={356 + 0} y={56 + i * 60} w={168} h={50} r={12} e={1} />
    ))}
    {["Workout plan", "Meal log", "Weekly check-in"].map((l, i) => (
      <g key={l}>
        <Text x={372} y={86 + i * 60} size={12} opacity={0.8} mono={false}>{l}</Text>
        <rect x={372} y={94 + i * 60} width={136} height={5} rx={2.5} fill={C.line} />
        <Loop a={{ scaleX: [0, 1, 1, 0] }} d={9} times={[0, 0.4 + i * 0.1, 0.92, 1]} origin="left center">
          <rect x={372} y={94 + i * 60} width={(0.9 - i * 0.2) * 136} height={5} rx={2.5} fill={C.accent} />
        </Loop>
      </g>
    ))}
    <Surface x={36} y={246} w={300} h={140} r={16} e={2} />
    <circle cx={64} cy={282} r={12} fill={C.accentSoft} stroke={C.accent} strokeOpacity={0.6} />
    <Text x={86} y={286} size={12} weight={600} mono={false}>AI suggestion</Text>
    <Loop a={{ opacity: [0, 1, 1, 0] }} d={8} times={[0, 0.2, 0.85, 1]} ease="linear">
      {rows(3).map((i) => <rect key={i} x={56} y={306 + i * 20} width={240 - i * 50} height={8} rx={4} fill={C.bar} />)}
    </Loop>
  </VisualFrame>
);

/** AiLead: a prompt becomes a script and then a video timeline. */
const AiLead = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={200} h={120} e={1} />
    <Text x={54} y={82} size={11} opacity={0.5}>PROMPT</Text>
    <rect x={54} y={98} width={150} height={8} rx={4} fill={C.ink} opacity={0.6} />
    <rect x={54} y={116} width={110} height={8} rx={4} fill={C.bar} />
    <Loop a={{ opacity: [1, 0, 1, 0, 1] }} d={1.2} ease="linear">
      <rect x={172} y={113} width={3} height={14} fill={C.accent} />
    </Loop>
    <Surface x={256} y={56} w={268} h={120} e={1} />
    <Text x={274} y={82} size={11} opacity={0.5}>SCRIPT</Text>
    {rows(3).map((i) => (
      <Loop key={i} a={{ scaleX: [0, 1, 1, 0] }} d={9} times={[0, 0.2 + i * 0.12, 0.9, 1]} origin="left center">
        <rect x={274} y={98 + i * 22} width={220 - i * 40} height={8} rx={4} fill={i === 1 ? C.accent : C.bar} />
      </Loop>
    ))}
    <path d="M236 116h20" stroke={C.accent} strokeWidth={1.5} strokeDasharray="3 3" />
    <Surface x={36} y={198} w={488} h={188} r={16} e={2} />
    <rect x={56} y={218} width={150} height={96} rx={10} fill={C.faint} />
    <circle cx={131} cy={266} r={20} fill={C.paper} stroke={C.line} />
    <path d="M125 256l18 10-18 10z" fill={C.accent} />
    {["Avatar", "Voice", "Language"].map((l, i) => (
      <g key={l}>
        <rect x={226} y={222 + i * 34} width={278} height={26} rx={13} fill={C.faint} />
        <Text x={242} y={239 + i * 34} size={12} opacity={0.7} mono={false}>{l}</Text>
        <rect x={340} y={230 + i * 34} width={150 - i * 24} height={8} rx={4} fill={C.bar} />
      </g>
    ))}
    <rect x={56} y={334} width={448} height={8} rx={4} fill={C.faint} />
    <Loop a={{ scaleX: [0, 1, 1, 0] }} d={9} times={[0, 0.8, 0.94, 1]} origin="left center" ease="linear">
      <rect x={56} y={334} width={448} height={8} rx={4} fill={C.accent} opacity={0.7} />
    </Loop>
  </VisualFrame>
);

export const projectVisuals: Record<string, ComponentType> = {
  "codex-express": CodexExpress,
  "reservation-desktop": ReservationDesktop,
  "jobint-ai-interview": Jobint,
  "best-brew-coffee": BestBrew,
  "swiftpass-guard": SwiftPass,
  "solace-hotel": SolaceHotel,
  "lms-learning-management": Lms,
  "sqm-supplier-quality": Sqm,
  "cict-organization-website": Cict,
  "archon-project-workspace": Archon,
  "ai-command-center-fitness": CommandCenter,
  "ai-script-video-generator": AiLead,
};

const PROJECT_TONE: Record<string, string> = {
  "reservation-desktop": "--tone-teal",
  "jobint-ai-interview": "--tone-violet",
  "best-brew-coffee": "--tone-amber",
  "swiftpass-guard": "--tone-teal",
  "solace-hotel": "--tone-rose",
  "lms-learning-management": "--tone-violet",
  "sqm-supplier-quality": "--tone-teal",
  "cict-organization-website": "--tone-amber",
  "archon-project-workspace": "--tone-violet",
  "ai-command-center-fitness": "--tone-rose",
  "ai-script-video-generator": "--tone-violet",
};

export const hasProjectVisual = (id: string): boolean => id in projectVisuals;

/** Renders a project's scene, tinted with its own accent, or nothing when it has none. */
export function ProjectVisual({ id, className }: { id: string; className?: string }) {
  const Scene = projectVisuals[id];
  if (!Scene) return null;
  const tone = PROJECT_TONE[id];
  const style = tone ? ({ "--primary": `var(${tone})` } as CSSProperties) : undefined;
  return (
    <div className={className} style={style}>
      <Scene />
    </div>
  );
}
