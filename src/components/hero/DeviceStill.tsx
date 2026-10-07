export function DeviceStill({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 640 420" className="h-auto w-full bg-[#ece7de]" aria-hidden>
      <rect width="640" height="420" fill="#ece7de" />
      <rect x="150" y="58" width="340" height="268" rx="28" fill="#f4f1ea" />
      <rect x="162" y="70" width="316" height="244" rx="22" fill="#1c1c1c" />
      <rect x="178" y="88" width="284" height="168" rx="10" fill="#0d0f0c" />
      <text
        x="320"
        y="150"
        textAnchor="middle"
        fill="#c6ff4a"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="13"
        letterSpacing="0.18em"
      >
        {title.toUpperCase().slice(0, 14)}
      </text>
      <text
        x="320"
        y="176"
        textAnchor="middle"
        fill="#8ea36a"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="10"
        letterSpacing="0.22em"
      >
        SHIPPING v2
      </text>
      <rect x="196" y="270" width="248" height="28" rx="6" fill="#d8ff57" />
      {Array.from({ length: 11 }, (_, index) => (
        <rect
          key={index}
          x={204 + index * 21}
          y="276"
          width="14"
          height="16"
          rx="2"
          fill="#1c1c1c"
          opacity={index % 4 === 0 ? 0.35 : 0.12}
        />
      ))}
      <circle cx="478" cy="284" r="9" fill="#2a2a2a" />
      <rect x="118" y="250" width="22" height="54" rx="6" fill="#d6ff4a" />
      <rect x="500" y="318" width="86" height="18" rx="4" fill="#d6ff4a" opacity="0.9" />
    </svg>
  )
}
