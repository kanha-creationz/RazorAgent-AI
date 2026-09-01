const fs = require('fs');

let content = fs.readFileSync('src/app/ai/page.tsx', 'utf8');
if (!content.includes('function AICopilotInner()')) {
  content = content.replace('export default function AICopilotPage() {', 'function AICopilotInner() {');
  content += `

export default function AICopilotPage() {
  return (
    <React.Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-neutral-400 font-mono">Loading Commerce Copilot...</div>}>
      <AICopilotInner />
    </React.Suspense>
  );
}
`;
  fs.writeFileSync('src/app/ai/page.tsx', content, 'utf8');
  console.log('Successfully wrapped AICopilotPage with Suspense');
}
