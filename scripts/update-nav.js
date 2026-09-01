const fs = require('fs');
let nav = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
if (!nav.includes("href: '/docs'")) {
  nav = nav.replace("{ label: 'Architecture', href: '/architecture', icon: ShieldCheck },", "{ label: 'Architecture', href: '/architecture', icon: ShieldCheck },\n    { label: 'API Docs', href: '/docs', icon: Terminal },");
  fs.writeFileSync('src/components/layout/Navbar.tsx', nav, 'utf8');
  console.log('Added API Docs to Navbar');
}
