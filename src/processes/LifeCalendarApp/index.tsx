"use client";

import { useState } from "react";
import LifeCalendar from "@/src/LifeCalendar";
import LifeCalendarForm from "@/src/features/LifeCalendarForm";
import AiDialogueCard from "@/src/AiDialogueCard";

export default function LifeCalendarApp() {
  const [weeksLived, setWeeksLived] = useState(0);
  const [age, setAge] = useState(0);

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <LifeCalendarForm
            onSubmit={(weeks, age) => {
              setWeeksLived(weeks);
              setAge(age);
            }}
          />
          {weeksLived > 0 && <AiDialogueCard filledWeeks={weeksLived} age={age} />}
        </div>

        <div className="lg:col-span-7">
          {weeksLived > 0 && <LifeCalendar filledWeeks={weeksLived} />}
        </div>
      </div>
    </main>
  );
}