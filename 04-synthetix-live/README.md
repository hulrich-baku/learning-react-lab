# Synthetix Live

## 🚀 Présentation du Projet
Synthetix Live est un terminal de trading haute performance spécialisé dans les indices synthétiques. Contrairement aux applications classiques, ce projet repose sur une architecture de flux continu où les données sont "poussées" par le serveur en temps réel, permettant une analyse technique instantanée.

## 🔧 Évolution technique
Ce projet marque une rupture majeure avec le [Projet 03](../03-cine-fetch-engine/) en introduisant :
- **Changement de Paradigme Réseau** : Passage du protocole HTTP (Requête/Réponse) au protocole **WebSocket** (Connexion persistante bi-directionnelle).
- **Stream Processing** : Gestion d'un flux de données constant (Ticks) qui doit être agrégé en temps réel en bougies japonaises (OHLC).
- **Moteur de Calcul Mathématique** : Implémentation d'algorithmes pour calculer des indicateurs techniques (RSI, MACD, SMA) à la volée sur des données mouvantes.
- **Optimisation du Rendu** : Utilisation de bibliothèques de charting professionnelles pour maintenir 60 FPS malgré des mises à jour de données ultra-fréquentes.

## 🛠️ Stack Technique
- **Framework** : React 19 (Vite)
- **Typage** : TypeScript (Interfaces de messages WebSocket)
- **Communication** : WebSocket API (Flux temps réel Deriv)
- **Visualisation** : Lightweight Charts (TradingView)
- **Styling** : Tailwind CSS (Thème Ultra-Dark / Trading UI)

## 🎯 Objectifs d'Apprentissage
1. **Gestion des WebSockets** : Cycle de vie d'une connexion persistante (Handshake > Subscribe > Heartbeat > Reconnect).
2. **Traitement de Flux (Buffering)** : Accumulation et transformation de micro-données brutes en structures exploitables (Bougies).
3. **Logique Financière** : Calcul automatique d'indicateurs complexes (SMA, EMA, RSI, MACD, Stochastique).
4. **Performance UI** : Prévention des re-renders inutiles lors de la réception de données à haute fréquence.

## ⚙️ Installation & Configuration
1. Cloner uniquement ce projet :
```bash
npx degit hulrich-baku/learning-react-lab/04-synthetix-live synthetix-live