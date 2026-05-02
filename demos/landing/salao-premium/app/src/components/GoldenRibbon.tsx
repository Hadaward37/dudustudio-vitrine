export default function GoldenRibbon({ className = '', fast = false }: { className?: string; fast?: boolean }) {
  return (
    <div className={`golden-ribbon ${fast ? 'golden-ribbon-fast' : ''} ${className}`} />
  );
}
