"use client";

import { useEffect, useRef } from "react";

const WEEKS_IN_YEAR = 52;
const MAX_AGE = 90;
const CELL_SIZE = 12;
const CELL_PADDING = 1;

const GRID_WIDTH = WEEKS_IN_YEAR * (CELL_SIZE + CELL_PADDING);
const GRID_HEIGHT = MAX_AGE * (CELL_SIZE + CELL_PADDING);

const FILLED_COLOR = "#4CAF50";
const EMPTY_COLOR = "#E5E7EB";
const TEXT_COLOR = "#ffffff";

interface LifeCalendarProps {
  filledWeeks: number;
}

export default function LifeCalendar({ filledWeeks }: LifeCalendarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topLabelRef = useRef<HTMLCanvasElement>(null);
  const sideLabelRef = useRef<HTMLCanvasElement>(null);

  // Function for high DPI support
  function scaleCanvas(
    canvas: HTMLCanvasElement,
    width: number,
    height: number
  ) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    return ctx;
  }

  // Main grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = scaleCanvas(canvas, GRID_WIDTH, GRID_HEIGHT);
    if (!ctx) return;

    for (let y = 0; y < MAX_AGE; y++) {
      for (let x = 0; x < WEEKS_IN_YEAR; x++) {
        const weekIndex = y * WEEKS_IN_YEAR + x;
        ctx.fillStyle = weekIndex < filledWeeks ? FILLED_COLOR : EMPTY_COLOR;
        ctx.fillRect(
          x * (CELL_SIZE + CELL_PADDING),
          y * (CELL_SIZE + CELL_PADDING),
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }
  }, [filledWeeks]);

  // Top labels (weeks)
  useEffect(() => {
    const canvas = topLabelRef.current;
    if (!canvas) return;
    const ctx = scaleCanvas(canvas, GRID_WIDTH, 24);
    if (!ctx) return;

    ctx.font = "10px sans-serif";
    ctx.fillStyle = TEXT_COLOR;
    ctx.textAlign = "center";

    for (let x = 0; x < WEEKS_IN_YEAR; x++) {
      const week = x + 1;
      const xPos = x * (CELL_SIZE + CELL_PADDING) + CELL_SIZE / 2;
      if (week % 5 === 0 || week === 1 || week === 52) {
        ctx.fillText(week.toString(), xPos, 14);
      }
    }
  }, []);

  // Side labels (age) — from top to bottom, vertical text
  useEffect(() => {
    const canvas = sideLabelRef.current;
    if (!canvas) return;
    const width = 40;
    const ctx = scaleCanvas(canvas, width, GRID_HEIGHT);
    if (!ctx) return;

    ctx.font = "10px sans-serif";
    ctx.fillStyle = TEXT_COLOR;
    ctx.textAlign = "right";

    for (let y = 0; y < MAX_AGE; y++) {
      const age = y;
      const yPos = y * (CELL_SIZE + CELL_PADDING) + CELL_SIZE;
      if (age % 5 === 0 || age === 0 || age === MAX_AGE - 1) {
        ctx.fillText(age.toString(), width - 2, yPos);
      }
    }
  }, []);

  return (
    <div className="overflow-auto flex flex-col items-start">
      <div className="mt-2 text-sm text-white font-medium ml-[40px]">
        Недели года
      </div>

      <div className="ml-[40px] text-white">
        <canvas ref={topLabelRef} />
      </div>

      <div className="flex items-start">
        <canvas ref={sideLabelRef} />

        <canvas ref={canvasRef} className="bg-white shadow rounded" />
      </div>

      <div className="mt-2 text-sm text-white font-medium ml-[40px]">
        Возраст (лет)
      </div>
    </div>
  );
}
