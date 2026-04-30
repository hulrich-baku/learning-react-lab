import { useRef, useEffect } from "react";
import {
  type CandlestickData,
  type IChartApi,
  type ISeriesApi,
  type Time,
  CandlestickSeries,
  ColorType,
  createChart,
} from "lightweight-charts";
import { useTradingSocket } from "../../hooks/useTradingSocket";

interface TradingChartPropos {
  symbol: string;
}

const TradingChart = ({ symbol }: TradingChartPropos) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const currentCandleRef = useRef<CandlestickData<Time> | null>(null);

  const { lastPrice, history } = useTradingSocket(symbol);

  // 1. Initialisation unique du graphique
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#050505" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#1A1A1A" },
        horzLines: { color: "#1A1A1A" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        fixLeftEdge: true, // Aide à stabiliser l'historique
      },
      width: containerRef.current.clientWidth,
      height: 400,
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    seriesRef.current = candleSeries;
    chartRef.current = chart;

    // SI l'historique est déjà chargé lors du montage (ex: changement de symbole)
    if (history && history.length > 0) {
      candleSeries.setData(history);
      currentCandleRef.current = history[history.length - 1];
    }

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [symbol]);

  // 2. Injection de l'historique quand il arrive via le WebSocket
  useEffect(() => {
    if (history && history.length > 0 && seriesRef.current) {
      seriesRef.current.setData(history);
      currentCandleRef.current = history[history.length - 1];

      // Ajuste la vue pour voir tout l'historique
      chartRef.current?.timeScale().fitContent();
    }
  }, [history]);

  // 3. Transformation : Tick -> Candle (OHLC)
  useEffect(() => {
    if (!lastPrice || !seriesRef.current) return;

    const now = Math.floor(Date.now() / 1000);
    const candleTime = (now - (now % 60)) as Time;

    const currentCandle = currentCandleRef.current;

    if (!currentCandle || currentCandle.time !== candleTime) {
      const newCandle: CandlestickData<Time> = {
        time: candleTime,
        open: lastPrice,
        high: lastPrice,
        low: lastPrice,
        close: lastPrice,
      };
      currentCandleRef.current = newCandle;
      seriesRef.current.update(newCandle);
    } else {
      const updatedCandle: CandlestickData<Time> = {
        ...currentCandle,
        high: Math.max(currentCandle.high, lastPrice),
        low: Math.min(currentCandle.low, lastPrice),
        close: lastPrice,
      };
      currentCandleRef.current = updatedCandle;
      seriesRef.current.update(updatedCandle);
    }
  }, [lastPrice]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-[#0b0e11] rounded-2xl border border-slate-800 p-2 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-4 px-4 pt-2">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-bold tracking-wider">
              {symbol}
            </span>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
              1m
            </span>
          </div>
          <div className="text-2xl font-mono text-white tabular-nums">
            {lastPrice?.toFixed(2) ?? "---"}
          </div>
        </div>
        <div ref={containerRef} className="w-full" />
      </div>
    </div>
  );
};

export default TradingChart;
