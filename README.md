# 🚀 Portfolio Manager

Ein professionelles Dashboard zur automatisierten Verwaltung und zum Deployment deiner Web-Entwicklungs-Projekte auf GitHub und Netlify.

## Features

✨ **Automatisiertes Deployment**
- Ein-Klick-Deployment zu GitHub
- Automatische Repository-Erstellung
- Code-Push mit Git-Integration
- Netlify-Ready Konfiguration

📊 **Portfolio-Verwaltung**
- Übersicht aller Projekte
- Deployment-Status-Tracking
- Echtzeit-Fortschrittsanzeige
- Deployment-Logs

🔐 **GitHub Integration**
- Personal Access Token Support
- Sichere Credential-Speicherung
- Automatische Repository-Verwaltung
- Multi-Project Support

🎯 **Benutzerfreundlich**
- Intuitive Web-Oberfläche
- Schritt-für-Schritt Anleitung
- Echtzeit-Feedback
- Fehlerbehandlung

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Installation & Setup

```bash
# Dependencies installieren
pnpm install

# Development Server starten (Port 3004)
pnpm dev

# Production Build erstellen
pnpm build

# Build Preview
pnpm preview
```

## Verwendung

### 1. GitHub Konfiguration

1. Klicke auf ⚙️ **Settings** Button
2. Gebe deinen **GitHub Username** ein
3. Generiere einen **Personal Access Token**:
   - Gehe zu GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Klicke "Generate new token"
   - Wähle folgende Scopes:
     - `repo` (Vollständiger Zugriff auf Repositories)
     - `user` (Benutzerdaten)
     - `workflow` (GitHub Actions)
   - Kopiere den Token
4. Füge den Token in das Feld ein
5. Klicke "Speichern & Schließen"

### 2. Projekte Deployen

1. Klicke "Deploy zu GitHub & Netlify" für jedes Projekt
2. Warte auf die Deployment-Bestätigung
3. Überprüfe die Deployment-Logs
4. Dein Projekt ist jetzt auf GitHub!

### 3. Netlify Deployment

Nach GitHub Deployment:
1. Gehe zu [netlify.com](https://netlify.com)
2. Klicke "Add new site" → "Import an existing project"
3. Wähle dein GitHub Repository
4. Setze Build-Settings:
   - Build command: `pnpm build`
   - Publish directory: `dist`
5. Deploy!

## Projektstruktur

```
portfolio-manager/
├── src/
│   ├── App.tsx          # Hauptkomponente
│   ├── main.tsx         # React Entry Point
│   └── index.css        # Globale Styles
├── index.html           # HTML Template
├── vite.config.ts       # Vite Konfiguration
├── tailwind.config.js   # Tailwind Konfiguration
└── package.json         # Dependencies
```

## Verwaltete Projekte

Der Portfolio Manager verwaltet automatisch diese Projekte:

### 1. Landing Page Funnel
- **Pfad**: `/home/ubuntu/landing-page-funnel`
- **Beschreibung**: High-Converting Sales Funnel
- **Tech**: React, TypeScript, Tailwind CSS

### 2. Interactive Quiz Tool
- **Pfad**: `/home/ubuntu/quiz-funnel-tool`
- **Beschreibung**: Business Potential Assessment
- **Tech**: React, TypeScript, Tailwind CSS

### 3. Lead Management Dashboard
- **Pfad**: `/home/ubuntu/lead-management-dashboard`
- **Beschreibung**: Professionelles Lead-Management
- **Tech**: React, TypeScript, Tailwind CSS, Recharts

## API Integration

Der Portfolio Manager integriert sich mit:

### GitHub API
```typescript
// Repository erstellen
POST /user/repos
{
  "name": "project-name",
  "description": "Project description",
  "private": false
}

// Code pushen
git push origin main
```

### Netlify API (Optional)
```typescript
// Site erstellen und deployen
POST /api/sites
{
  "name": "project-name",
  "repo": {
    "provider": "github",
    "repo": "username/repo-name",
    "branch": "main"
  }
}
```

## Sicherheit

- ✅ GitHub Token wird lokal gespeichert (nicht an Server gesendet)
- ✅ HTTPS-only Kommunikation
- ✅ Keine sensiblen Daten in Logs
- ✅ Token-Validierung vor Deployment

## Troubleshooting

### "GitHub Token ungültig"
- Überprüfe, dass der Token nicht abgelaufen ist
- Stelle sicher, dass die richtigen Scopes gesetzt sind
- Regeneriere den Token bei Bedarf

### "Repository bereits vorhanden"
- Der Portfolio Manager überspringt existierende Repositories
- Lösche das Repository auf GitHub und versuche erneut

### "Deployment fehlgeschlagen"
- Überprüfe die Deployment-Logs
- Stelle sicher, dass alle Dependencies installiert sind
- Überprüfe die Build-Konfiguration

## Performance

- Optimiert für schnelle Deployments
- Parallele Project-Verarbeitung
- Echtzeit-Status-Updates
- Minimale Bundle-Size

## Browser-Unterstützung

- Chrome (neueste)
- Firefox (neueste)
- Safari (neueste)
- Edge (neueste)

## Lizenz

MIT

## Support

Für Fragen oder Probleme, erstelle bitte ein Issue im GitHub Repository.

---

**Entwickelt für automatisiertes Portfolio-Management**

