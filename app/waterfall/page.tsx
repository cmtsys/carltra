import type { Metadata } from "next";
import Waterfall from "../components/Waterfall";

export const metadata: Metadata = {
  title: "Waterfall | Carl Traberg",
  description: "Side projects, strange ideas and experiments. A little further down, something different.",
};

export default function WaterfallPage() {
  return <Waterfall />;
}
