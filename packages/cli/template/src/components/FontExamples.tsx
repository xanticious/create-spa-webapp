const FONTS: { name: string; className: string }[] = [
  { name: 'Libre Baskerville', className: 'font-libre-baskerville' },
  { name: 'Lora', className: 'font-lora' },
  { name: 'Inter', className: 'font-inter' },
  { name: 'Roboto', className: 'font-roboto' },
  { name: 'Open Sans', className: 'font-open-sans' },
  { name: 'Lato', className: 'font-lato' },
  { name: 'JetBrains Mono', className: 'font-jetbrains-mono' },
  { name: 'Fira Code', className: 'font-fira-code' },
];

export default function FontExamples() {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>Font Examples</h3>
      {FONTS.map(({ name, className }) => (
        <p key={name} className={className}>
          Hello World! from {name}
        </p>
      ))}
    </div>
  );
}
