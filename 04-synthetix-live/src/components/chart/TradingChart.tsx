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
import { type Timeframe, TIMEFRAME_MAP } from "../../types/trading";

interface TradingChartPropos {
  symbol: string;
  timeframe: Timeframe;
  changeTimeframe: (tf: Timeframe) => void;
}

const TradingChart = ({
  symbol,
  timeframe,
  changeTimeframe,
}: TradingChartPropos) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const currentCandleRef = useRef<CandlestickData<Time> | null>(null);

  // Le hook se relance automatiquement quand 'symbol' ou 'timeframe' change
  const { lastPrice, history } = useTradingSocket(symbol, timeframe);

  // 1. Initialisation et reset du graphique lors du changement de symbole/timeframe
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
      },
      width: containerRef.current.clientWidth,
      height: 450,
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
  }, [symbol, timeframe]); // On recrée le chart proprement au changement d'unité

  // 2. Injection de l'historique
  useEffect(() => {
    if (history && history.length > 0 && seriesRef.current) {
      seriesRef.current.setData(history);
      currentCandleRef.current = history[history.length - 1];
      chartRef.current?.timeScale().fitContent();
    }
  }, [history]);

  // 3. Transformation : Tick -> Candle avec granularité dynamique
  useEffect(() => {
    if (!lastPrice || !seriesRef.current) return;

    const now = Math.floor(Date.now() / 1000);
    // Calcul de l'ouverture de la bougie basé sur le timeframe actuel
    const seconds = TIMEFRAME_MAP[timeframe];
    const candleTime = (now - (now % seconds)) as Time;

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
  }, [lastPrice, timeframe]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-[#0b0e11] rounded-2xl border border-slate-800 p-2 shadow-2xl overflow-hidden">
        {/* Barre d'outils du graphique */}
        <div className="flex justify-between items-center mb-4 px-4 pt-2">
          <div className="flex items-center gap-4">
            <span className="text-cyan-400 font-bold tracking-wider">
              {symbol}
            </span>

            {/* Sélecteur de Timeframes */}
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
              {(Object.keys(TIMEFRAME_MAP) as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => changeTimeframe(tf)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    timeframe === tf
                      ? "bg-cyan-600 text-white shadow-lg"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:inline text-2xl font-mono text-white tabular-nums">
            {lastPrice?.toFixed(2) ?? "---"}
          </div>
        </div>

        <div ref={containerRef} className="w-full" />
      </div>
    </div>
  );
};

export default TradingChart;
