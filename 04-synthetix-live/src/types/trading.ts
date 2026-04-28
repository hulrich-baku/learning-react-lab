export interface Tick {
  symbol: string;
  ask: number;
  bid: number;
  quote: number;
  epoch: number;
}

export interface Candle {
  time: number; // Timestamp (Unix)
  open: number;
  high: number;
  low: number;
  close: number;
}

// Structure de réponse de l'API Deriv
export interface DerivResponse {
  msg_type: 'tick' | 'history' | 'ohlc';
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
}