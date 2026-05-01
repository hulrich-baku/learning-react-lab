import { useRef, useEffect } from "react";
import {
  type CandlestickData,
  type IChartApi,
  type ISeriesApi,
  type Time,
  CandlestickSeries,
  ColorType,
  createChart,
  LineSeries,
} from "lightweight-charts";
import { useTradingSocket } from "../../hooks/useTradingSocket";
import { type Asset, type Timeframe, TIMEFRAME_MAP } from "../../types/trading";
import { calculateSMA } from "../../logic/indicator";

interface TradingChartProps {
  actif: Asset;
  timeframe: Timeframe;
  changeTimeframe: (tf: Timeframe) => void;
}

const TradingChart = ({
  actif,
  timeframe,
  changeTimeframe,
}: TradingChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const smaSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const currentCandleRef = useRef<CandlestickData<Time> | null>(null);
  const prevPriceRef = useRef<number | null>(null);

  const { lastPrice, history, connected } = useTradingSocket(actif, timeframe);

  // 1. INITIALISATION DU GRAPHIQUE
  // On le recrée si l'actif ou le timeframe change pour garantir une échelle propre
  useEffect(() => {
    if (!containerRef.current) return;

    // Nettoyage de sécurité du container
    containerRef.current.innerHTML = "";

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#000000" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#1A1A1A" },
        horzLines: { color: "#1A1A1A" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: "#334155",
        barSpacing: 10,
        rightOffset: 12,
      },
      rightPriceScale: {
        borderColor: "#334155",
        autoScale: true,
        scaleMargins: { top: 0.1, bottom: 0.2 },
      },
      width: containerRef.current.clientWidth,
      height: 500, // Hauteur fixe par défaut
    });

    const smaSeries = chart.addSeries(LineSeries, {
      color: "#2962FF",
      lineWidth: 2,
      title: "SMA 20",
      priceLineVisible: false,
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    smaSeriesRef.current = smaSeries;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length || !chartRef.current) return;
      const { width, height } = entries[0].contentRect;
      if (height > 0) {
        chartRef.current.applyOptions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [actif.symbol, timeframe]); // Crucial : recrée le chart sur ces changements

  // 2. INJECTION DES DONNÉES (Historique)
  useEffect(() => {
    if (
      history &&
      history.length > 0 &&
      candleSeriesRef.current &&
      smaSeriesRef.current &&
      chartRef.current
    ) {
      // Injection
      candleSeriesRef.current.setData(history);
      currentCandleRef.current = history[history.length - 1];

      const smaData = history.length >= 20 ? calculateSMA(history, 20) : [];
      smaSeriesRef.current.setData(smaData as any);

      // Force le cadrage après injection
      requestAnimationFrame(() => {
        if (!chartRef.current) return;
        const timeScale = chartRef.current.timeScale();
        const lastIndex = history.length - 1;
        const barsToShow = Math.min(history.length, 80);

        timeScale.setVisibleLogicalRange({
          from: lastIndex - barsToShow,
          to: lastIndex + 5,
        });
      });
    }
  }, [history]);

  // 3. TEMPS RÉEL
  useEffect(() => {
    if (!lastPrice || !candleSeriesRef.current || !smaSeriesRef.current) return;

    const now = Math.floor(Date.now() / 1000);
    const seconds = TIMEFRAME_MAP[timeframe];
    const candleTime = (now - (now % seconds)) as Time;
    const currentCandle = currentCandleRef.current;

    let updatedCandle: CandlestickData<Time>;

    if (!currentCandle || currentCandle.time !== candleTime) {
      updatedCandle = {
        time: candleTime,
        open: lastPrice,
        high: lastPrice,
        low: lastPrice,
        close: lastPrice,
      };
    } else {
      updatedCandle = {
        ...currentCandle,
        high: Math.max(currentCandle.high, lastPrice),
        low: Math.min(currentCandle.low, lastPrice),
        close: lastPrice,
      };
    }

    currentCandleRef.current = updatedCandle;
    candleSeriesRef.current.update(updatedCandle);

    if (history && history.length >= 20) {
      const dataForSMA = [...history.slice(-19), updatedCandle];
      const latestSMA = calculateSMA(dataForSMA, 20);
      if (latestSMA.length > 0) {
        smaSeriesRef.current.update(latestSMA[latestSMA.length - 1] as any);
      }
    }
  }, [lastPrice]);

  // 4. LOGIQUE PRIX (COULEUR)
  const getPriceColor = () => {
    if (!lastPrice || prevPriceRef.current === null) return "text-white";
    return lastPrice > prevPriceRef.current ? "text-green-400" : lastPrice < prevPriceRef.current ? "text-red-400" : "text-white";
  };

  useEffect(() => {
    if (lastPrice !== null) {
      const timeout = setTimeout(() => {
        prevPriceRef.current = lastPrice;
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [lastPrice]);

  return (
    <div className="flex flex-col h-full w-full bg-[#050505] overflow-hidden">
      {/* TOOLBAR */}
      <div className="flex flex-wrap justify-between items-center p-3 border-b border-slate-800/50 bg-[#0b0e11]">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-cyan-500 font-black text-sm tracking-tighter uppercase">
              {actif.label}
            </span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
              <span className="text-[10px] text-slate-500 font-mono uppercase">Live Feed</span>
            </div>
          </div>

          <div className="flex bg-black/40 rounded-md p-1 border border-slate-800">
            {(Object.keys(TIMEFRAME_MAP) as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => changeTimeframe(tf)}
                className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${
                  timeframe === tf ? "bg-slate-800 text-cyan-400 shadow-inner" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className={`text-xl font-mono font-bold tabular-nums transition-colors duration-200 ${getPriceColor()}`}>
          {lastPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? "---"}
        </div>
      </div>

      {/* CHART AREA */}
      <div className="flex-1 w-full relative">
        {!history || history.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-cyan-500 font-mono text-xs animate-pulse">SYNCHRONISATION {actif.label}...</p>
          </div>
        ) : null}
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default TradingChart;