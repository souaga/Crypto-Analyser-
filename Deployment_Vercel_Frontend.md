# Déploiement du Frontend (React) sur Vercel

Ce guide vous expliquera comment déployer l'interface utilisateur (frontend React) de votre projet "Crypto Risk Analyzer" sur Vercel, une plateforme d'hébergement et de déploiement cloud optimisée pour les applications frontend.

## 1. Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants :

*   **Un compte Vercel** : Si vous n'en avez pas, vous pouvez en créer un gratuitement sur [vercel.com](https://vercel.com/). Vous pouvez vous inscrire avec votre compte GitHub pour une intégration facile.
*   **Le projet sur GitHub** : Votre projet "Crypto Risk Analyzer" doit être hébergé sur un dépôt GitHub, ce que nous avons fait précédemment. Vercel s'intègre directement avec GitHub pour des déploiements continus.

## 2. Connexion de Vercel à votre Dépôt GitHub

1.  **Connectez-vous à Vercel** : Accédez à votre tableau de bord Vercel ([dashboard.vercel.com](https://dashboard.vercel.com/)).
2.  **Ajouter un nouveau projet** : Cliquez sur le bouton **"Add New..."** ou **"New Project"**.
3.  **Importer le dépôt Git** : Vercel vous demandera d'importer un dépôt Git. Si vous avez déjà connecté votre compte GitHub, vous verrez une liste de vos dépôts. Si ce n'est pas le cas, Vercel vous guidera pour connecter votre compte GitHub.
4.  **Sélectionnez votre dépôt** : Recherchez et sélectionnez le dépôt `Crypto-Analyser-` (ou le nom que vous avez donné à votre dépôt) dans la liste. Cliquez sur **"Import"**.

## 3. Configuration du Projet sur Vercel

Après avoir importé le dépôt, Vercel tentera de détecter automatiquement les paramètres de votre projet. Pour une application React créée avec Vite (comme c'est le cas ici), les paramètres par défaut sont généralement corrects, mais il est bon de les vérifier.

1.  **Root Directory** : Assurez-vous que le **Root Directory** est bien `crypto-risk-analyzer`. C'est le sous-dossier où se trouve votre application React. Si ce n'est pas le cas, cliquez sur "Edit" et sélectionnez le bon dossier.
2.  **Framework Preset** : Vercel devrait détecter automatiquement `Vite` ou `Create React App`. Laissez cette option telle quelle.
3.  **Build & Output Settings** :
    *   **Build Command** : `pnpm run build` (Vercel détecte généralement cela automatiquement pour les projets Vite/pnpm).
    *   **Output Directory** : `dist` (C'est le dossier par défaut où Vite place les fichiers de build).
4.  **Environment Variables (Optionnel mais Recommandé)** :
    Si votre application frontend utilise des variables d'environnement (par exemple, pour se connecter à un backend API), vous devrez les ajouter ici. Pour l'instant, notre frontend n'en a pas besoin directement pour le modèle bayésien, mais si vous développez le backend plus tard, vous pourriez avoir besoin d'une variable pour l'URL de l'API backend.
    *   Cliquez sur **"Environment Variables"** et ajoutez les variables nécessaires (par exemple, `VITE_APP_API_URL` avec l'URL de votre backend Render une fois qu'il sera déployé).

## 4. Déploiement

1.  **Cliquez sur "Deploy"** : Une fois que tous les paramètres sont corrects, cliquez sur le bouton **"Deploy"**.
2.  **Processus de Déploiement** : Vercel va maintenant cloner votre dépôt, installer les dépendances, construire votre application React, et la déployer sur ses serveurs. Vous verrez un journal de construction en temps réel.
3.  **Accès à l'Application** : Une fois le déploiement terminé, Vercel vous fournira une URL unique (par exemple, `https://crypto-risk-analyzer-xxxx.vercel.app/`). Cliquez sur cette URL pour accéder à votre application frontend déployée.

## 5. Déploiements Continus (CI/CD)

L'un des grands avantages de Vercel est son intégration continue. Chaque fois que vous pousserez des modifications vers la branche `master` (ou `main`) de votre dépôt GitHub, Vercel détectera automatiquement ces changements et déclenchera un nouveau déploiement. Votre application sera toujours à jour avec la dernière version de votre code.

## 6. Prochaines Étapes

Une fois votre frontend déployé sur Vercel, l'étape suivante sera de déployer votre backend Python sur Render. Après cela, vous devrez configurer votre frontend pour qu'il communique avec votre backend déployé, en utilisant l'URL fournie par Render pour votre service backend.

