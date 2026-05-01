// src/logic/indicators.ts
import { type CandlestickData, type Time, type WhitespaceData } from "lightweight-charts";

export const calculateSMA = (
  data: CandlestickData<Time>[], 
  period: number 
): (CandlestickData<Time> | WhitespaceData<Time>)[] => {
  const smaData = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      // Pas assez de données pour calculer la moyenne sur cette période
      continue;
    }

    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j].close;
    }

    smaData.push({
      time: data[i].time,
      value: sum / period,
    });
  }

  return smaData;
};