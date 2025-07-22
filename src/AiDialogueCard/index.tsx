"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/src/shared/ui/card";
import { Button } from "@/src/shared/ui/button";

interface AiDialogueCardProps {
  filledWeeks: number;
  age: number;
}

const options = [
  "Да, я доволен своим путём",
  "Нет, я упустил многое",
  "Я только в начале",
  "Хочу всё изменить",
];

export default function AiDialogueCard({ filledWeeks, age }: AiDialogueCardProps) {
  const prompt = generatePrompt(filledWeeks, age);

  const handleOptionClick = (text: string) => {
    console.log("Выбранный вариант:", text);
    // позже здесь будет запрос к GPT
  };

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>🧠 ИИ спрашивает</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{prompt}</p>
        <div className="flex flex-col gap-3">
          {options.map((text, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start"
              onClick={() => handleOptionClick(text)}
            >
              {text}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function generatePrompt(weeks: number, age: number) {
  const percent = Math.floor((weeks / (90 * 52)) * 100);
  return `Ты прожил уже ${weeks} недель. Тебе ${age} лет. Это больше, чем у ${percent}% людей на Земле. Успел ли ты сделать то, что мечтал в ${age}?`;
}