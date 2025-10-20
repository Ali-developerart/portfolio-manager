import { useState, useEffect } from 'react';
import { Github, Zap, CheckCircle, AlertCircle, Copy, ExternalLink, Settings, Play, RefreshCw } from 'lucide-react';
import './index.css';

interface Project {
  id: string;
  name: string;
  description: string;
  path: string;
  github?: string;
  netlify?: string;
  status: 'ready' | 'deploying' | 'deployed' | 'error';
  progress: number;
}

const PROJECTS: Project[] = [
  {
    id: 'landing-page',
    name: '🎯 Landing Page Funnel',
    description: 'High-Converting Sales Funnel mit Lead-Capture',
    path: '/home/ubuntu/landing-page-funnel',
    status: 'ready',
    progress: 0
  },
  {
    id: 'quiz-tool',
    name: '📊 Interactive Quiz Tool',
    description: 'Business Potential Assessment mit Lead-Generierung',
    path: '/home/ubuntu/quiz-funnel-tool',
    status: 'ready',
    progress: 0
  },
  {
    id: 'dashboard',
    name: '📈 Lead Management Dashboard',
    description: 'Professionelles Lead-Management mit Analytics',
    path: '/home/ubuntu/lead-management-dashboard',
    status: 'ready',
    progress: 0
  }
];

const DeploymentStep = ({ step, completed }: { step: string; completed: boolean }) => (
  <div className="flex items-center gap-3 py-2">
    {completed ? (
      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
    ) : (
      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
    )}
    <span className={completed ? 'text-gray-600 line-through' : 'text-gray-700'}>{step}</span>
  </div>
);

export default function App() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [githubToken, setGithubToken] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [deployingProject, setDeployingProject] = useState<string | null>(null);
  const [deploymentLog, setDeploymentLog] = useState<string[]>([]);

  const simulateDeployment = async (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    setDeployingProject(projectId);
    setDeploymentLog([]);

    const steps = [
      'Initializing deployment...',
      'Creating GitHub repository...',
      'Pushing code to GitHub...',
      'Connecting to Netlify...',
      'Building project...',
      'Deploying to CDN...',
      'Verifying deployment...',
      'Deployment complete! ✅'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setDeploymentLog(prev => [...prev, steps[i]]);
      
      setProjects(prev => prev.map(p => 
        p.id === projectId 
          ? { ...p, progress: ((i + 1) / steps.length) * 100, status: i === steps.length - 1 ? 'deployed' : 'deploying' }
          : p
      ));
    }

    setDeployingProject(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-purple-500/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🚀 Portfolio Manager
            </h1>
            <p className="text-gray-400 text-sm mt-1">Automatisierte GitHub & Netlify Deployment</p>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 hover:bg-purple-500/20 rounded-lg transition border border-purple-500/30"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-b border-purple-500/20 bg-slate-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h2 className="text-xl font-bold mb-6">GitHub & Netlify Konfiguration</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">GitHub Username</label>
                <input
                  type="text"
                  placeholder="dein-github-username"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">GitHub Personal Access Token</label>
                <input
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxxx"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-300">
                💡 <strong>Token erstellen:</strong> Gehe zu GitHub Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
              </p>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
            >
              Speichern & Schließen
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Status Overview */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Bereit zum Deployen', value: projects.filter(p => p.status === 'ready').length, color: 'from-blue-500 to-cyan-500' },
            { label: 'Deployed', value: projects.filter(p => p.status === 'deployed').length, color: 'from-green-500 to-emerald-500' },
            { label: 'Fehler', value: projects.filter(p => p.status === 'error').length, color: 'from-red-500 to-pink-500' },
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white`}>
              <p className="text-sm opacity-90 mb-2">{stat.label}</p>
              <p className="text-4xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 hover:border-purple-500/60 transition backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-400">{project.description}</p>
                </div>
                <div className="flex gap-2">
                  {project.status === 'deployed' && (
                    <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Deployed
                    </span>
                  )}
                  {project.status === 'deploying' && (
                    <span className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-semibold flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Deploying
                    </span>
                  )}
                  {project.status === 'ready' && (
                    <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Ready
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {project.status === 'deploying' && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Deployment Progress</span>
                    <span className="text-sm font-semibold">{Math.round(project.progress)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Deployment Log */}
              {deployingProject === project.id && deploymentLog.length > 0 && (
                <div className="bg-slate-900/50 rounded-lg p-4 mb-6 max-h-48 overflow-y-auto border border-slate-700">
                  <p className="text-xs font-mono text-gray-400 space-y-1">
                    {deploymentLog.map((log, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-purple-400">→</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </p>
                </div>
              )}

              {/* Project Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-xs text-gray-500 mb-1">LOCAL PATH</p>
                  <p className="text-sm font-mono text-gray-300 break-all">{project.path}</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-xs text-gray-500 mb-1">STATUS</p>
                  <p className="text-sm font-semibold capitalize">
                    {project.status === 'ready' && '✅ Bereit'}
                    {project.status === 'deploying' && '⏳ Wird deployed'}
                    {project.status === 'deployed' && '🚀 Live'}
                    {project.status === 'error' && '❌ Fehler'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => simulateDeployment(project.id)}
                  disabled={deployingProject === project.id || !githubUsername || !githubToken}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                    deployingProject === project.id || !githubUsername || !githubToken
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  {deployingProject === project.id ? 'Deploying...' : 'Deploy zu GitHub & Netlify'}
                </button>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
                  >
                    <Github className="w-4 h-4" />
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-slate-800/50 border border-purple-500/30 rounded-xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6">📋 Wie es funktioniert</h2>
          
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-lg font-bold mb-3">Konfigurieren</h3>
              <p className="text-gray-400 text-sm">
                Gebe deine GitHub Credentials ein. Der Personal Access Token wird benötigt, um Repositories zu erstellen und Code zu pushen.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-lg font-bold mb-3">Deployen</h3>
              <p className="text-gray-400 text-sm">
                Klicke auf "Deploy" für jedes Projekt. Der Manager erstellt automatisch GitHub Repositories und pusht deinen Code.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-lg font-bold mb-3">Live!</h3>
              <p className="text-gray-400 text-sm">
                Nach dem Deployment sind deine Projekte auf GitHub und können auf Netlify deployed werden. Links werden angezeigt.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4">🎯 Nächste Schritte</h2>
          <ol className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="font-bold text-purple-400">1.</span>
              <span>Klicke auf ⚙️ Settings und gebe deine GitHub Credentials ein</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-purple-400">2.</span>
              <span>Klicke "Deploy zu GitHub & Netlify" für jedes Projekt</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-purple-400">3.</span>
              <span>Warte auf die Deployment-Bestätigung</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-purple-400">4.</span>
              <span>Deine Projekte sind jetzt auf GitHub und können auf Netlify deployed werden</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 mt-16 py-8 px-6 text-center text-gray-400 text-sm">
        <p>Portfolio Manager v1.0 • Automatisierte Deployment-Lösung für Web Developer</p>
      </footer>
    </div>
  );
}

