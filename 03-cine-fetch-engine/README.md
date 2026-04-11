# Cine Fetch Engine

## 🚀 Présentation du Projet
Cine Fetch Engine est un explorateur de films dynamique utilisant l'API The Movie Database (TMDB). Ce projet marque une transition critique vers le développement "Data-Driven" où l'application consomme des données réelles et changeantes.

## 🔧 Evolution technique:
Ce projet pousse les concepts du [Projet 02](../02-elite-habits/) plus loin en introduisant :
- **Source de données externe** : Passage d'un état local (LocalStorage) à une consommation de données distantes via API REST.
- **Gestion d'état asynchrone** : Maîtrise des délais réseau et des états de transition (Loading/Error) absents dans les projets statiques.
- **Data Transformation** : Apprentissage du nettoyage et du formatage des données brutes reçues du serveur avant l'affichage.
- **Sécurité des secrets** : Mise en place d'une architecture étanche pour protéger les clés privées dans un environnement public.

## 🛠️ Stack Technique
- Framework : React 19 (Vite)
- Styling : Tailwind CSS
- HTTP Client : Axios
- Icons : Lucide React
- API : TMDB (REST API)

## 🎯 Objectifs d'Apprentissage (Ingénierie)
1. **Gestion Asynchrone** : Cycle de vie **Loading** > **Success** > **Error**.
2. **Sécurité** : Utilisation des variables d'environnement (.env) pour les clés API.
3. **Performance** : Optimisation des requêtes (Debouncing) et des images.
4. **UX Avancée** : Implémentation de Skeletons pour éviter le Layout Shift.

## ⚙️ Installation & Configuration
1. Cloner uniquement ce projet :
```bash
npx degit hulrich-baku/learning-react-lab/03-cine-fetch-engine cine-fetch-engine
```
2. Créer un fichier `.env` à la racine (voir .env.example).
```bash
# .env.example
VITE_TMDB_API_KEY=ajoute_ta_cle_ici
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

3. Installer les dépendances et lancer le serveur
```bash
npm install
npm run dev
```
