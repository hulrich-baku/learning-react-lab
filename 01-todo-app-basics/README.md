# Todo App (Basics)

Ce projet est une immersion dans les fondamentaux de React, mettant l'accent sur la gestion de l'état, les hooks et la persistance des données.


## 🚀 Fonctionnalités & Concepts Clés
1. **CRUD Complet** : Ajout, suppression et bascule d'état (check/uncheck) des tâches.
2. **State Management** : Utilisation de `useContext` pour un partage fluide des données sans `prop drilling`.
3. **Filtrage Dynamique** : Système de filtres (Toutes / Terminées / En cours) via des fonctions de tableau JavaScript.
4. **Manipulation du DOM** : Utilisation de `useRef` pour la gestion du focus automatique de l'input.
5. **Custom Hooks** : Création d'un hook `useInput` pour isoler la logique de gestion des formulaires.
6. **Persistance** : Synchronisation avec le `localStorage` via `useEffect` pour conserver les données au rafraîchissement.

## 🛠️ Stack technique
- **Frontend** : React 19, TypeScript et Tailwind CSS.
- **Tooling** : Vite.js

## ⚡ Installation
Pour clonner uniquement ce projet :
```bash
npx degit hulrich-baku/learning-react-lab 01-todo-app-basics
cd 02-elite-habits
npm install
npm run dev
```