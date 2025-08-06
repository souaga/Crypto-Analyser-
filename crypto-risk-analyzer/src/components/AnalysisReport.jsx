import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Users, 
  Code, 
  Coins, 
  BarChart3, 
  Activity,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const AnalysisReport = ({ projectName, metrics, results }) => {
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

  const getMetricStatus = (value) => {
    if (value >= 70) return { icon: CheckCircle, color: 'text-green-500', status: 'Excellent' };
    if (value >= 50) return { icon: Clock, color: 'text-yellow-500', status: 'Moyen' };
    return { icon: XCircle, color: 'text-red-500', status: 'Faible' };
  };

  const getRiskLevel = (pre) => {
    const preValue = parseFloat(pre) * 100;
    if (preValue > 60) return { level: 'Élevé', color: 'bg-red-500' };
    if (preValue > 40) return { level: 'Modéré', color: 'bg-yellow-500' };
    return { level: 'Faible', color: 'bg-green-500' };
  };

  if (!results) return null;

  const riskLevel = getRiskLevel(results.P_R_E);

  return (
    <div className="space-y-6">
      {/* Fiche Signalétique */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            📌 Fiche Signalétique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Projet</p>
              <p className="font-semibold text-lg">{projectName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Score Global</p>
              <p className="font-semibold text-lg">{results.score}/100</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Niveau de Risque</p>
              <Badge className={`${riskLevel.color} text-white`}>
                {riskLevel.level}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métriques Détaillées */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            📊 Analyse Détaillée des Métriques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(metrics).map(([metric, value]) => {
              const Icon = metricIcons[metric];
              const status = getMetricStatus(value);
              const StatusIcon = status.icon;
              
              return (
                <div key={metric} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">{metricLabels[metric]}</p>
                      <p className="text-xs text-muted-foreground">{value}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`h-4 w-4 ${status.color}`} />
                    <span className={`text-xs font-medium ${status.color}`}>
                      {status.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modélisation Bayésienne */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            🧠 Modélisation Bayésienne du Risque
          </CardTitle>
          <CardDescription>
            Probabilités calculées selon le modèle bayésien avec priors basés sur des projets ayant survécu 3-5 ans
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">P.R.E. (Risque d'Échec)</span>
                <span className="text-sm text-red-600 font-bold">
                  {(parseFloat(results.P_R_E) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={parseFloat(results.P_R_E) * 100} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">P.A.D. (Accumulation Durable)</span>
                <span className="text-sm text-green-600 font-bold">
                  {(parseFloat(results.P_A_D) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={parseFloat(results.P_A_D) * 100} 
                className="h-2"
              />
            </div>
          </div>
          
          <div className="text-center pt-4">
            <Badge variant={results.color} className="text-lg px-6 py-2">
              {results.interpretation}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Facteurs de Risque */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            📉 Analyse des Facteurs de Risque
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(metrics).map(([metric, value]) => {
              const isRisky = value < 40;
              const isExcellent = value >= 70;
              
              if (isRisky) {
                return (
                  <div key={metric} className="flex items-center gap-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">
                      <strong>{metricLabels[metric]}</strong> présente un risque élevé ({value}%)
                    </span>
                  </div>
                );
              }
              
              if (isExcellent) {
                return (
                  <div key={metric} className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      <strong>{metricLabels[metric]}</strong> est un point fort ({value}%)
                    </span>
                  </div>
                );
              }
              
              return null;
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisReport;

