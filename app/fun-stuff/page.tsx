import type { Metadata } from "next";
import FunStuff from "../components/FunStuff";

export const metadata: Metadata = {
  title: "Fun stuff | Carl Traberg",
  description: "Side projects, strange ideas and experiments. A little further down, something different.",
};

export default function FunStuffPage() {
  return <FunStuff />;
}
