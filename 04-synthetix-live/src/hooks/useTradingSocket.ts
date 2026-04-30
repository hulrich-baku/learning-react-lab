import { useEffect, useState, useRef } from "react";
import { type CandlestickData, type Time } from "lightweight-charts";
import {
  TIMEFRAME_MAP,
  type DerivResponse,
  type Timeframe,
} from "../types/trading";

const DERIV_WS_URL = "wss://ws.binaryws.com/websockets/v3?app_id=1089";

export const useTradingSocket = (symbol: string, timeframe: Timeframe) => {
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const [history, setHistory] = useState<CandlestickData<Time>[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const granularity = TIMEFRAME_MAP[timeframe];

  useEffect(() => {
    let isComponentMounted = true;

    const connect = () => {
      // Nettoyage préalable si une socket existe déjà
      if (socketRef.current) {
        socketRef.current.close();
      }

      console.log(`🔌 Tentative de connexion pour ${symbol}...`);
      const ws = new WebSocket(DERIV_WS_URL);
      socketRef.current = ws;

      ws.onopen = () => {
        if (!isComponentMounted) return;
        setConnected(true);

        const historyReq = {
          ticks_history: symbol,
          adjust_start_time: 1,
          end: "latest",
          count: 100,
          granularity,
          style: "candles",
          passthrough: { type: "FETCH_HISTORY" },
        };
        ws.send(JSON.stringify(historyReq));
      };

      ws.onmessage = (event: MessageEvent) => {
        if (!isComponentMounted) return;
        const data: DerivResponse = JSON.parse(event.data);

        if (data.error) {
          console.error("❌ Erreur Deriv:", data.error.message);
          return;
        }

        if (data.passthrough?.type === "FETCH_HISTORY" && data.candles) {
          const formatted: CandlestickData<Time>[] = data.candles.map((c) => ({
            time: c.epoch as Time,
            open: typeof c.open === "string" ? parseFloat(c.open) : c.open,
            high: typeof c.high === "string" ? parseFloat(c.high) : c.high,
            low: typeof c.low === "string" ? parseFloat(c.low) : c.low,
            close: typeof c.close === "string" ? parseFloat(c.close) : c.close,
          }));
          setHistory(formatted);

          ws.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
        }

        if (data.msg_type === "tick" && data.tick) {
          setLastPrice(data.tick.quote);
        }
      };

      ws.onclose = () => {
        if (!isComponentMounted) return;
        setConnected(false);
        console.warn("⚠️ Connexion perdue. Reconnexion dans 3s...");
        
        // On planifie la reconnexion
        reconnectTimeoutRef.current = setTimeout(() => {
          if (isComponentMounted) connect();
        }, 3000);
      };

      ws.onerror = (err) => {
        console.error("❌ Erreur Socket:", err);
        ws.close(); // Déclenchera le onclose et donc la reconnexion
      };
    };

    connect();

    return () => {
      isComponentMounted = false;
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (socketRef.current) socketRef.current.close();
    };
  }, [symbol, timeframe]); // Se relance proprement si l'un des deux change

  return { lastPrice, history, connected };
};