"use client";

import { useState } from "react";
import { Input } from "@/src/shared/ui/input";
import { Button } from "@/src/shared/ui/button";
import { Label } from "@/src/shared/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";

interface LifeCalendarFormProps {
  onSubmit: (weeks: number, age: number) => void;
}

export default function LifeCalendarForm({ onSubmit }: LifeCalendarFormProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const birthdate = createDate(day, month, year);
    if (!birthdate) return;

    const weeks = calculateWeeksLived(birthdate);
    const age = calculateAge(birthdate);
    onSubmit(weeks, age);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Твоя дата рождения</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="day">День</Label>
              <Input
                id="day"
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="01"
                required
              />
            </div>
            <div>
              <Label htmlFor="month">Месяц</Label>
              <Input
                id="month"
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="12"
                required
              />
            </div>
            <div>
              <Label htmlFor="year">Год</Label>
              <Input
                id="year"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="1990"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Показать календарь
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function createDate(day: string, month: string, year: string): Date | null {
  const d = Number(day);
  const m = Number(month) - 1;
  const y = Number(year);
  const date = new Date(y, m, d);
  return isNaN(date.getTime()) ? null : date;
}

function calculateWeeksLived(birthdate: Date): number {
  const now = new Date();
  const diff = now.getTime() - birthdate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
}

function calculateAge(birthdate: Date): number {
  const now = new Date();
  let age = now.getFullYear() - birthdate.getFullYear();
  const hasBirthdayPassed =
    now.getMonth() > birthdate.getMonth() ||
    (now.getMonth() === birthdate.getMonth() &&
      now.getDate() >= birthdate.getDate());
  if (!hasBirthdayPassed) age--;
  return age;
}