# 01 - Todo App (Basics)

Ce projet est une immersion dans les fondamentaux de React, mettant l'accent sur la gestion de l'état, la communication entre composants et la persistance des données.

## 🚀 Fonctionnalités & Concepts Clés
1. **CRUD Complet** : Ajout, suppression et bascule d'état (check/uncheck) des tâches.
2. **State Management** : Utilisation de `useContext` pour un partage fluide des données sans "prop drilling".
3. **Composants Atomiques** : Architecture basée sur des sous-composants recevant des props typées.
4. **Filtrage Dynamique** : Système de filtres (Toutes / Terminées / En cours) via des fonctions de tableau JavaScript.
5. **Manipulation du DOM** : Utilisation de `useRef` pour la gestion du focus automatique de l'input.
6. **Custom Hooks** : Création d'un hook `useInput` pour isoler la logique de gestion des formulaires.
7. **Persistance** : Synchronisation avec le `localStorage` via `useEffect` pour conserver les données au rafraîchissement.