const tickerData = [
  { label: 'Economia média MEI', value: 'R$ 2.847/ano', change: '+12%' },
  { label: 'Impostos economizados', value: 'R$ 1.2M', change: '+8%' },
  { label: 'MEIs atendidos', value: '+850', change: '+5%' },
  { label: 'Multas evitadas', value: 'R$ 420K', change: '+15%' },
  { label: 'Satisfação clientes', value: '98%', change: '+2%' },
  { label: 'DASN em dia', value: '100%', change: '0%' },
];

export default function Ticker() {
  const items = [...tickerData, ...tickerData];

  return (
    <div className="w-full bg-[rgba(0,212,170,0.08)] border-y border-[rgba(0,212,170,0.15)] overflow-hidden py-2 relative z-20">
      <div className="ticker-track flex gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <span className="text-[rgba(240,244,255,0.5)] text-xs font-medium uppercase tracking-wider">
              {item.label}
            </span>
            <span className="font-mono-num text-[#00D4AA] text-sm font-bold">
              {item.value}
            </span>
            <span
              className={`text-xs font-medium ${
                item.change.startsWith('+')
                  ? 'text-[#00D4AA]'
                  : item.change === '0%'
                  ? 'text-[rgba(240,244,255,0.4)]'
                  : 'text-[#ff3366]'
              }`}
            >
              {item.change}
            </span>
            <span className="text-[rgba(240,244,255,0.15)] mx-2">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
