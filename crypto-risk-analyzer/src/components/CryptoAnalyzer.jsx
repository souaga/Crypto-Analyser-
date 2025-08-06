import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, TrendingUp, Shield, Activity, Users, Code, Coins, BarChart3, FileText } from 'lucide-react';
import AnalysisReport from './AnalysisReport';

const CryptoAnalyzer = () => {
  const [projectName, setProjectName] = useState('');
  const [metrics, setMetrics] = useState({
    concentration: 50,
    retention_utilisateurs: 50,
    activite_dev: 50,
    distribution_token: 50,
    gouvernance: 50,
    securite: 50,
    liquidity_depth: 50,
    activite_ecosysteme: 50
  });
  const [results, setResults] = useState(null);

  const metricLabels = {
    concentration: 'Concentration (Gini Index)',
    retention_utilisateurs: 'Rétention Utilisateurs',
    activite_dev: 'Activité Développeurs',
    distribution_token: 'Distribution Token',
    gouvernance: 'Gouvernance',
    securite: 'Sécurité',
    liquidity_depth: 'Profondeur Liquidité',
    activite_ecosysteme: 'Activité Écosystème'
  };

  const metricIcons = {
    concentration: Users,
    retention_utilisateurs: TrendingUp,
    activite_dev: Code,
    distribution_token: Coins,
    gouvernance: Shield,
    securite: Shield,
    liquidity_depth: BarChart3,
    activite_ecosysteme: Activity
  };

  const calculateBayesianRisk = () => {
    // Simulation du modèle bayésien
    const priors = {
      concentration: { alpha: 2, beta: 8 },
      retention_utilisateurs: { alpha: 8, beta: 2 },
      activite_dev: { alpha: 7, beta: 3 },
      distribution_token: { alpha: 3, beta: 7 },
      gouvernance: { alpha: 6, beta: 4 },
      securite: { alpha: 9, beta: 1 },
      liquidity_depth: { alpha: 7, beta: 3 },
      activite_ecosysteme: { alpha: 8, beta: 2 }
    };

    let totalPosteriorSuccessProb = 0;
    const totalFactors = Object.keys(priors).length;

    Object.keys(priors).forEach(factor => {
      const observedValue = metrics[factor] / 100;
      const virtualTrials = 10;
      const observedSuccesses = observedValue * virtualTrials;
      const observedFailures = (1 - observedValue) * virtualTrials;

      const posteriorAlpha = priors[factor].alpha + observedSuccesses;
      const posteriorBeta = priors[factor].beta + observedFailures;
      const posteriorProb = posteriorAlpha / (posteriorAlpha + posteriorBeta);

      totalPosteriorSuccessProb += posteriorProb;
    });

    const P_success = totalPosteriorSuccessProb / totalFactors;
    const P_R_E = 1 - P_success;
    const P_A_D = P_success;

    // Interprétation des résultats
    let interpretation = '';
    let color = '';
    if (P_R_E > 0.6) {
      interpretation = '🔴 À éviter';
      color = 'destructive';
    } else if (P_A_D > 0.5 && P_R_E < 0.5) {
      const giniIndex = (100 - metrics.concentration) / 100; // Conversion inverse pour Gini
      if (P_A_D > 0.65 && giniIndex < 0.3) {
        interpretation = '🟢 Favorable';
        color = 'default';
      } else {
        interpretation = '🟡 Risqué mais prometteur';
        color = 'secondary';
      }
    } else {
      interpretation = '🟡 Risqué mais prometteur';
      color = 'secondary';
    }

    const score = Math.round(P_A_D * 100);

    setResults({
      P_R_E: P_R_E.toFixed(3),
      P_A_D: P_A_D.toFixed(3),
      interpretation,
      color,
      score
    });
  };

  const handleMetricChange = (metric, value) => {
    setMetrics(prev => ({
      ...prev,
      [metric]: value[0]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Analyseur de Risque Crypto
          </h1>
          <p className="text-lg text-muted-foreground">
            Modélisation Bayésienne du Risque Long Terme pour Crypto-Actifs
          </p>
        </div>

        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analysis">Analyse</TabsTrigger>
            <TabsTrigger value="report" disabled={!results}>Rapport Détaillé</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analysis" className="space-y-6">
            {/* Project Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Projet à Analyser
                </CardTitle>
                <CardDescription>
                  Entrez le nom du projet crypto-actif à analyser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="project">Nom du Projet</Label>
                  <Input
                    id="project"
                    placeholder="ex: Ethereum, AAVE, Uniswap..."
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Metrics Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Métriques On-Chain
                </CardTitle>
                <CardDescription>
                  Ajustez les métriques basées sur les données on-chain (0 = défavorable, 100 = très favorable)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.keys(metrics).map((metric) => {
                    const Icon = metricIcons[metric];
                    return (
                      <div key={metric} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-blue-600" />
                          <Label className="text-sm font-medium">
                            {metricLabels[metric]}
                          </Label>
                        </div>
                        <div className="space-y-2">
                          <Slider
                            value={[metrics[metric]]}
                            onValueChange={(value) => handleMetricChange(metric, value)}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Défavorable</span>
                            <span className="font-medium">{metrics[metric]}%</span>
                            <span>Très favorable</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Analysis Button */}
            <div className="text-center">
              <Button 
                onClick={calculateBayesianRisk}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={!projectName.trim()}
              >
                <Activity className="mr-2 h-4 w-4" />
                Analyser le Risque Bayésien
              </Button>
            </div>

            {/* Results */}
            {results && (
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Résultats de l'Analyse - {projectName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Score synthétique */}
                  <div className="text-center space-y-2">
                    <div className="text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {results.score}/100
                    </div>
                    <p className="text-lg text-muted-foreground">Score Synthétique</p>
                  </div>

                  {/* Probabilités */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          P.R.E.
                        </CardTitle>
                        <CardDescription>Probabilité de Risque d'Échec</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-red-600">
                          {(parseFloat(results.P_R_E) * 100).toFixed(1)}%
                        </div>
                        <Progress 
                          value={parseFloat(results.P_R_E) * 100} 
                          className="mt-2"
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          P.A.D.
                        </CardTitle>
                        <CardDescription>Probabilité d'Accumulation Durable</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-600">
                          {(parseFloat(results.P_A_D) * 100).toFixed(1)}%
                        </div>
                        <Progress 
                          value={parseFloat(results.P_A_D) * 100} 
                          className="mt-2"
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Interprétation */}
                  <div className="text-center">
                    <Badge variant={results.color} className="text-lg px-4 py-2">
                      {results.interpretation}
                    </Badge>
                  </div>

                  {/* Recommandations */}
                  <Card className="bg-slate-50 dark:bg-slate-800">
                    <CardHeader>
                      <CardTitle className="text-lg">Recommandations d'Investissement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {results.interpretation.includes('🔴') && (
                        <p className="text-red-600 font-medium">
                          Éviter l'investissement. Le risque d'échec est trop élevé pour un investissement long terme.
                        </p>
                      )}
                      {results.interpretation.includes('🟡') && (
                        <p className="text-yellow-600 font-medium">
                          DCA prudent recommandé avec suivi régulier. Le projet présente un potentiel mais avec des risques significatifs.
                        </p>
                      )}
                      {results.interpretation.includes('🟢') && (
                        <p className="text-green-600 font-medium">
                          Accumulation long terme favorable. Le projet présente de solides fondamentaux pour un investissement durable.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="report">
            <AnalysisReport 
              projectName={projectName} 
              metrics={metrics} 
              results={results} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CryptoAnalyzer;

