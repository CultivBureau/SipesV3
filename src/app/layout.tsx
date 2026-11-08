import type { Metadata } from "next";
import { Unbounded, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AgentProvider } from "@/components/agent/AgentProvider";
import { AgentDock } from "@/components/agent/AgentDock";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const display = Unbounded({ variable: "--font-display-face", subsets: ["latin"], weight: ["500", "600", "700", "900"] });
const body = Instrument_Sans({ variable: "--font-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono-face", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { default: "UBMC Group — paints, coatings & construction chemicals", template: "%s · UBMC Group" },
  description:
    "UBMC Group: SIPES, SiTech Coatings, Transocean Coatings, PerBuild, Swift Paints and UBMC Color Center. Ask Mr. SIPES by voice or text and go straight to the right brand or product.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <AgentProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <AgentDock />
        </AgentProvider>
      </body>
    </html>
  );
}
