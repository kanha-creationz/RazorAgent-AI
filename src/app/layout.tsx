import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { FloatingNexaAssistant } from '@/components/agent/FloatingNexaAssistant';

export const metadata: Metadata = {
  title: 'RazorAgent AI — Outgrow Ordinary. Autonomous AI Commerce powered by Razorpay.',
  description: 'Production-style AI Agentic Commerce platform with agent-readable catalog, explainable money gates, and Razorpay sandbox payments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" data-theme="light">
      <body className="min-h-screen flex flex-col bg-background text-text-primary antialiased bg-grid-pattern">
        <Navbar />
        <CommandPalette />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <FloatingNexaAssistant />
        <Footer />
      </body>
    </html>
  );
}
