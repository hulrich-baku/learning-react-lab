import { useEffect, useState, useRef } from 'react';

const DERIV_WS_URL = 'wss://ws.binaryws.com/websockets/v3?app_id=1089'; // App ID de test public

export const useTradingSocket = (symbol: string) => {
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // 1. Création de la connexion
    socketRef.current = new WebSocket(DERIV_WS_URL);

    socketRef.current.onopen = () => {
      setIsConnected(true);
      console.log('✅ Connecté au serveur Deriv');

      // 2. Souscription au flux du symbole choisi
      const subscribeMessage = {
        ticks: symbol,
        subscribe: 1,
      };
      socketRef.current?.send(JSON.stringify(subscribeMessage));
    };

    // 3. Réception des données
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.msg_type === 'tick') {
        setLastPrice(data.tick.quote);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('❌ Erreur WebSocket:', error);
    };

    socketRef.current.onclose = () => {
      setIsConnected(false);
      console.log('🔌 Déconnecté');
    };

    // 4. Nettoyage : Fermer le flux si on quitte la page
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [symbol]);

  return { lastPrice, isConnected };
};