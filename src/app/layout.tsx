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
  title: { default: "SIPES Paints — Ask for the right paint", template: "%s · SIPES Paints" },
  description:
    "Interior, exterior, decorative and wood-care paints from SIPES. Ask the SIPES assistant by voice or text and go straight to the right product.",
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
