import type { Metadata } from "next";
import Archive from "../components/Archive";

export const metadata: Metadata = {
  title: "Fun stuff | Carl Traberg",
  description: "Side projects, strange ideas and things I wanted to try.",
};

export default function ArchivePage() {
  return <Archive />;
}
