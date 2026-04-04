# Elite Habits - Discipline Tracker
Une application de suivi d'habitudes minimaliste et performante, conçue pour maximiser la discipline quotidienne grâce à un feedback visuel immédiat. Ce projet marque le passage de la gestion de listes simples à la manipulation de structures de données multidimensionnelles.

## 🔧 Évolution Technique
Ce projet pousse les concepts du [Projet 01](../01-todo-app-basics/) plus loin en introduisant :

- **Complex State Mapping** : Contrairement au Projet 01 (état binaire), ici chaque entité possède un sous-état de 7 jours. Gestion fine de l'immuabilité lors de la mise à jour d'un index précis dans un tableau imbriqué.
- **Business Logic Engine** : Calcul dynamique et automatique d'un score de progression journalier (0-100%) basé sur le ratio d'habitudes complétées, et hebdomadaire pour chaque habitude (1-7) basé sur le ratio des jours cochés.

## ✨ Fonctionnalités
- **Tableau de bord de discipline** : Visualisation du score de progression  calculé en temps réel.
- **Grille Hebdomadaire** : Suivi visuel (Lundi à Dimanche) pour chaque habitude créée.
- **Ajout/Suppression/Modification** : Gestion dynamique de la liste des disciplines.
- **Conception Orientée Principes SOLID** : Architecture favorisant le découplage et la réutilisabilité, avec une logique métier isolée dans un `Context API` pour assurer une  `Source Unique de Vérité` (SSOT).
- **Persistance locale** : Sauvegarde automatique de vos progrès via le `LocalStorage`
- **Interface responsive** : Design fluide avec Tailwind CSS, optimisé pour mobile et desktop.

## 🛠️ Stack technique
- **Frontend** : React 19, TypeScript et Tailwind CSS.
- **Icônes** : Lucide React.
- **Tooling** : Vite.js

## ⚡ Installation
Pour clonner uniquement ce projet :
```bash
npx degit hulrich-baku/learning-react-lab 02-elite-habits
cd 02-elite-habits
npm install
npm run dev
```