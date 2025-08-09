# Déploiement du Backend (Python) sur Render

Ce guide vous expliquera comment déployer les scripts Python de votre projet "Crypto Risk Analyzer" (le modèle bayésien et l'extracteur de données) sur Render, une plateforme cloud qui supporte l'hébergement de services web, de workers, et de bases de données.

Pour ce projet, nous allons déployer un "Web Service" sur Render, qui pourra exécuter vos scripts Python et potentiellement exposer une API si vous décidez d'en créer une pour interagir avec le frontend.

## 1. Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants :

*   **Un compte Render** : Si vous n'en avez pas, vous pouvez en créer un gratuitement sur [render.com](https://render.com/). Vous pouvez vous inscrire avec votre compte GitHub.
*   **Le projet sur GitHub** : Votre projet "Crypto Risk Analyzer" doit être hébergé sur un dépôt GitHub, ce que nous avons fait précédemment. Render s'intègre directement avec GitHub pour des déploiements continus.

## 2. Connexion de Render à votre Dépôt GitHub

1.  **Connectez-vous à Render** : Accédez à votre tableau de bord Render ([dashboard.render.com](https://dashboard.render.com/)).
2.  **Nouveau Service Web** : Cliquez sur **"New"** dans le menu latéral, puis sélectionnez **"Web Service"**.
3.  **Connectez votre dépôt Git** : Render vous demandera de connecter votre compte GitHub. Une fois connecté, vous verrez une liste de vos dépôts. Si votre dépôt n'apparaît pas, vous devrez peut-être accorder des permissions à Render pour accéder à vos dépôts.
4.  **Sélectionnez votre dépôt** : Recherchez et sélectionnez le dépôt `Crypto-Analyser-` (ou le nom que vous avez donné à votre dépôt) dans la liste. Cliquez sur **"Connect"**.

## 3. Configuration du Service sur Render

Après avoir sélectionné le dépôt, vous devrez configurer les détails de votre service web Python.

1.  **Name** : Donnez un nom à votre service (par exemple, `crypto-analyzer-backend`). Ce nom fera partie de l'URL de votre service.
2.  **Region** : Choisissez la région de déploiement la plus proche de vos utilisateurs ou de vos sources de données (par exemple, `Oregon (US West)` ou `Frankfurt (EU Central)`).
3.  **Branch** : Laissez `main` ou `master` (selon la branche principale de votre dépôt).
4.  **Root Directory** : Laissez vide si vos scripts Python sont à la racine du dépôt. Si vos scripts sont dans un sous-dossier (par exemple, `backend/`), spécifiez ce chemin ici.
5.  **Runtime** : Render devrait détecter automatiquement `Python`.
6.  **Build Command** : C'est la commande que Render exécutera pour installer les dépendances de votre projet. Si vous avez un fichier `requirements.txt` à la racine de votre projet (ce qui est recommandé pour les projets Python), utilisez :
    ```bash
    pip install -r requirements.txt
    ```
    Si vous n'avez pas de `requirements.txt` et que vos scripts n'ont pas de dépendances externes, vous pouvez laisser vide ou mettre `echo 


no dependencies`.
7.  **Start Command** : C'est la commande qui sera exécutée pour démarrer votre application Python. Puisque votre projet est principalement composé de scripts pour le modèle bayésien et l'extraction de données, vous n'avez pas un serveur web traditionnel à démarrer par défaut. Cependant, si vous souhaitez exposer une API pour que votre frontend puisse interagir avec votre modèle, vous devrez créer un petit serveur Flask ou FastAPI. Pour l'instant, si vous voulez juste exécuter un script, vous pourriez utiliser :
    ```bash
    python3 your_main_script.py
    ```
    (Remplacez `your_main_script.py` par le nom du script que vous voulez exécuter au démarrage, par exemple `bayesian_model.py` ou `onchain_data_extractor.py` si vous les adaptez pour être exécutables en tant que service).
    
    **Note importante** : Pour que votre frontend puisse interagir avec votre backend, vous devrez transformer vos scripts Python en une API web (par exemple, avec Flask ou FastAPI). Si vous le faites, la commande de démarrage ressemblerait à :
    ```bash
    gunicorn -w 4 -b 0.0.0.0:$PORT app:app  # Pour Flask avec Gunicorn
    # ou
    uvicorn app:app --host 0.0.0.0 --port $PORT # Pour FastAPI avec Uvicorn
    ```
    où `app:app` fait référence à votre application Flask/FastAPI.

8.  **Instance Type** : Choisissez le type d'instance. Le plan gratuit est suffisant pour commencer.
9.  **Environment Variables** :
    C'est ici que vous devrez configurer vos clés API pour Dune Analytics, Etherscan, et GitHub. Ces variables sont essentielles pour que vos scripts Python puissent collecter les données on-chain.
    *   Cliquez sur **"Advanced"** puis **"Add Environment Variable"**.
    *   Ajoutez les variables suivantes (remplacez les valeurs par vos propres clés) :
        *   `DUNE_API_KEY`: `votre_cle_dune`
        *   `ETHERSCAN_API_KEY`: `votre_cle_etherscan`
        *   `GITHUB_TOKEN`: `votre_token_github`
    *   **Sécurité** : Pour des raisons de sécurité, il est fortement recommandé de ne pas coder en dur ces clés dans vos scripts. Lisez-les plutôt à partir des variables d'environnement.

## 4. Déploiement

1.  **Cliquez sur "Create Web Service"** : Une fois que tous les paramètres sont configurés, cliquez sur ce bouton.
2.  **Processus de Déploiement** : Render va maintenant cloner votre dépôt, installer les dépendances, et tenter de démarrer votre service. Vous pourrez suivre le journal de déploiement en temps réel.
3.  **Accès au Service** : Une fois le déploiement réussi, Render vous fournira une URL publique pour votre service (par exemple, `https://your-service-name.onrender.com/`).

## 5. Déploiements Continus (CI/CD)

Render offre également des déploiements continus. Chaque fois que vous pousserez des modifications vers la branche principale de votre dépôt GitHub, Render détectera automatiquement ces changements et déclenchera un nouveau déploiement de votre service.

## 6. Prochaines Étapes

Une fois votre backend déployé sur Render, vous devrez mettre à jour votre frontend (déployé sur Vercel) pour qu'il pointe vers l'URL de votre backend Render. Cela implique généralement de modifier une variable d'environnement dans votre projet React sur Vercel (par exemple, `VITE_APP_API_URL`) pour qu'elle contienne l'URL de votre service Render. Vous devrez ensuite redéployer votre frontend sur Vercel pour que le changement prenne effet.

