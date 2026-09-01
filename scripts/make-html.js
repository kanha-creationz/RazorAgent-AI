const fs = require('fs');
const path = require('path');

console.log('Generating standalone HTML...');

const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RazorAgent AI — Autonomous AI Commerce. From Discovery to Checkout.</title>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Poppins', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            background: '#070707',
            surface: '#121212',
            card: 'rgba(23, 23, 23, 0.75)',
            accent: {
              amber: '#F5A623',
              'amber-light': '#FFB84D',
              purple: '#7C5CFF',
              teal: '#20C997',
              rose: '#FF5D5D',
            }
          }
        }
      }
    }
  </script>

  <!-- Google Fonts: Poppins -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- FontAwesome Icons via CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #070707;
      color: #F7F2E8;
      overflow-x: hidden;
    }
    .light body {
      background-color: #F8F8F6;
      color: #111111;
    }
    .glass-panel {
      background: rgba(23, 23, 23, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .light .glass-panel {
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
    }
    .glass-panel-glow {
      background: rgba(23, 23, 23, 0.8);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(245, 166, 35, 0.35);
      box-shadow: 0 0 25px rgba(245, 166, 35, 0.08);
    }
    .bg-grid-pattern {
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    }
    .text-gradient-gold {
      background: linear-gradient(135deg, #FFB84D 0%, #F5A623 50%, #FF8C00 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .text-gradient-purple {
      background: linear-gradient(135deg, #B588FF 0%, #7C5CFF 50%, #4D28D4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: rgba(10, 10, 10, 0.6); }
    ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(245, 166, 35, 0.4); }
  </style>
</head>
<body class="min-h-screen flex flex-col bg-background text-text-primary antialiased bg-grid-pattern">

  <!-- NAVBAR -->
  <nav class="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="#landing" onclick="navigate('landing')" class="flex items-center space-x-3 group cursor-pointer">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-amber to-accent-purple flex items-center justify-center shadow-lg shadow-accent-amber/20 group-hover:scale-105 transition-transform">
            <i class="fa-solid fa-robot text-black font-bold"></i>
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-lg tracking-tight text-white flex items-center">
              RazorAgent <span class="text-accent-amber ml-1">AI</span>
            </span>
            <span class="text-[9px] text-neutral-400 uppercase tracking-widest font-mono">Autonomous Commerce</span>
          </div>
        </a>

        <!-- Desktop Links -->
        <div class="hidden lg:flex items-center space-x-1 text-xs font-medium">
          <button onclick="navigate('shop')" class="nav-btn px-3.5 py-1.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-all flex items-center space-x-2" data-page="shop">
            <i class="fa-solid fa-bag-shopping"></i><span>Smart Shop</span>
          </button>
          <button onclick="navigate('ai')" class="nav-btn px-3.5 py-1.5 rounded-xl text-accent-amber hover:bg-accent-amber/10 border border-accent-amber/30 transition-all flex items-center space-x-2 font-bold" data-page="ai">
            <i class="fa-solid fa-robot"></i><span>AI Copilot</span>
          </button>
          <button onclick="navigate('live-agent')" class="nav-btn px-3.5 py-1.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-all flex items-center space-x-2" data-page="live-agent">
            <i class="fa-solid fa-wand-magic-sparkles text-accent-purple"></i><span>Live Visualizer</span>
            <span class="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-gradient-to-r from-accent-amber to-accent-purple text-black">WOW</span>
          </button>
          <button onclick="navigate('dashboard')" class="nav-btn px-3.5 py-1.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-all flex items-center space-x-2" data-page="dashboard">
            <i class="fa-solid fa-chart-line"></i><span>Merchant Hub</span>
          </button>
          <button onclick="navigate('server')" class="nav-btn px-3.5 py-1.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-all flex items-center space-x-2" data-page="server">
            <i class="fa-solid fa-terminal"></i><span>Server Console</span>
          </button>
          <button onclick="navigate('architecture')" class="nav-btn px-3.5 py-1.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-all flex items-center space-x-2" data-page="architecture">
            <i class="fa-solid fa-layer-group"></i><span>Architecture</span>
          </button>
          <button onclick="navigate('docs')" class="nav-btn px-3.5 py-1.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-all flex items-center space-x-2" data-page="docs">
            <i class="fa-solid fa-code"></i><span>API Docs</span>
          </button>
        </div>

        <!-- Right Action Icons -->
        <div class="flex items-center space-x-3">
          <button onclick="toggleCommandPalette()" class="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-surface border border-white/10 text-xs text-neutral-400 hover:text-white transition-all font-mono">
            <span>Search</span><kbd class="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">Ctrl+K</kbd>
          </button>
          
          <button onclick="navigate('cart')" class="relative p-2 rounded-xl bg-surface/60 border border-white/10 text-neutral-300 hover:text-white transition-colors">
            <i class="fa-solid fa-cart-shopping text-sm"></i>
            <span id="cartBadge" class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-amber text-black text-[10px] font-bold flex items-center justify-center">0</span>
          </button>

          <button onclick="toggleTheme()" class="p-2 rounded-xl bg-surface/60 border border-white/10 text-neutral-300 hover:text-white transition-all">
            <i id="themeIcon" class="fa-solid fa-sun text-accent-amber text-xs"></i>
          </button>

          <button onclick="navigate('ai')" class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-accent-amber to-accent-amber-light text-black font-semibold text-xs shadow-md shadow-accent-amber/20 hover:opacity-95 transition-opacity">
            Try AI Buyer
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- MAIN APP CONTAINER -->
  <main class="flex-1 pt-20 pb-16">

    <!-- 1. LANDING PAGE VIEW -->
    <div id="view-landing" class="page-view space-y-20">
      <section class="relative pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-surface/80 border border-accent-amber/30 text-xs font-mono text-accent-amber mb-6 shadow-sm">
          <i class="fa-solid fa-sparkles animate-spin"></i>
          <span>Autonomous AI Agentic Commerce Platform</span>
        </div>

        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight">
          AI that doesn't just recommend. <span class="text-gradient-gold block mt-2">It sells.</span>
        </h1>

        <p class="mt-6 text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
          An intelligent commerce platform where AI buyers discover products, build verified bundles, execute Explainable Permission Gates, and pay safely via Razorpay Sandbox.
        </p>

        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onclick="navigate('ai')" class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-amber to-accent-amber-light text-black font-bold text-sm shadow-xl shadow-accent-amber/25 hover:scale-105 transition-all flex items-center justify-center space-x-2">
            <i class="fa-solid fa-robot"></i><span>Launch Commerce Copilot</span><i class="fa-solid fa-arrow-right text-xs"></i>
          </button>
          <button onclick="navigate('live-agent')" class="w-full sm:w-auto px-6 py-4 rounded-2xl bg-accent-purple/20 border border-accent-purple/40 text-purple-200 font-semibold text-sm hover:bg-accent-purple/30 transition-all flex items-center justify-center space-x-2">
            <i class="fa-solid fa-wand-magic-sparkles text-accent-amber"></i><span>Live WOW Visualizer</span>
          </button>
          <button onclick="navigate('dashboard')" class="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center space-x-2">
            <i class="fa-solid fa-chart-line text-accent-purple"></i><span>Merchant Growth Hub</span>
          </button>
        </div>

        <div class="mt-12 max-w-5xl mx-auto">
          <div class="relative w-full h-[420px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex items-center justify-center">
            <div class="absolute top-4 left-6 flex items-center space-x-2 text-xs font-mono text-neutral-400">
              <span class="w-2 h-2 rounded-full bg-accent-amber animate-ping"></span>
              <span>Autonomous Commerce Graph Pipeline (Realtime Visualizer)</span>
            </div>
            <canvas id="heroCanvas" class="w-full h-full"></canvas>
          </div>
        </div>
      </section>

      <!-- Live Transaction Feed -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-white/10">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <div class="flex items-center space-x-2">
                <span class="w-2.5 h-2.5 rounded-full bg-accent-teal animate-ping"></span>
                <h2 class="text-xl font-bold text-white">Live Autonomous Transaction Feed</h2>
              </div>
              <p class="text-xs text-neutral-400 mt-0.5">Real-time event stream from agent discovery to Razorpay sandbox settlements.</p>
            </div>
            <span class="font-mono text-xs px-3 py-1 rounded-xl bg-accent-teal/20 text-accent-teal border border-accent-teal/30">
              REALTIME BUS ACTIVE
            </span>
          </div>

          <div id="liveStreamList" class="space-y-2.5"></div>
        </div>
      </section>

      <!-- Feature Grid -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <h2 class="text-xs font-mono uppercase tracking-widest text-accent-amber mb-2">Core Architecture</h2>
          <h3 class="text-3xl font-extrabold text-white">Engineered for Autonomous Commerce</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-accent-amber/10 text-accent-amber flex items-center justify-center font-bold">
              <i class="fa-solid fa-robot"></i>
            </div>
            <h4 class="text-base font-bold text-white">Autonomous Bundling</h4>
            <p class="text-xs text-neutral-400 leading-relaxed">
              Understands multi-variable constraints (e.g. *“College setup <₹60,000”*), validates merchant inventory, and applies instant promo rules.
            </p>
          </div>

          <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-accent-purple/10 text-accent-purple flex items-center justify-center font-bold">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
            <h4 class="text-base font-bold text-white">Explainable Money Gates</h4>
            <p class="text-xs text-neutral-400 leading-relaxed">
              Interlocks financial actions behind explicit user approval. Prevents unconfirmed charges and generates cryptographically signed audit logs.
            </p>
          </div>

          <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-accent-teal/10 text-accent-teal flex items-center justify-center font-bold">
              <i class="fa-solid fa-credit-card"></i>
            </div>
            <h4 class="text-base font-bold text-white">Razorpay Sandbox</h4>
            <p class="text-xs text-neutral-400 leading-relaxed">
              Full test mode payment orchestration with server-side order generation, simulated QR codes, and HMAC-SHA256 signature verification.
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- 2. SMART SHOP VIEW -->
    <div id="view-shop" class="page-view hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-amber/10 text-accent-amber font-mono text-xs mb-2">
            <i class="fa-solid fa-robot"></i><span>Agent-Readable Verified Catalog</span>
          </div>
          <h1 class="text-3xl font-extrabold text-white">Smart Product Catalog</h1>
        </div>
        <div class="flex items-center space-x-3">
          <button onclick="openAgentJsonModal()" class="px-4 py-2 rounded-xl bg-surface border border-white/10 text-xs font-mono text-neutral-300 hover:text-white flex items-center space-x-2">
            <i class="fa-solid fa-code text-accent-purple"></i><span>Agent JSON Schema</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="space-y-6 glass-panel p-5 rounded-2xl border border-white/10 h-fit text-xs">
          <div>
            <label class="font-mono font-bold uppercase text-neutral-300 block mb-2">Search Catalog</label>
            <div class="relative">
              <i class="fa-solid fa-magnifying-glass text-neutral-500 absolute left-3 top-2.5"></i>
              <input type="text" id="shopSearchInput" oninput="filterCatalog()" placeholder="Keywords, specs..." class="w-full bg-surface border border-white/10 rounded-xl pl-8 pr-3 py-2 text-white focus:outline-none focus:border-accent-amber">
            </div>
          </div>

          <div>
            <label class="font-mono font-bold uppercase text-neutral-300 block mb-2">Categories</label>
            <div class="space-y-1" id="categoryFilterList"></div>
          </div>

          <div>
            <div class="flex justify-between mb-2">
              <span class="font-mono font-bold text-neutral-300">Max Budget</span>
              <span id="budgetLabel" class="font-mono font-bold text-accent-amber">₹2,50,000</span>
            </div>
            <input type="range" id="shopBudgetSlider" min="2000" max="250000" step="5000" value="250000" oninput="updateBudgetFilter(this.value)" class="w-full accent-accent-amber">
          </div>
        </div>

        <div class="md:col-span-3">
          <div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </div>
      </div>
    </div>

    <!-- 3. CENTRAL COMMERCE COPILOT VIEW (/ai) -->
    <div id="view-ai" class="page-view hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-7rem)] flex flex-col lg:flex-row gap-6">
      <div class="flex-1 glass-panel rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
        <div class="px-6 py-4 border-b border-white/10 bg-surface/80 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-2xl bg-gradient-to-tr from-accent-amber to-accent-purple flex items-center justify-center text-black font-bold">
              <i class="fa-solid fa-robot"></i>
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h2 class="font-bold text-sm text-white">Commerce Copilot</h2>
                <span class="text-[9px] font-mono px-2 py-0.5 rounded-full bg-accent-teal/20 text-accent-teal border border-accent-teal/30">18 TOOLS ACTIVE</span>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono">Autonomous Discovery • Explainable Gates • Razorpay Sandbox</p>
            </div>
          </div>

          <button onclick="runScenarioCollegeSetup()" class="px-3 py-1.5 rounded-xl bg-accent-amber/20 border border-accent-amber/40 text-accent-amber text-xs font-bold hover:bg-accent-amber/30">
            ⚡ Quick Demo Setup &lt;₹60k
          </button>
        </div>

        <div id="chatMessageThread" class="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm"></div>

        <div class="p-4 border-t border-white/10 bg-surface/80">
          <form onsubmit="handleChatSubmit(event)" class="flex items-center space-x-2">
            <input type="text" id="chatInput" placeholder="Ask anything (e.g. 'College setup under 60k', 'Headphones under 3000')..." class="flex-1 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-accent-amber">
            <button type="submit" class="p-3 rounded-2xl bg-accent-amber text-black font-bold hover:bg-accent-amber-light">
              <i class="fa-solid fa-paper-plane text-xs"></i>
            </button>
          </form>
        </div>
      </div>

      <div class="hidden lg:flex w-80 flex-col glass-panel rounded-3xl border border-white/10 p-5 space-y-4 text-xs font-mono">
        <h3 class="font-bold text-white uppercase text-xs">Agent Tool Telemetry</h3>
        <div class="space-y-2">
          <div class="p-3 rounded-xl bg-surface border border-white/5 text-[11px]">
            <span class="text-neutral-400">STATUS:</span> <span class="text-accent-teal font-bold">READY</span>
          </div>
          <div class="p-3 rounded-xl bg-surface border border-white/5 text-[11px]">
            <span class="text-neutral-400">SAFETY GATE:</span> <span class="text-accent-amber font-bold">MANDATED</span>
          </div>
        </div>

        <div class="pt-4 border-t border-white/10 space-y-2">
          <span class="text-neutral-400 font-bold block mb-1">Demo Prompts:</span>
          <button onclick="sendChatMessage('I need a productivity setup for college under 60000')" class="w-full text-left p-2.5 rounded-xl bg-surface hover:bg-white/10 text-neutral-300 text-[11px]">
            🎓 College Setup &lt;₹60,000
          </button>
          <button onclick="sendChatMessage('I need headphones under 3000')" class="w-full text-left p-2.5 rounded-xl bg-surface hover:bg-white/10 text-neutral-300 text-[11px]">
            🎧 Headphones &lt;₹3,000
          </button>
        </div>
      </div>
    </div>

    <!-- 4. LIVE AGENT VISUALIZER VIEW (/live-agent) -->
    <div id="view-live-agent" class="page-view hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div class="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center space-x-2 text-xs font-mono text-accent-amber mb-1">
            <i class="fa-solid fa-sparkles animate-spin"></i><span>HACKATHON COMMAND CENTER</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Live Agentic Commerce Visualizer</h1>
        </div>
        <div class="flex space-x-3">
          <button onclick="runScenarioCollegeSetup()" class="px-4 py-2 rounded-xl bg-accent-amber text-black font-bold text-xs hover:bg-accent-amber-light flex items-center space-x-2">
            <i class="fa-solid fa-play"></i><span>Trigger Complete Pitch Flow</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 class="text-xs font-bold text-white uppercase font-mono">3D/2D Autonomous Flow Graph</h3>
          <div class="h-64 relative rounded-2xl overflow-hidden bg-black/40">
            <canvas id="liveFlowCanvas" class="w-full h-full"></canvas>
          </div>
        </div>

        <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <h3 class="text-xs font-bold text-white uppercase font-mono">7-Stage Pipeline Tracker</h3>
          <div class="space-y-2 text-xs" id="pipelineTrackerList"></div>
        </div>

        <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 font-mono">
          <div class="flex justify-between items-center text-xs">
            <span class="font-bold text-white">Backend Server Terminal Log Stream</span>
            <span class="text-accent-teal">LIVE HTTP/SSE</span>
          </div>
          <div id="liveTerminalOutput" class="p-4 rounded-2xl bg-black/80 h-56 overflow-y-auto text-[11px] text-emerald-400 space-y-1"></div>
        </div>

        <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 class="text-xs font-bold text-white uppercase font-mono">Live Attribution Telemetry</h3>
          <div class="grid grid-cols-2 gap-4 text-xs font-mono">
            <div class="p-4 rounded-2xl bg-surface border border-white/5">
              <span class="text-neutral-400 text-[10px]">TOTAL AI GMV</span>
              <p class="text-2xl font-bold text-white mt-1">₹14,28,450</p>
              <span class="text-[10px] text-emerald-400">+34.2% today</span>
            </div>
            <div class="p-4 rounded-2xl bg-surface border border-white/5">
              <span class="text-neutral-400 text-[10px]">AI CONVERSION RATE</span>
              <p class="text-2xl font-bold text-accent-teal mt-1">12.9%</p>
            </div>
            <div class="p-4 rounded-2xl bg-surface border border-white/5">
              <span class="text-neutral-400 text-[10px]">BUNDLES GENERATED</span>
              <p class="text-2xl font-bold text-accent-purple mt-1">3,410</p>
            </div>
            <div class="p-4 rounded-2xl bg-surface border border-white/5">
              <span class="text-neutral-400 text-[10px]">SANDBOX PAYMENTS</span>
              <p class="text-2xl font-bold text-accent-amber mt-1">1,840</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. CART VIEW -->
    <div id="view-cart" class="page-view hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 class="text-3xl font-extrabold text-white">Your Cart</h1>
        <p class="text-xs text-neutral-400 mt-1">Review items and proceed to Explainable Permission Gated checkout.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4" id="cartItemsList"></div>

        <div class="glass-panel-glow p-6 rounded-3xl border border-accent-amber/30 space-y-6 h-fit text-xs font-mono">
          <h3 class="font-bold text-sm text-white uppercase">Order Calculation</h3>
          
          <div class="flex space-x-2">
            <input type="text" id="couponInput" placeholder="STUDENT10" class="flex-1 bg-surface border border-white/10 rounded-xl px-3 py-2 text-white uppercase">
            <button onclick="applyCouponCode()" class="px-4 py-2 rounded-xl bg-surface border border-white/20 hover:border-accent-amber text-white font-bold">
              Apply
            </button>
          </div>

          <div class="space-y-2 pt-4 border-t border-white/10">
            <div class="flex justify-between text-neutral-400"><span>Subtotal:</span><span id="summarySubtotal">₹0</span></div>
            <div class="flex justify-between text-emerald-400"><span>Discount (Promo):</span><span id="summaryDiscount">-₹0</span></div>
            <div class="flex justify-between text-neutral-400"><span>GST Tax (8%):</span><span id="summaryTax">₹0</span></div>
            <div class="flex justify-between text-neutral-400"><span>Express Delivery:</span><span id="summaryShipping">FREE</span></div>
            <div class="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
              <span>Verified Total:</span><span id="summaryTotal" class="text-accent-amber">₹0</span>
            </div>
          </div>

          <button onclick="navigate('checkout')" class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent-amber to-accent-amber-light text-black font-extrabold text-xs flex items-center justify-center space-x-2 shadow-xl shadow-accent-amber/20 hover:opacity-95">
            <span>Proceed to Checkout</span><i class="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 6. CHECKOUT VIEW -->
    <div id="view-checkout" class="page-view hidden max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 class="text-3xl font-extrabold text-white">Autonomous Checkout</h1>
        <p class="text-xs text-neutral-400 mt-1">Explainable permission gated payment orchestration via Razorpay Test Sandbox.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 text-xs">
            <h3 class="font-bold text-sm text-white uppercase font-mono">Delivery Coordinates</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-neutral-400 block mb-1">Full Name</label>
                <input type="text" value="Elena Rostova (AI Buyer)" class="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white">
              </div>
              <div>
                <label class="text-neutral-400 block mb-1">City</label>
                <input type="text" value="Bengaluru" class="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white">
              </div>
              <div class="col-span-2">
                <label class="text-neutral-400 block mb-1">Address Line</label>
                <input type="text" value="Tech Residency, Tower B, 4th Floor" class="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-white">
              </div>
            </div>
          </div>

          <div class="glass-panel-glow p-6 rounded-3xl border border-accent-amber/40 space-y-4 text-xs">
            <div class="flex items-center space-x-2 text-accent-amber font-bold font-mono">
              <i class="fa-solid fa-lock"></i><span>EXPLAINABLE FINANCIAL PERMISSION GATE</span>
            </div>
            <p class="text-neutral-300 leading-relaxed">
              AI prepared a bounded checkout transaction. No money can be debited without your explicit authorization.
            </p>
            <div class="flex items-center space-x-3 pt-2">
              <input type="checkbox" id="moneyGateCheckbox" onchange="toggleGateApproval(this.checked)" class="w-4 h-4 accent-accent-amber rounded cursor-pointer">
              <label for="moneyGateCheckbox" class="font-bold text-white cursor-pointer select-none">
                I explicitly approve this transaction in Razorpay Test Mode
              </label>
            </div>
          </div>

          <div class="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 text-xs">
            <div class="flex justify-between items-center">
              <span class="font-mono font-bold text-neutral-300">Failure Recovery Simulator</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-400">DEMO CONTROLS</span>
            </div>
            <div class="flex gap-2">
              <button onclick="setSimScenario('SUCCESS')" class="sim-btn px-3 py-1.5 rounded-xl bg-accent-purple text-white font-bold text-[11px]" data-sim="SUCCESS">
                Normal Flow
              </button>
              <button onclick="setSimScenario('TIMEOUT')" class="sim-btn px-3 py-1.5 rounded-xl bg-surface border border-white/10 text-neutral-400 text-[11px]" data-sim="TIMEOUT">
                Simulate Timeout
              </button>
            </div>
          </div>
        </div>

        <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 h-fit text-xs font-mono">
          <h3 class="font-bold text-sm text-white uppercase">Payable Total</h3>
          <div class="text-3xl font-black text-accent-amber" id="checkoutPayableAmount">₹53,846</div>
          <p class="text-neutral-400 text-[11px]">Razorpay Sandbox • Zero Raw Card Storage</p>

          <button id="payNowBtn" onclick="executeRazorpayPayment()" disabled class="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-amber to-accent-amber-light text-black font-black text-xs shadow-xl shadow-accent-amber/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
            <i class="fa-solid fa-credit-card"></i><span>Authorize & Pay (Test Mode)</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 7. MERCHANT DASHBOARD VIEW (/dashboard) -->
    <div id="view-dashboard" class="page-view hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-purple/10 text-purple-300 font-mono text-xs mb-2">
            <i class="fa-solid fa-chart-line text-accent-amber"></i><span>Autonomous Merchant Revenue Hub</span>
          </div>
          <h1 class="text-3xl font-extrabold text-white">Merchant Growth Center</h1>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span class="text-neutral-400 text-xs font-mono uppercase">Total GMV</span>
          <p class="text-3xl font-black text-white" id="kpiGMV">₹14,28,450</p>
          <span class="text-[11px] text-accent-teal font-mono">+28.4% this week</span>
        </div>
        <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span class="text-neutral-400 text-xs font-mono uppercase">AI Revenue Share</span>
          <p class="text-3xl font-black text-accent-purple">85.4%</p>
        </div>
        <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span class="text-neutral-400 text-xs font-mono uppercase">AI Conversion Rate</span>
          <p class="text-3xl font-black text-accent-teal">12.9%</p>
        </div>
        <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span class="text-neutral-400 text-xs font-mono uppercase">Average Order Value</span>
          <p class="text-3xl font-black text-white">₹53,846</p>
        </div>
      </div>

      <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-sm text-white uppercase font-mono">Cryptographic Immutable Audit Explorer</h3>
          <span class="text-xs font-mono px-2.5 py-1 rounded-full bg-accent-teal/20 text-accent-teal">HMAC VERIFIED</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs font-mono">
            <thead class="bg-surface/80 text-neutral-400 border-b border-white/10">
              <tr>
                <th class="p-3">Audit ID</th>
                <th class="p-3">Action</th>
                <th class="p-3">Status</th>
                <th class="p-3">Amount</th>
                <th class="p-3">Permission Gate</th>
              </tr>
            </thead>
            <tbody id="auditTableBody" class="divide-y divide-white/5"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 8. ARCHITECTURE & DOCS -->
    <div id="view-architecture" class="page-view hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 class="text-3xl font-extrabold text-white">RazorAgent AI Agentic Architecture</h1>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
        <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <span class="font-bold text-accent-amber font-mono">LAYER 1</span>
          <h3 class="text-base font-bold text-white">Intent Parser & Guardrails</h3>
          <p class="text-neutral-400 leading-relaxed">Converts natural language into deterministic parameter queries with budget constraints.</p>
        </div>
        <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <span class="font-bold text-accent-purple font-mono">LAYER 2</span>
          <h3 class="text-base font-bold text-white">18+ Tool Execution Router</h3>
          <p class="text-neutral-400 leading-relaxed">Executes warehouse inventory checks, bundling arithmetic, and pricing calculations.</p>
        </div>
        <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <span class="font-bold text-accent-teal font-mono">LAYER 3</span>
          <h3 class="text-base font-bold text-white">Razorpay Sandbox Gateway</h3>
          <p class="text-neutral-400 leading-relaxed">Server-side order generation, HMAC verification, and zero raw credential storage.</p>
        </div>
      </div>
    </div>

    <div id="view-docs" class="page-view hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 class="text-3xl font-extrabold text-white">REST & Agent API Documentation</h1>
      <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 font-mono text-xs">
        <div class="flex items-center space-x-3">
          <span class="px-2 py-1 rounded bg-accent-amber text-black font-bold">POST</span>
          <span class="text-white font-bold">/api/agent/chat</span>
        </div>
        <p class="text-neutral-400">Accepts buyer queries and runs multi-tool bundling cycles.</p>
        <pre class="p-4 rounded-2xl bg-black/80 text-emerald-400 overflow-x-auto">
POST /api/agent/chat
{
  "prompt": "I need a productivity setup for college under ₹60,000",
  "sessionId": "sess_demo_98210"
}</pre>
      </div>
    </div>

    <!-- 9. SERVER CONSOLE VIEW -->
    <div id="view-server" class="page-view hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-mono">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-extrabold text-white">Admin Practical Server Console</h1>
        <span class="text-accent-teal text-xs font-bold">Node.js Engine ONLINE</span>
      </div>
      <div class="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
        <span class="text-xs text-neutral-400">stdout / server.log</span>
        <div id="serverLogFullStream" class="p-4 rounded-2xl bg-black/80 h-96 overflow-y-auto text-[11px] text-neutral-300 space-y-2"></div>
      </div>
    </div>

  </main>

  <!-- MODALS -->
  <div id="razorpayModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md hidden">
    <div class="w-full max-w-md bg-[#0D1117] rounded-3xl p-6 border border-accent-teal/40 space-y-6 shadow-2xl text-center">
      <div class="flex items-center justify-between pb-4 border-b border-white/10">
        <div class="flex items-center space-x-2">
          <span class="font-bold text-sm text-white">Razorpay Sandbox Checkout</span>
          <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-accent-teal/20 text-accent-teal">TEST MODE</span>
        </div>
        <button onclick="closeRazorpayModal()" class="text-neutral-400 hover:text-white text-xs">✕</button>
      </div>

      <div class="space-y-2">
        <span class="text-neutral-400 text-xs font-mono">TOTAL PAYABLE:</span>
        <p class="text-3xl font-black text-accent-teal" id="modalPayable">₹53,846</p>
      </div>

      <div class="p-4 bg-white rounded-2xl w-44 h-44 mx-auto flex items-center justify-center shadow-md">
        <div class="text-black font-mono text-[10px] text-center space-y-2">
          <i class="fa-solid fa-qrcode text-6xl text-black"></i>
          <p class="font-bold">Scan to Pay via UPI</p>
        </div>
      </div>

      <button onclick="confirmTestPaymentSuccess()" class="w-full py-3.5 rounded-2xl bg-accent-teal text-black font-extrabold text-xs hover:bg-emerald-400 transition-all flex items-center justify-center space-x-2">
        <i class="fa-solid fa-check"></i><span>Simulate Successful UPI Payment</span>
      </button>
    </div>
  </div>

  <div id="agentJsonModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md hidden">
    <div class="w-full max-w-3xl max-h-[80vh] glass-panel-glow rounded-3xl p-6 flex flex-col border border-accent-purple/40">
      <div class="flex items-center justify-between pb-4 border-b border-white/10">
        <span class="font-bold text-sm text-white">Machine-Readable Agent Feed (/api/products?agent=true)</span>
        <button onclick="closeAgentJsonModal()" class="text-neutral-400 hover:text-white text-xs font-mono">✕ Close</button>
      </div>
      <pre id="agentJsonContent" class="flex-1 overflow-auto p-4 bg-black/70 rounded-2xl text-[11px] font-mono text-emerald-400 mt-4"></pre>
    </div>
  </div>

  <!-- Floating Nexa Assistant -->
  <button onclick="toggleNexaAssistant()" class="fixed bottom-6 right-6 z-40 flex items-center space-x-2 px-4 py-3 rounded-full bg-gradient-to-r from-accent-amber via-accent-amber-light to-accent-purple text-black font-semibold text-xs shadow-2xl shadow-accent-amber/30 hover:scale-105 transition-all">
    <i class="fa-solid fa-robot text-sm"></i>
    <span class="font-bold">Nexa Assistant</span>
  </button>

  <div id="nexaFloatingWindow" class="fixed bottom-20 right-6 z-50 w-80 h-96 glass-panel-glow rounded-2xl flex flex-col shadow-2xl border border-accent-amber/40 hidden text-xs">
    <div class="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-surface/80 rounded-t-2xl">
      <span class="font-bold text-white">Nexa Quick Helper</span>
      <button onclick="toggleNexaAssistant()" class="text-neutral-400 hover:text-white">✕</button>
    </div>
    <div class="flex-1 p-3 overflow-y-auto space-y-2 text-neutral-300" id="nexaFloatingChat">
      <p class="p-2.5 rounded-xl bg-surface border border-white/5">Hi! I am Nexa Assistant. Ask me anything or trigger the demo scenarios!</p>
    </div>
    <div class="p-2 border-t border-white/10 bg-surface/80 flex space-x-2">
      <input type="text" id="nexaFloatInput" placeholder="Ask Nexa..." onkeydown="if(event.key==='Enter')sendFloatNexaMsg()" class="flex-1 bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-white">
      <button onclick="sendFloatNexaMsg()" class="px-3 py-1.5 rounded-xl bg-accent-amber text-black font-bold">Send</button>
    </div>
  </div>

  <!-- JAVASCRIPT STATE ENGINE -->
  <script>
    const PRODUCTS = [
      {
        id: 'prod_01',
        sku: 'NEX-LAP-001',
        name: 'RazorAgent QuantumBook Pro 16\\" AI Edition',
        brand: 'RazorAgent Hardware',
        categoryId: 'cat_laptops',
        price: 189999,
        inventory: 24,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80',
        desc: '16\\" AI creator laptop with 36GB RAM and 22hr battery life.',
        tags: ['laptop', 'ai', 'developer']
      },
      {
        id: 'prod_03',
        sku: 'NEX-LAP-003',
        name: 'RazorAgent SwiftAir 14\\" Slim College Edition',
        brand: 'RazorAgent Hardware',
        categoryId: 'cat_laptops',
        price: 49999,
        inventory: 52,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80',
        desc: 'Featherlight 14\\" laptop with 16GB RAM and all-day battery.',
        tags: ['college laptop', 'budget', 'student']
      },
      {
        id: 'prod_05',
        sku: 'NEX-ACC-001',
        name: 'AeroGlide Pro Wireless Ergonomic Mouse',
        brand: 'AeroGlide',
        categoryId: 'cat_accessories',
        price: 2499,
        inventory: 140,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=80',
        desc: 'Silent wireless mouse with infinite scroll and 90-day battery.',
        tags: ['mouse', 'wireless']
      },
      {
        id: 'prod_07',
        sku: 'NEX-AUD-001',
        name: 'AcousticPure Flow ANC Wireless Headphones',
        brand: 'AcousticPure',
        categoryId: 'cat_audio',
        price: 2899,
        inventory: 90,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
        desc: 'Hybrid ANC over-ear headphones with 55hr battery and deep bass.',
        tags: ['headphones', 'anc', 'audio']
      }
    ];

    const CATEGORIES = [
      { id: 'all', name: 'All Categories' },
      { id: 'cat_laptops', name: 'Laptops & Workstations' },
      { id: 'cat_audio', name: 'Audiophile & ANC' },
      { id: 'cat_accessories', name: 'Peripherals & Docks' }
    ];

    let cart = { items: [], subtotal: 0, discount: 0, tax: 0, shipping: 0, total: 0, couponCode: '' };
    let auditLogs = [
      { auditId: 'AUD-2026-98102', action: 'AI_SEARCH_DISCOVERY', status: 'SUCCESS', amount: 55397, gate: 'APPROVED' },
      { auditId: 'AUD-2026-98103', action: 'CART_CREATION_BOUNDED', status: 'REQUIRES_APPROVAL', amount: 53846, gate: 'PENDING' },
      { auditId: 'AUD-2026-98104', action: 'PAYMENT_CAPTURED_WEBHOOK', status: 'SUCCESS', amount: 53846, gate: 'APPROVED' }
    ];

    let serverLogs = [
      '00:01:05 [BOOT] RazorAgent AI Core Engine Initialized.',
      '00:01:10 [API] GET /api/products?agent=true 200 (14ms)',
      '00:01:15 [AGENT] User prompt parsed: "College setup <60k"',
      '00:01:16 [TOOL] search_products(query="college laptop", maxPrice=60000)',
      '00:01:17 [TOOL] check_inventory(ids=[prod_03, prod_05, prod_07]) -> In Stock (52, 140, 90)',
      '00:01:18 [GATE] Explainable Permission Gate Activated. Awaiting approval.'
    ];

    let activeSimScenario = 'SUCCESS';

    function navigate(page) {
      document.querySelectorAll('.page-view').forEach(el => el.classList.add('hidden'));
      const target = document.getElementById('view-' + page);
      if (target) {
        target.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.getAttribute('data-page') === page) {
          btn.classList.add('bg-white/10', 'text-accent-amber', 'font-bold');
        } else {
          btn.classList.remove('bg-white/10', 'text-accent-amber', 'font-bold');
        }
      });
    }

    function renderCatalog(items) {
      const grid = document.getElementById('productGrid');
      if (!grid) return;
      grid.innerHTML = items.map(p => \`
        <div class="glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group">
          <div>
            <div class="aspect-video overflow-hidden bg-black/40">
              <img src="\${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
            </div>
            <div class="p-4 space-y-2">
              <div class="flex justify-between text-[11px] text-neutral-400">
                <span class="font-mono">\${p.brand}</span>
                <span class="text-accent-amber font-mono">\${p.rating} ★</span>
              </div>
              <h3 class="font-bold text-sm text-white line-clamp-1">\${p.name}</h3>
              <p class="text-xs text-neutral-400 line-clamp-2">\${p.desc}</p>
            </div>
          </div>
          <div class="p-4 pt-0 border-t border-white/5 flex items-center justify-between mt-3">
            <span class="font-extrabold text-white text-base">₹\${p.price.toLocaleString()}</span>
            <button onclick="addToCart('\${p.id}')" class="px-3 py-1.5 rounded-xl bg-accent-amber text-black font-bold text-xs hover:bg-accent-amber-light flex items-center space-x-1">
              <i class="fa-solid fa-cart-plus"></i><span>Add</span>
            </button>
          </div>
        </div>
      \`).join('');
    }

    function filterCatalog() {
      const q = (document.getElementById('shopSearchInput')?.value || '').toLowerCase();
      const budget = Number(document.getElementById('shopBudgetSlider')?.value || 250000);
      const filtered = PRODUCTS.filter(p => {
        const matchesQ = !q || p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q));
        const matchesB = p.price <= budget;
        return matchesQ && matchesB;
      });
      renderCatalog(filtered);
    }

    function updateBudgetFilter(val) {
      document.getElementById('budgetLabel').innerText = '₹' + Number(val).toLocaleString();
      filterCatalog();
    }

    function addToCart(productId, qty = 1) {
      const p = PRODUCTS.find(prod => prod.id === productId);
      if (!p) return;
      const existing = cart.items.find(i => i.productId === productId);
      if (existing) {
        existing.quantity += qty;
      } else {
        cart.items.push({ productId: p.id, product: p, quantity: qty });
      }
      recalculateCart();
      alert('Added ' + p.name + ' to cart!');
    }

    function recalculateCart() {
      let sub = 0;
      cart.items.forEach(i => sub += i.product.price * i.quantity);
      cart.subtotal = sub;
      let disc = 0;
      if (cart.couponCode === 'STUDENT10') disc = Math.round(sub * 0.1);
      cart.discount = disc;
      const taxable = Math.max(0, sub - disc);
      cart.tax = Math.round(taxable * 0.08);
      cart.shipping = sub > 2000 || sub === 0 ? 0 : 150;
      cart.total = taxable + cart.tax + cart.shipping;

      document.getElementById('cartBadge').innerText = cart.items.reduce((s, i) => s + i.quantity, 0);
      document.getElementById('summarySubtotal').innerText = '₹' + cart.subtotal.toLocaleString();
      document.getElementById('summaryDiscount').innerText = '-₹' + cart.discount.toLocaleString();
      document.getElementById('summaryTax').innerText = '₹' + cart.tax.toLocaleString();
      document.getElementById('summaryTotal').innerText = '₹' + cart.total.toLocaleString();
      document.getElementById('checkoutPayableAmount').innerText = '₹' + cart.total.toLocaleString();
      document.getElementById('modalPayable').innerText = '₹' + cart.total.toLocaleString();
      renderCartItems();
    }

    function renderCartItems() {
      const container = document.getElementById('cartItemsList');
      if (!container) return;
      if (cart.items.length === 0) {
        container.innerHTML = '<div class="glass-panel p-10 rounded-2xl text-center text-neutral-400">Cart is empty.</div>';
        return;
      }
      container.innerHTML = cart.items.map(i => \`
        <div class="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
          <div class="flex items-center space-x-3">
            <img src="\${i.product.image}" class="w-12 h-12 rounded-xl object-cover">
            <div>
              <h4 class="font-bold text-white">\${i.product.name}</h4>
              <p class="text-accent-amber font-mono">₹\${i.product.price.toLocaleString()} x \${i.quantity}</p>
            </div>
          </div>
          <span class="font-bold text-white font-mono">₹\${(i.product.price * i.quantity).toLocaleString()}</span>
        </div>
      \`).join('');
    }

    function applyCouponCode() {
      const code = document.getElementById('couponInput')?.value.toUpperCase();
      if (code === 'STUDENT10') {
        cart.couponCode = 'STUDENT10';
        recalculateCart();
        alert('Promo STUDENT10 Applied (10% OFF)!');
      }
    }

    function sendChatMessage(text) {
      navigate('ai');
      const thread = document.getElementById('chatMessageThread');
      if (!thread) return;

      thread.innerHTML += \`
        <div class="flex flex-col items-end">
          <div class="bg-accent-amber text-black font-semibold p-4 rounded-2xl max-w-xl shadow">
            \${text}
          </div>
        </div>
      \`;

      setTimeout(() => {
        if (text.includes('60000') || text.includes('college')) {
          cart.items = [
            { productId: 'prod_03', product: PRODUCTS.find(p => p.id === 'prod_03'), quantity: 1 },
            { productId: 'prod_05', product: PRODUCTS.find(p => p.id === 'prod_05'), quantity: 1 },
            { productId: 'prod_07', product: PRODUCTS.find(p => p.id === 'prod_07'), quantity: 1 }
          ];
          cart.couponCode = 'STUDENT10';
          recalculateCart();

          thread.innerHTML += \`
            <div class="flex flex-col items-start space-y-2">
              <div class="space-y-1 w-full max-w-xl font-mono text-[11px]">
                <div class="p-2 rounded-xl bg-surface border border-white/10 text-neutral-300">
                  <span class="text-accent-amber font-bold">search_products()</span> → Found 3 items
                </div>
                <div class="p-2 rounded-xl bg-surface border border-white/10 text-neutral-300">
                  <span class="text-accent-amber font-bold">check_inventory()</span> → In Stock (52, 140, 90)
                </div>
                <div class="p-2 rounded-xl bg-surface border border-white/10 text-neutral-300">
                  <span class="text-accent-amber font-bold">calculate_cart(STUDENT10)</span> → Verified Total: ₹53,846
                </div>
              </div>

              <div class="glass-panel p-5 rounded-2xl border border-white/10 max-w-2xl text-neutral-200 space-y-3">
                <p>I've assembled the <strong>Optimal College Productivity Setup</strong> under your ₹60,000 budget:</p>
                <ul class="list-disc pl-5 space-y-1 text-xs text-neutral-300">
                  <li><strong>RazorAgent SwiftAir 14" College Edition</strong> — ₹49,999</li>
                  <li><strong>AeroGlide Pro Silent Mouse</strong> — ₹2,499</li>
                  <li><strong>AcousticPure Flow ANC Headphones</strong> — ₹2,899</li>
                </ul>
                <div class="p-3 bg-black/40 rounded-xl font-mono text-xs text-emerald-400">
                  Verified Total: ₹53,846 (₹6,154 below ₹60k budget)
                </div>
                <div class="p-3.5 rounded-xl bg-accent-amber/10 border border-accent-amber/30 text-xs space-y-2">
                  <span class="font-bold text-accent-amber font-mono">🛡️ EXPLAINABLE ACTION GATE</span>
                  <p class="text-neutral-300">Bundle ready in cart. Explicit permission required before initiating Razorpay Sandbox.</p>
                  <button onclick="navigate('checkout')" class="px-4 py-2 rounded-xl bg-accent-amber text-black font-bold text-xs">
                    Approve & Proceed to Checkout →
                  </button>
                </div>
              </div>
            </div>
          \`;
        } else if (text.includes('3000') || text.includes('headphone')) {
          thread.innerHTML += \`
            <div class="flex flex-col items-start space-y-2">
              <div class="glass-panel p-5 rounded-2xl border border-white/10 max-w-2xl text-neutral-200 space-y-2">
                <h4 class="font-bold text-white">Top Pick under ₹3,000: AcousticPure Flow ANC (₹2,899)</h4>
                <p class="text-xs text-neutral-300">-35dB Hybrid Active Noise Cancelling, 55-hour battery life. (90 units in stock).</p>
                <button onclick="addToCart('prod_07')" class="px-4 py-2 rounded-xl bg-accent-amber text-black font-bold text-xs">
                  Add to Cart (₹2,899)
                </button>
              </div>
            </div>
          \`;
        } else {
          thread.innerHTML += \`
            <div class="flex flex-col items-start">
              <div class="glass-panel p-4 rounded-2xl border border-white/10 max-w-xl text-neutral-200">
                Queried catalog tools. Found matching items with live stock validation.
              </div>
            </div>
          \`;
        }
        thread.scrollTop = thread.scrollHeight;
      }, 500);
    }

    function handleChatSubmit(e) {
      e.preventDefault();
      const input = document.getElementById('chatInput');
      if (input && input.value.trim()) {
        sendChatMessage(input.value);
        input.value = '';
      }
    }

    function runScenarioCollegeSetup() {
      sendChatMessage('I need a productivity setup for college under 60000');
    }

    function toggleGateApproval(checked) {
      document.getElementById('payNowBtn').disabled = !checked;
    }

    function setSimScenario(mode) {
      activeSimScenario = mode;
      document.querySelectorAll('.sim-btn').forEach(btn => {
        if (btn.getAttribute('data-sim') === mode) {
          btn.classList.add('bg-accent-purple', 'text-white', 'font-bold');
        } else {
          btn.classList.remove('bg-accent-purple', 'text-white', 'font-bold');
        }
      });
    }

    function executeRazorpayPayment() {
      if (activeSimScenario === 'TIMEOUT') {
        alert('Controlled Failure Simulator: Timeout occurred. Idempotency token safely verified via webhook.');
        return;
      }
      document.getElementById('razorpayModal').classList.remove('hidden');
    }

    function closeRazorpayModal() {
      document.getElementById('razorpayModal').classList.add('hidden');
    }

    function confirmTestPaymentSuccess() {
      closeRazorpayModal();
      alert('Payment Verified! Razorpay Test Order Settled via HMAC Webhook.');
      auditLogs.unshift({
        auditId: 'AUD-2026-' + Math.floor(100000 + Math.random() * 900000),
        action: 'PAYMENT_CAPTURED_WEBHOOK',
        status: 'SUCCESS',
        amount: cart.total,
        gate: 'APPROVED'
      });
      renderAuditLogs();
      navigate('dashboard');
    }

    function renderAuditLogs() {
      const tbody = document.getElementById('auditTableBody');
      if (!tbody) return;
      tbody.innerHTML = auditLogs.map(l => \`
        <tr>
          <td class="p-3 text-accent-amber font-bold">\${l.auditId}</td>
          <td class="p-3 text-white font-bold">\${l.action}</td>
          <td class="p-3"><span class="px-2 py-0.5 rounded bg-accent-teal/20 text-accent-teal font-bold">\${l.status}</span></td>
          <td class="p-3 text-white">₹\${l.amount.toLocaleString()}</td>
          <td class="p-3 text-neutral-300">\${l.gate}</td>
        </tr>
      \`).join('');
    }

    function initHeroCanvas() {
      const canvas = document.getElementById('heroCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let w = (canvas.width = canvas.parentElement.clientWidth || 800);
      let h = (canvas.height = 420);

      const nodes = [
        { label: 'Buyer Intent', x: 0.12, y: 0.35, color: '#7C5CFF' },
        { label: 'AI Commerce Agent', x: 0.30, y: 0.65, color: '#F5A623' },
        { label: 'Merchant Catalog', x: 0.50, y: 0.25, color: '#20C997' },
        { label: 'Recommendation NPU', x: 0.65, y: 0.70, color: '#FFB84D' },
        { label: 'Autonomous Cart', x: 0.80, y: 0.35, color: '#7C5CFF' },
        { label: 'Razorpay Sandbox', x: 0.90, y: 0.65, color: '#20C997' }
      ];

      let t = 0;
      function render() {
        t += 0.02;
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < nodes.length - 1; i++) {
          const n1 = nodes[i];
          const n2 = nodes[i + 1];
          const x1 = n1.x * w;
          const y1 = n1.y * h + Math.sin(t + i) * 6;
          const x2 = n2.x * w;
          const y2 = n2.y * h + Math.sin(t + i + 1) * 6;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 2;
          ctx.stroke();

          const prog = (t * 0.2 + i * 0.3) % 1;
          const px = x1 + (x2 - x1) * prog;
          const py = y1 + (y2 - y1) * prog;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = n1.color;
          ctx.fill();
        }

        nodes.forEach((n, idx) => {
          const nx = n.x * w;
          const ny = n.y * h + Math.sin(t + idx) * 6;

          ctx.beginPath();
          ctx.arc(nx, ny, 10, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();
          ctx.font = '11px Poppins, sans-serif';
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, nx, ny + 24);
        });

        requestAnimationFrame(render);
      }
      render();
    }

    function openAgentJsonModal() {
      document.getElementById('agentJsonContent').innerText = JSON.stringify({
        schema: 'RazorAgent-Agent-Catalog-v1',
        totalItems: PRODUCTS.length,
        items: PRODUCTS
      }, null, 2);
      document.getElementById('agentJsonModal').classList.remove('hidden');
    }
    function closeAgentJsonModal() {
      document.getElementById('agentJsonModal').classList.add('hidden');
    }

    function toggleNexaAssistant() {
      document.getElementById('nexaFloatingWindow').classList.toggle('hidden');
    }
    function sendFloatNexaMsg() {
      const inp = document.getElementById('nexaFloatInput');
      if (inp && inp.value.trim()) {
        const chat = document.getElementById('nexaFloatingChat');
        chat.innerHTML += '<p class="p-2 rounded-xl bg-accent-amber text-black font-semibold text-right">' + inp.value + '</p>';
        setTimeout(() => {
          chat.innerHTML += '<p class="p-2 rounded-xl bg-surface border border-white/10">Nexa queried the catalog API and confirmed verified status!</p>';
        }, 500);
        inp.value = '';
      }
    }

    function toggleCommandPalette() {
      document.getElementById('cmdPaletteModal').classList.toggle('hidden');
    }

    function toggleTheme() {
      document.documentElement.classList.toggle('light');
    }

    window.addEventListener('DOMContentLoaded', () => {
      renderCatalog(PRODUCTS);
      recalculateCart();
      renderAuditLogs();
      initHeroCanvas();

      const liveList = document.getElementById('liveStreamList');
      if (liveList) {
        liveList.innerHTML = \`
          <div class="flex justify-between items-center p-3 rounded-2xl bg-surface/60 text-xs">
            <span class="font-mono text-neutral-400">00:01:12</span>
            <span class="font-mono font-bold text-accent-teal">PAYMENT CAPTURED</span>
            <span class="text-white">Order NEX-ORD-98210 settled via Razorpay Sandbox (UPI)</span>
            <span class="font-bold text-white font-mono">₹53,846</span>
          </div>
          <div class="flex justify-between items-center p-3 rounded-2xl bg-surface/60 text-xs">
            <span class="font-mono text-neutral-400">00:01:05</span>
            <span class="font-mono font-bold text-accent-amber">AI BUNDLE ASSEMBLED</span>
            <span class="text-white">SwiftAir 14" + AeroGlide Mouse + AcousticPure Flow (STUDENT10)</span>
            <span class="font-bold text-accent-amber font-mono">Explainable</span>
          </div>
        \`;
      }

      const term = document.getElementById('liveTerminalOutput');
      if (term) term.innerHTML = serverLogs.map(l => '<p>' + l + '</p>').join('');
      const fullTerm = document.getElementById('serverLogFullStream');
      if (fullTerm) fullTerm.innerHTML = serverLogs.map(l => '<p>' + l + '</p>').join('');

      const catContainer = document.getElementById('categoryFilterList');
      if (catContainer) {
        catContainer.innerHTML = CATEGORIES.map(c => \`
          <button onclick="renderCatalog(PRODUCTS)" class="w-full text-left px-3 py-1.5 rounded-xl text-neutral-300 hover:bg-white/5 hover:text-white">
            \${c.name}
          </button>
        \`).join('');
      }

      const tracker = document.getElementById('pipelineTrackerList');
      if (tracker) {
        tracker.innerHTML = [
          '1. Buyer Intent: College setup <60k',
          '2. Catalog Search: SwiftAir 14" matched',
          '3. Inventory Checked: 52 in stock',
          '4. Peripherals Bundled: Mouse + ANC Headphones',
          '5. Cart Pricing: Promo STUDENT10 (₹53,846)',
          '6. Explainable Gate: Buyer Explicit Consent',
          '7. Razorpay Sandbox: Payment Captured'
        ].map(s => '<div class="p-2.5 rounded-xl bg-surface border border-white/5 font-mono text-white">' + s + '</div>').join('');
      }
    });

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      } else if (e.key === 'Escape') {
        document.getElementById('cmdPaletteModal')?.classList.add('hidden');
        document.getElementById('agentJsonModal')?.classList.add('hidden');
        document.getElementById('razorpayModal')?.classList.add('hidden');
      }
    });
  </script>
</body>
</html>
\`;

fs.writeFileSync('index.html', htmlContent, 'utf8');
fs.writeFileSync('standalone.html', htmlContent, 'utf8');
fs.writeFileSync('public/index.html', htmlContent, 'utf8');
console.log('Successfully generated standalone index.html, standalone.html, and public/index.html');
