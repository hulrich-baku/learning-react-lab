import { useEffect, useState, useRef } from "react";
import { type CandlestickData, type Time } from "lightweight-charts";
import { type DerivResponse } from "../types/trading"; // Ajuste le chemin si besoin

const DERIV_WS_URL = "wss://ws.binaryws.com/websockets/v3?app_id=1089";

export const useTradingSocket = (symbol: string) => {
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const [history, setHistory] = useState<CandlestickData<Time>[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(DERIV_WS_URL);

    socketRef.current.onopen = () => {
      console.log("🔌 Connecté à Deriv");

      const historyReq = {
        ticks_history: symbol,
        adjust_start_time: 1,
        end: "latest",
        count: 100,
        granularity: 60,
        style: "candles",
        passthrough: { type: "FETCH_HISTORY" },
      };

      socketRef.current?.send(JSON.stringify(historyReq));
    };

    socketRef.current.onmessage = (event: MessageEvent) => {
      const data: DerivResponse = JSON.parse(event.data);

      if (data.error) {
        console.error("❌ Erreur Deriv:", data.error.message);
        return;
      }

      // 1. Traitement de l'historique
      if (data.passthrough?.type === "FETCH_HISTORY" && data.candles) {
        const formatted: CandlestickData<Time>[] = data.candles.map((c) => ({
          time: c.epoch as Time,
          // Deriv peut envoyer des strings, parseFloat sécurise le tout
          open: typeof c.open === "string" ? parseFloat(c.open) : c.open,
          high: typeof c.high === "string" ? parseFloat(c.high) : c.high,
          low: typeof c.low === "string" ? parseFloat(c.low) : c.low,
          close: typeof c.close === "string" ? parseFloat(c.close) : c.close,
        }));

        setHistory(formatted);

        // 2. Abonnement au flux après réception de l'historique
        const subscribeReq = {
          ticks: symbol,
          subscribe: 1,
        };
        socketRef.current?.send(JSON.stringify(subscribeReq));
      }

      // 3. Traitement du flux temps réel
      if (data.msg_type === "tick" && data.tick) {
        setLastPrice(data.tick.quote);
      }
    };

    return () => {
      socketRef.current?.close();
    };
  }, [symbol]);

  return { lastPrice, history };
};
