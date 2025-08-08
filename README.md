# 🚀 Crypto Risk Analyzer Framework

Un framework d'analyse on-chain expert pour évaluer le potentiel d'investissement long terme des crypto-actifs en utilisant une modélisation bayésienne du risque.

## 🎯 Fonctionnalités

- **Modélisation Bayésienne** : Calcul des probabilités P.R.E. (Risque d'Échec) et P.A.D. (Accumulation Durable)
- **8 Métriques On-Chain** : Concentration, Rétention, Activité Dev, Distribution, Gouvernance, Sécurité, Liquidité, Écosystème
- **Interface Interactive** : Application React moderne avec visualisations temps réel
- **Score Synthétique** : Évaluation 0-100 avec recommandations d'investissement
- **Rapport Détaillé** : Analyse complète exportable

## 🏗️ Architecture

```
├── bayesian_model.py              # Modèle bayésien principal
├── onchain_data_extractor.py      # Extraction de données on-chain
├── crypto-risk-analyzer/          # Interface React
│   ├── src/
│   │   ├── components/
│   │   │   ├── CryptoAnalyzer.jsx  # Composant principal
│   │   │   └── AnalysisReport.jsx  # Rapport détaillé
│   │   └── ...
├── Framework_Analyse_Crypto_Documentation.md  # Documentation technique
├── Guide_Utilisation_Rapide.md    # Guide d'utilisation
└── recherche_onchain.md           # Recherche de référence
```

## 🚀 Installation et Utilisation

### Prérequis
- Node.js 18+
- pnpm
- Python 3.8+

### Installation
```bash
# Cloner le dépôt
git clone https://github.com/souaga/Crypto-Analyser-.git
cd Crypto-Analyser-

# Installer les dépendances React
cd crypto-risk-analyzer
pnpm install

# Lancer l'interface
pnpm run dev
```

### Utilisation
1. Accédez à `http://localhost:5173/`
2. Saisissez le nom du projet crypto à analyser
3. Ajustez les 8 métriques on-chain avec les sliders
4. Cliquez sur "Analyser le Risque Bayésien"
5. Consultez les résultats et le rapport détaillé

## 📊 Métriques Analysées

| Métrique | Description | Source |
|----------|-------------|---------|
| **Concentration** | Indice de Gini des détenteurs | Dune Analytics |
| **Rétention** | % utilisateurs actifs 90j | Etherscan |
| **Activité Dev** | Commits, développeurs actifs | GitHub |
| **Distribution** | Tokens unlockés, vesting | Tokenomist |
| **Gouvernance** | Participation votes DAO | Snapshot |
| **Sécurité** | Audits, incidents | Diverses |
| **Liquidité** | TVL, volume, slippage | DefiLlama |
| **Écosystème** | DApps, intégrations | Diverses |

## 🎯 Interprétation des Résultats

### Score Synthétique
- **70-100** : 🟢 Favorable (accumulation long terme)
- **50-69** : 🟡 Risqué mais prometteur (DCA prudent)
- **0-49** : 🔴 À éviter (risques élevés)

### Probabilités Bayésiennes
- **P.R.E.** : Probabilité de Risque d'Échec (2-5 ans)
- **P.A.D.** : Probabilité d'Accumulation Durable

## 📚 Documentation

- **[Documentation Technique Complète](Framework_Analyse_Crypto_Documentation.md)** : Architecture, modélisation, déploiement
- **[Guide d'Utilisation Rapide](Guide_Utilisation_Rapide.md)** : Démarrage en 5 étapes
- **[Recherche de Référence](recherche_onchain.md)** : Sources et projets analysés

## 🔧 Configuration des APIs

Pour utiliser l'extraction automatique de données, configurez les clés API :

```python
# Dans onchain_data_extractor.py
DUNE_API_KEY = "votre_cle_dune"
ETHERSCAN_API_KEY = "votre_cle_etherscan"
GITHUB_TOKEN = "votre_token_github"
```

## 🚀 Déploiement

### Déploiement Local
```bash
cd crypto-risk-analyzer
pnpm run build
pnpm run preview
```

### Déploiement Production
Consultez la section "Déploiement" de la documentation technique pour les instructions complètes (Docker, Kubernetes, CI/CD).

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Dune Analytics** pour les données on-chain
- **Etherscan** pour l'API blockchain
- **DefiLlama** pour les métriques DeFi
- **shadcn/ui** pour les composants React

## 📞 Support

- **Documentation** : Consultez les guides fournis
- **Issues** : Ouvrez une issue sur GitHub
- **Contact** : Via les canaux officiels

---

**Développé par Manus AI** - Framework d'Analyse Crypto v1.0

