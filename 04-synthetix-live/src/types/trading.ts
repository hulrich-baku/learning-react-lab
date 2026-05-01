// import { type Time } from 'lightweight-charts';

export interface Tick {
  symbol: string;
  ask: number;
  bid: number;
  quote: number;
  epoch: number;
}


export type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';

export const TIMEFRAME_MAP: Record<Timeframe, number> = {
  '1m': 60,
  '5m': 300,
  '15m': 900,
  '1h': 3600,
  '4h': 14400,
  '1d': 86400,
};

// export interface Candle {
//   time: Time; // Time de 'lightweight-charts'
//   open: number;
//   high: number;
//   low: number;
//   close: number;
// }

// Format brut reçu de l'API Deriv pour une bougie
interface DerivRawCandle {
  epoch: number;
  open: string | number;
  high: string | number;
  low: string | number;
  close: string | number;
}

export interface DerivResponse {
  msg_type: "tick" | "history" | "ohlc";
  // Deriv renvoie 'candles' lors d'une requête 'ticks_history'
  candles?: DerivRawCandle[];
  tick?: {
    symbol: string;
    quote: number;
    epoch: number;
  };
  ohlc?: {
    open: string;
    high: string;
    low: string;
    close: string;
    epoch: number;
  };
  // Pour identifier nos requêtes
  passthrough?: {
    type: string;
  };
  error?: {
    message: string;
    code: string;
  };
}

export interface Asset {
  label: string;     // Nom affiché (ex: "Vol 100")
  symbol: string;    // Symbole Deriv (ex: "R_100")
  category: string;  // Pour grouper (Volatility, Boom/Crash)
}

export const ASSETS_CONFIG: Asset[] = [
  // --- VOLATILITY INDICES ---
  { label: "Volatility 10", symbol: "R_10", category: "Volatility" },
  { label: "Volatility 25", symbol: "R_25", category: "Volatility" },
  { label: "Volatility 50", symbol: "R_50", category: "Volatility" },
  { label: "Volatility 75", symbol: "R_75", category: "Volatility" },
  { label: "Volatility 100", symbol: "R_100", category: "Volatility" },
  { label: "Volatility 10 (1s)", symbol: "1HZ10V", category: "Volatility" },
  { label: "Volatility 100 (1s)", symbol: "1HZ100V", category: "Volatility" },

  // --- CRASH & BOOM ---
  // { label: "Boom 300", symbol: "BOOM300", category: "Crash Boom Index" },
  // { label: "Boom 500", symbol: "AVG500", category: "Crash Boom Index" },
  // { label: "Boom 1000", symbol: "AVG1000", category: "Crash Boom Index" },
  // { label: "Crash 300", symbol: "CRASH300", category: "Crash Boom Index" },
  // { label: "Crash 500", symbol: "DDB500", category: "Crash Boom Index" },
  // { label: "Crash 1000", symbol: "DDB1000", category: "Crash Boom Index" },

  // --- STEP INDICES ---
  // { label: "Step Index", symbol: "STEP", category: "Step Index" },
  // { label: "Step 200", symbol: "STEP200", category: "Step Index" },
  // { label: "Step 500", symbol: "STEP500", category: "Step Index" },

  // --- JUMP INDICES ---
  { label: "Jump 10", symbol: "JD10", category: "Jump Index" },
  { label: "Jump 25", symbol: "JD25", category: "Jump Index" },
  { label: "Jump 50", symbol: "JD50", category: "Jump Index" },
  { label: "Jump 75", symbol: "JD75", category: "Jump Index" },
  { label: "Jump 100", symbol: "JD100", category: "Jump Index" }
];