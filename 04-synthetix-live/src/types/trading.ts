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
