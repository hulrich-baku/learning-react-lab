// import { type Time } from 'lightweight-charts';

export interface Tick {
  symbol: string;
  ask: number;
  bid: number;
  quote: number;
  epoch: number;
}

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
