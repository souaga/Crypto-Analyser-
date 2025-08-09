# Connexion Frontend/Backend et Étapes Finales du Déploiement

Ce guide explique comment connecter votre frontend React déployé sur Vercel à votre backend Python déployé sur Render, et les étapes finales pour rendre votre application pleinement fonctionnelle.

## 1. Comprendre la Connexion Frontend/Backend

Votre application "Crypto Risk Analyzer" est divisée en deux parties principales :

*   **Frontend (Interface Utilisateur)** : L'application React que les utilisateurs interagissent avec dans leur navigateur. Elle est déployée sur Vercel.
*   **Backend (Logique Métier et Données)** : Les scripts Python qui contiennent le modèle bayésien et l'extracteur de données on-chain. Pour que le frontend puisse utiliser ces fonctionnalités, le backend doit exposer une API web (par exemple, via Flask ou FastAPI) et être déployé sur Render.

La connexion entre les deux se fait via des requêtes HTTP. Le frontend envoie des requêtes (par exemple, pour obtenir les résultats de l'analyse bayésienne) au backend, et le backend renvoie les données nécessaires.

## 2. Exposer une API depuis votre Backend Python

Actuellement, vos scripts Python (`bayesian_model.py`, `onchain_data_extractor.py`) sont des scripts autonomes. Pour qu'ils puissent être appelés par votre frontend, vous devez les encapsuler dans une API web. Voici les étapes générales pour cela, en utilisant Flask comme exemple (FastAPI est une autre excellente option) :

1.  **Installez Flask** : Ajoutez `Flask` à votre `requirements.txt` et installez-le (`pip install Flask`).
2.  **Créez un fichier `app.py` (ou similaire)** : Ce fichier contiendra votre application Flask.
    ```python
    # app.py
    from flask import Flask, request, jsonify
    from flask_cors import CORS # Pour gérer les requêtes cross-origin du frontend
    import os

    # Importez vos modules existants
    from bayesian_model import BayesianModel
    from onchain_data_extractor import OnchainDataExtractor

    app = Flask(__name__)
    CORS(app) # Active CORS pour toutes les routes

    @app.route('/analyze', methods=['POST'])
    def analyze_crypto():
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Exemple d'utilisation de vos modules
        # Vous devrez adapter ceci pour passer les bonnes données à votre modèle
        # et extraire les données on-chain si nécessaire via l'API Dune/Etherscan
        
        # Simuler l'extraction de données (en réalité, vous appelleriez OnchainDataExtractor)
        # For demonstration, let's assume 'data' contains the 8 metrics directly
        metrics = {
            "concentration": data.get("concentration"),
            "user_retention": data.get("user_retention"),
            "dev_activity": data.get("dev_activity"),
            "token_distribution": data.get("token_distribution"),
            "governance": data.get("governance"),
            "security": data.get("security"),
            "liquidity_depth": data.get("liquidity_depth"),
            "ecosystem_activity": data.get("ecosystem_activity"),
        }

        # Initialiser et exécuter le modèle bayésien
        model = BayesianModel()
        # Assurez-vous que votre méthode calculate_probabilities prend les métriques comme entrée
        # et renvoie PRE, PAD, et le score synthétique
        pre, pad, synthetic_score, category = model.calculate_probabilities(metrics)

        return jsonify({
            "PRE": pre,
            "PAD": pad,
            "synthetic_score": synthetic_score,
            "category": category
        })

    if __name__ == '__main__':
        app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 5000))
    ```
3.  **Mettez à jour votre `Start Command` sur Render** : Changez la commande de démarrage de votre service Render pour exécuter cette application Flask. Si vous utilisez Gunicorn (recommandé pour la production) :
    ```bash
    gunicorn -w 4 -b 0.0.0.0:$PORT app:app
    ```
    (Assurez-vous que `gunicorn` est dans votre `requirements.txt`).

## 3. Configurer le Frontend pour Appeler le Backend

Votre application React sur Vercel doit savoir où trouver votre backend Render. Vous utiliserez une variable d'environnement pour cela.

1.  **Obtenez l'URL de votre Backend Render** : Après le déploiement réussi de votre backend sur Render, Render vous fournira une URL publique (par exemple, `https://your-service-name.onrender.com/`). Copiez cette URL.
2.  **Ajoutez une Variable d'Environnement sur Vercel** :
    *   Allez sur votre tableau de bord Vercel, sélectionnez votre projet frontend "Crypto Risk Analyzer".
    *   Allez dans **"Settings"** -> **"Environment Variables"**.
    *   Ajoutez une nouvelle variable :
        *   **Name** : `VITE_APP_API_URL` (le préfixe `VITE_` est important pour que Vite l'expose au frontend)
        *   **Value** : Collez l'URL de votre backend Render (par exemple, `https://your-service-name.onrender.com/`)
    *   Assurez-vous que cette variable est disponible pour les environnements de `Production` et `Preview`.
3.  **Utilisez la Variable d'Environnement dans votre Code React** :
    Dans votre composant `CryptoAnalyzer.jsx` (ou là où vous faites l'appel API), vous accéderez à cette variable via `import.meta.env.VITE_APP_API_URL`.
    ```javascript
    // Dans CryptoAnalyzer.jsx ou un fichier de service API
    const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000'; // Fallback pour le développement local

    // ... dans votre fonction d'analyse
    const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(metricsData),
    });
    const result = await response.json();
    // ... traitez le résultat
    ```
4.  **Redéployez votre Frontend sur Vercel** : Après avoir ajouté la variable d'environnement sur Vercel, vous devrez déclencher un nouveau déploiement de votre frontend pour que le changement prenne effet. Vercel le fera automatiquement si vous poussez une petite modification vers votre dépôt GitHub.

## 4. Étapes Finales et Tests

Une fois que le frontend et le backend sont déployés et configurés pour communiquer :

1.  **Testez l'Application Complète** : Accédez à l'URL de votre frontend Vercel dans votre navigateur. Essayez d'analyser un projet crypto. Le frontend devrait maintenant envoyer la requête à votre backend Render, qui effectuera l'analyse et renverra les résultats.
2.  **Vérifiez les Logs** : Si vous rencontrez des problèmes, consultez les logs de votre service Render (pour le backend) et les logs de votre déploiement Vercel (pour le frontend). Ils vous donneront des indices sur ce qui ne fonctionne pas.
3.  **Gestion des Erreurs** : Implémentez une gestion robuste des erreurs dans votre frontend pour informer l'utilisateur si le backend n'est pas accessible ou renvoie une erreur.
4.  **Sécurité** : Pour une application en production, envisagez d'ajouter des mesures de sécurité supplémentaires à votre API backend (authentification, validation des entrées, etc.).
5.  **Optimisation** : Surveillez les performances de votre backend sur Render et de votre frontend sur Vercel. Optimisez les requêtes API et les temps de chargement si nécessaire.

En suivant ces étapes, vous aurez une application "Crypto Risk Analyzer" entièrement fonctionnelle, déployée et accessible publiquement, prête à être utilisée depuis n'importe quel appareil, y compris votre smartphone.

