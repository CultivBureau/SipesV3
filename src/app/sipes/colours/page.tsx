import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ColourBrowser } from "./ColourBrowser";

export const metadata: Metadata = { title: "Colour catalogue" };

export default function ColoursPage() {
  return (
    <>
      <PageHeader
        eyebrow="Si-PRO colour catalogue"
        title="Pick a colour, see it on a wall."
        lead="SIPES colour centres tint more than 900 tones. Browse the five families here, preview a shade in a room, then confirm it with a physical sample under your own light."
      />
      <ColourBrowser />
    </>
  );
}
