
import numpy as np

class BayesianRiskModel:
    def __init__(self):
        # Définition des priors (lois a priori) pour chaque facteur
        # Ces valeurs sont des hypothèses raisonnables basées sur des recherches générales
        # Pour simplifier, nous utilisons des distributions Beta pour les probabilités
        # alpha et beta sont les paramètres de la distribution Beta
        # alpha = nombre de succès + 1, beta = nombre d'échecs + 1
        # Un alpha plus élevé et un beta plus faible indiquent une probabilité a priori plus élevée de succès

        self.priors = {
            'concentration': {'alpha': 2, 'beta': 8},  # Faible concentration (Gini faible, top holders faible) est favorable
            'retention_utilisateurs': {'alpha': 8, 'beta': 2}, # Forte rétention est favorable
            'activite_dev': {'alpha': 7, 'beta': 3},     # Forte activité dev est favorable
            'distribution_token': {'alpha': 3, 'beta': 7}, # Distribution équitable, peu de vesting team/VC est favorable
            'gouvernance': {'alpha': 6, 'beta': 4},      # Bonne gouvernance, participation élevée est favorable
            'securite': {'alpha': 9, 'beta': 1},         # Bonne sécurité (audits, pas de vulnérabilités) est favorable
            'liquidity_depth': {'alpha': 7, 'beta': 3},  # Forte liquidité est favorable
            'activite_ecosysteme': {'alpha': 8, 'beta': 2} # Forte activité écosystémique est favorable
        }

    def calculate_posterior(self, prior_alpha, prior_beta, observed_successes, observed_failures):
        # Calcul de la probabilité postérieure en utilisant la formule de Bayes avec des distributions Beta
        # P(H|D) = P(D|H) * P(H) / P(D)
        # Pour une distribution Beta, la mise à jour est simple:
        # alpha_posterior = alpha_prior + observed_successes
        # beta_posterior = beta_prior + observed_failures
        
        posterior_alpha = prior_alpha + observed_successes
        posterior_beta = prior_beta + observed_failures
        
        # La moyenne de la distribution Beta est alpha / (alpha + beta)
        return posterior_alpha / (posterior_alpha + posterior_beta)

    def estimate_probabilities(self, observations):
        # observations est un dictionnaire des facteurs avec une valeur entre 0 et 1
        # où 1 est très favorable et 0 est très défavorable
        # Nous devons convertir ces observations en 'succès' et 'échecs' pour la distribution Beta

        # Pour chaque facteur, nous allons estimer une probabilité de 'succès' (favorable) ou 'échec' (défavorable)
        # et mettre à jour les priors en conséquence.
        # Par exemple, si 'concentration' est 0.2 (défavorable), cela signifie plus d'échecs que de succès.
        # Si 'concentration' est 0.8 (favorable), cela signifie plus de succès que d'échecs.

        # Pour simplifier, nous allons considérer que chaque observation est basée sur 10 'essais' virtuels
        # où l'observation est la proportion de 'succès'.
        
        total_posterior_success_prob = 0
        total_factors = len(self.priors)

        for factor, prior_params in self.priors.items():
            if factor in observations:
                observed_value = observations[factor]
                
                # Convertir l'observation en succès/échecs virtuels
                # Par exemple, si observed_value = 0.8, et 10 essais virtuels:
                # observed_successes = 8, observed_failures = 2
                virtual_trials = 10 # Nombre d'essais virtuels pour l'observation
                observed_successes = observed_value * virtual_trials
                observed_failures = (1 - observed_value) * virtual_trials
                
                # Calculer la probabilité postérieure pour ce facteur
                posterior_prob = self.calculate_posterior(
                    prior_params['alpha'], 
                    prior_params['beta'], 
                    observed_successes, 
                    observed_failures
                )
                total_posterior_success_prob += posterior_prob
            else:
                # Si un facteur n'est pas observé, utiliser la moyenne du prior comme probabilité
                total_posterior_success_prob += prior_params['alpha'] / (prior_params['alpha'] + prior_params['beta'])

        # Calculer la probabilité moyenne de succès pour le projet
        P_success = total_posterior_success_prob / total_factors

        # P.R.E. (Probabilité de Risque d’Échec) = 1 - P_success
        P_R_E = 1 - P_success
        # P.A.D. (Probabilité d’Accumulation Durable) = P_success
        P_A_D = P_success

        return P_R_E, P_A_D

    def interpret_results(self, P_R_E, P_A_D, gini_index=None):
        if P_R_E > 0.6:
            return "🔴 À éviter"
        elif P_A_D > 0.5 and P_R_E < 0.5:
            # Ajout de la condition Gini < 0.3 pour Favorable
            if P_A_D > 0.65 and gini_index is not None and gini_index < 0.3:
                return "🟢 Favorable"
            else:
                return "🟡 Risqué mais prometteur"
        else:
            return "🟡 Risqué mais prometteur" # Cas par défaut si aucune des conditions ci-dessus n'est remplie

    def calculate_score(self, P_A_D):
        # Score synthétique [0-100] basé sur P.A.D.
        return round(P_A_D * 100)

# Exemple d'utilisation (pour les tests)
if __name__ == "__main__":
    model = BayesianRiskModel()

    # Exemple d'observations pour un projet hypothétique
    # Ces valeurs seraient obtenues à partir des données on-chain réelles
    observations_exemple = {
        'concentration': 0.3, # Gini index élevé, top holders élevés (défavorable)
        'retention_utilisateurs': 0.7, # Bonne rétention
        'activite_dev': 0.8,     # Forte activité dev
        'distribution_token': 0.6, # Distribution correcte
        'gouvernance': 0.7,      # Bonne gouvernance
        'securite': 0.9,         # Très bonne sécurité
        'liquidity_depth': 0.8,  # Forte liquidité
        'activite_ecosysteme': 0.7 # Forte activité écosystémique
    }

    P_R_E, P_A_D = model.estimate_probabilities(observations_exemple)
    print(f"P.R.E. (Probabilité de Risque d’Échec): {P_R_E:.2f}")
    print(f"P.A.D. (Probabilité d’Accumulation Durable): {P_A_D:.2f}")

    # Pour l'interprétation, nous avons besoin du Gini index si la condition Favorable est potentiellement remplie
    gini_example = 0.25 # Exemple de Gini index
    interpretation = model.interpret_results(P_R_E, P_A_D, gini_example)
    print(f"Interprétation: {interpretation}")

    score = model.calculate_score(P_A_D)
    print(f"Score synthétique: {score}/100")

    # Exemple pour un projet avec des observations défavorables
    observations_defavorables = {
        'concentration': 0.8, # Gini index faible, top holders faibles (favorable)
        'retention_utilisateurs': 0.2, # Faible rétention
        'activite_dev': 0.3,     # Faible activité dev
        'distribution_token': 0.2, # Mauvaise distribution
        'gouvernance': 0.3,      # Mauvaise gouvernance
        'securite': 0.5,         # Sécurité moyenne
        'liquidity_depth': 0.4,  # Faible liquidité
        'activite_ecosysteme': 0.3 # Faible activité écosystémique
    }

    P_R_E_def, P_A_D_def = model.estimate_probabilities(observations_defavorables)
    print(f"\nProjet défavorable - P.R.E.: {P_R_E_def:.2f}")
    print(f"Projet défavorable - P.A.D.: {P_A_D_def:.2f}")
    interpretation_def = model.interpret_results(P_R_E_def, P_A_D_def)
    print(f"Interprétation: {interpretation_def}")
    score_def = model.calculate_score(P_A_D_def)
    print(f"Score synthétique: {score_def}/100")

    # Exemple pour un projet très favorable
    observations_tres_favorable = {
        'concentration': 0.1, # Très faible concentration (très favorable)
        'retention_utilisateurs': 0.9, # Très bonne rétention
        'activite_dev': 0.9,     # Très forte activité dev
        'distribution_token': 0.9, # Très bonne distribution
        'gouvernance': 0.9,      # Très bonne gouvernance
        'securite': 0.95,         # Excellente sécurité
        'liquidity_depth': 0.9,  # Très forte liquidité
        'activite_ecosysteme': 0.9 # Très forte activité écosystémique
    }

    P_R_E_tres_fav, P_A_D_tres_fav = model.estimate_probabilities(observations_tres_favorable)
    print(f"\nProjet très favorable - P.R.E.: {P_R_E_tres_fav:.2f}")
    print(f"Projet très favorable - P.A.D.: {P_A_D_tres_fav:.2f}")
    gini_tres_fav = 0.15 # Très faible Gini index
    interpretation_tres_fav = model.interpret_results(P_R_E_tres_fav, P_A_D_tres_fav, gini_tres_fav)
    print(f"Interprétation: {interpretation_tres_fav}")
    score_tres_fav = model.calculate_score(P_A_D_tres_fav)
    print(f"Score synthétique: {score_tres_fav}/100")


