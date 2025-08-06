
## Sources de données On-Chain

Les principales sources de données on-chain identifiées sont :

*   **Dune Analytics**: Plateforme d'analyse de données blockchain qui permet aux utilisateurs de créer et de partager des tableaux de bord personnalisés en utilisant des requêtes SQL.
*   **Etherscan**: Explorateur de blocs pour la blockchain Ethereum, fournissant des informations détaillées sur les transactions, les adresses, les tokens et les contrats intelligents.
*   **CryptoQuant**: Fournisseur de données on-chain et de marché pour les investisseurs en cryptomonnaies.
*   **Glassnode**: Plateforme d'intelligence de marché on-chain offrant des données et des analyses approfondies sur Bitcoin, Ethereum et d'autres crypto-actifs.
*   **CoinDesk Data**: Propose des métriques on-chain basées sur l'apprentissage automatique et des statistiques avancées.

Ces plateformes seront essentielles pour la collecte des observations actuelles on-chain nécessaires à la modélisation bayésienne.



## Projets Crypto ayant survécu (pour les Priors)

Pour définir les priors du modèle bayésien, nous nous baserons sur des projets ayant démontré une survie et une croissance sur 3 à 5 ans. Les recherches initiales confirment qu'**Ethereum** et **AAVE** sont de bons candidats, ayant traversé plusieurs cycles de marché. Bien que les résultats de recherche ne fournissent pas directement les données on-chain historiques nécessaires pour définir les priors (Gini index, rétention utilisateurs, activité dev, etc.), ils confirment la pertinence de ces projets pour notre analyse.

La prochaine étape consistera à rechercher spécifiquement ces métriques historiques pour Ethereum et AAVE sur les plateformes d'analyse on-chain identifiées (Dune Analytics, Etherscan, Glassnode, CryptoQuant).



## Projets Crypto ayant échoué (pour les Priors)

La recherche a révélé que de nombreux projets crypto échouent, avec des estimations allant jusqu'à 52% des tokens lancés depuis 2021 étant considérés comme 'morts'. Les causes générales d'échec incluent le manque d'utilisateurs, les arnaques, les problèmes réglementaires et les défaillances techniques. Cependant, il est difficile de trouver des données on-chain spécifiques et historiques pour ces projets échoués afin de les comparer directement aux projets réussis pour la définition des priors.

Pour la modélisation bayésienne, il sera nécessaire de : 
1.  Identifier des projets spécifiques considérés comme ayant échoué (par exemple, ceux qui ont cessé toute activité, dont le token est sans valeur, ou qui ont été victimes d'attaques majeures).
2.  Tenter de trouver des données on-chain historiques pour ces projets, même si cela peut être plus difficile que pour les projets réussis.
3.  Si les données on-chain sont insuffisantes, nous devrons nous appuyer sur des analyses de cas et des rapports post-mortem pour déduire les caractéristiques des projets échoués et les utiliser pour informer les priors de défaillance.

La prochaine étape sera de tenter d'identifier des projets échoués spécifiques et de rechercher leurs données on-chain, ou à défaut, des analyses détaillées de leur échec.



## Métriques On-Chain : Indice de Gini et Top Holders

Pour l'**indice de Gini** et le **pourcentage des 10 premiers détenteurs**, les plateformes suivantes sont pertinentes :

*   **Glassnode**: Propose le coefficient de Gini pour la distribution des coins sur les adresses (ex: KNC, COMP).
*   **Etherscan**: Fournit une liste des comptes Ethereum par solde d'ETH, ce qui permet de calculer le pourcentage des top holders.
*   **Dune Analytics**: Contient des requêtes liées au coefficient de Gini, bien que certaines puissent être obsolètes. Il sera nécessaire de vérifier la disponibilité de requêtes à jour ou d'en créer de nouvelles.
*   **CoinCarp**: Fournit des listes d'adresses riches pour certains tokens, ce qui peut aider à identifier les top holders.

Ces outils nous permettront de collecter les données nécessaires pour les variables d'entrée du modèle bayésien concernant la concentration des actifs.



## Métriques On-Chain : Rétention des Utilisateurs (Wallets Actifs)

Pour la **rétention des utilisateurs** (% wallets actifs à 30/90 jours), les sources suivantes sont prometteuses :

*   **Glassnode**: A introduit le concept de "On-Chain Retention" pour mesurer l'engagement des utilisateurs et la fidélité des investisseurs.
*   **Dune Analytics**: Plusieurs tableaux de bord (ex: "Wallet Activity Tracker", "Unique Active Wallets") peuvent être utilisés pour suivre l'activité des wallets sur différentes blockchains. Il sera nécessaire de créer ou d'adapter des requêtes pour obtenir les pourcentages de wallets actifs sur des périodes de 30 et 90 jours.

Ces plateformes devraient nous permettre de collecter les données nécessaires pour évaluer la rétention des utilisateurs.



## Métriques On-Chain : Activité des Développeurs

Pour l'**activité des développeurs** (commits/mois, développeurs actifs GitHub), les ressources suivantes sont très pertinentes :

*   **Cryptometheus**: Classe les projets crypto en fonction de l'activité des développeurs, en se basant sur les données GitHub.
*   **Developer Report**: Une analyse ouverte des contributions open-source dans le domaine de la crypto, analysant des millions de commits.
*   **CryptoMiso**: Classe les cryptomonnaies en fonction de l'historique des commits de leurs dépôts GitHub les plus populaires.
*   **CryptoCommit**: Agrège les statistiques de commits GitHub pour les dépôts officiels des projets.

Ces plateformes devraient nous permettre de collecter les données nécessaires pour évaluer l'activité des développeurs, un indicateur clé de la vitalité d'un projet.



## Métriques On-Chain : Distribution des Tokens

Pour la **distribution des tokens** (% unlocked, % team/VC en vesting), les sources suivantes sont très utiles :

*   **Sablier**: Infrastructure pour la distribution de tokens on-chain, utilisée pour le vesting, la paie, les airdrops, etc.
*   **Tokenomist.ai**: Fournit des données à jour sur les déblocages de tokens (token unlocks) et les calendriers de vesting.
*   **CoinMarketCap (Token Unlocks)**: Propose des informations sur les déblocages de tokens, y compris le pourcentage de l'offre en circulation affecté.
*   **DefiLlama (Upcoming Unlocks)**: Liste les déblocages de tokens à venir et leur impact potentiel sur le prix.
*   **RootData (Token Unlocks)**: Offre des données sur les déblocages de tokens, y compris le montant total débloqué et le pourcentage de l'offre maximale.
*   **Messari Docs (Token Unlocks)**: Explique comment les déblocages de tokens sont suivis et leur impact.
*   **Magna.so, TDeFi, Eqvista, Liquifi, Bitbond**: Ces ressources fournissent des informations générales et des benchmarks sur les modèles de distribution de tokens, le vesting et les allocations, y compris les durées typiques de vesting pour les équipes et les investisseurs (souvent 3-4 ans avec un cliff de 6-12 mois pour les équipes, et 2 ans pour les investisseurs).

Ces plateformes nous permettront de collecter les données nécessaires pour évaluer la distribution des tokens et l'impact du vesting sur l'offre en circulation.



## Métriques On-Chain : Gouvernance

Pour la **gouvernance** (% tokens DAO, participation votante), les ressources suivantes sont pertinentes :

*   **Aragon**: Fournit des outils pour construire et gouverner des organisations on-chain (DAOs).
*   **Dune Analytics**: Contient de nombreux tableaux de bord et requêtes sur la gouvernance des DAOs, y compris pour des projets comme Uniswap et Arbitrum. Il sera possible d'y trouver des données sur la participation votante et la distribution des tokens de gouvernance.
*   **Delphi Digital**: Mentionne la participation votante comme une mesure de la participation aux propositions par les membres de la DAO, avec un taux élevé (20%+) indiquant un engagement sain.
*   Des études et articles (ex: ceux trouvés sur journals.aom.org, sciencedirect.com) analysent la gouvernance on-chain et peuvent fournir des méthodologies pour extraire ces données.

Ces plateformes et recherches nous aideront à collecter les données nécessaires pour évaluer la décentralisation et l'engagement de la gouvernance d'un projet.



## Métriques On-Chain : Sécurité

Pour la **sécurité** (audit status, niveau de permissions critiques), les informations suivantes sont pertinentes :

*   **Audits de contrats intelligents**: Des entreprises comme Hacken, CertiK, Veridise et Quantstamp réalisent des audits de sécurité approfondis des contrats intelligents et des protocoles blockchain. Leurs rapports d'audit sont des sources précieuses pour évaluer le statut d'audit d'un projet.
*   **Type de Blockchain (Permissioned vs. Permissionless)**: Le niveau de permission d'une blockchain (permissioned ou permissionless) est un facteur de sécurité important. Les blockchains permissioned ont un contrôle d'accès, tandis que les permissionless sont ouvertes à tous. Cela peut influencer la centralisation et la résistance à la censure.

Pour collecter ces données, il faudra :
1.  Rechercher des bases de données ou des agrégateurs de rapports d'audit (par exemple, sur les sites des entreprises d'audit mentionnées ou des plateformes comme DeFiSafety, qui agrègent des scores de sécurité).
2.  Pour le niveau de permissions, cela dépendra de la nature du projet (blockchain elle-même ou application décentralisée sur une blockchain existante). Cette information est généralement disponible dans la documentation du projet.

La prochaine étape sera de rechercher des sources spécifiques pour les rapports d'audit et de voir comment intégrer le concept de permissions critiques dans notre analyse.



## Métriques On-Chain : Profondeur de Liquidité

Pour la **profondeur de liquidité** (TVL, slippage potentielle), les sources suivantes sont très utiles :

*   **DefiLlama**: Agrégateur de TVL (Total Value Locked) pour de nombreuses blockchains et protocoles DeFi. C'est une source primordiale pour obtenir le TVL d'un projet.
*   **CoinGecko, CoinMarketCap, The Block, Token Terminal**: Ces plateformes fournissent également des données agrégées sur le TVL, permettant de comparer la liquidité entre différents projets.

Concernant le **slippage potentiel**, les recherches expliquent le concept de slippage (différence entre le prix attendu et le prix exécuté d'une transaction). Cependant, il n'existe pas de métrique on-chain standardisée pour le "slippage potentiel" directement disponible sur les agrégateurs. Pour estimer le slippage, il serait nécessaire d'analyser la profondeur du carnet d'ordres (pour les CEX) ou la liquidité des pools (pour les DEX) et de simuler des transactions de différentes tailles. Cela pourrait nécessiter :
1.  L'accès aux APIs des exchanges centralisés ou décentralisés pour obtenir les données de carnet d'ordres/pools de liquidité.
2.  Le développement de scripts pour calculer le slippage basé sur ces données.

Pour l'instant, nous nous concentrerons sur le TVL comme indicateur principal de la profondeur de liquidité, et nous noterons que le slippage nécessitera une approche plus approfondie ou une simplification si les données détaillées ne sont pas facilement accessibles.



## Accès Programmatique aux Données On-Chain

Pour l'extraction des données on-chain, notamment via Dune Analytics, il est confirmé qu'une **API** est disponible. Cela permettra un accès programmatique aux requêtes et aux tableaux de bord, ce qui est préférable au web scraping. L'utilisation de cette API nécessitera une clé API.

Pour Etherscan, une API est également disponible pour accéder aux données de la blockchain Ethereum.

Pour les autres sources comme Glassnode ou CryptoQuant, il faudra vérifier la disponibilité de leurs APIs ou envisager des solutions alternatives si nécessaire.

La prochaine étape consistera à intégrer ces APIs dans le script `onchain_data_extractor.py` et à développer les fonctions d'extraction spécifiques pour chaque métrique.

