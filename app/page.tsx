import { Metadata } from "next";
import LifeCalendarApp from "@/src/processes/LifeCalendarApp";
export default function Home() {
  return (
    <div>
      <LifeCalendarApp />
    </div>
  );
}

export const metadata: Metadata = {
  title: "The game of life",
  description: "The game of life description",
};
