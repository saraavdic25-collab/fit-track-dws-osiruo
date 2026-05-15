#!/bin/bash

##############################################################################
# FIT TRACER - Project Initialization Script
# Automatska inicijalizacija cijelog projekta
##############################################################################

set -e

# Boje
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

##############################################################################
# Funkcije
##############################################################################

print_header() {
  echo -e "\n${BLUE}════════════════════════════════════════════════════════${NC}"
  echo -e "${BLUE}🏋️  FIT TRACER - Project Initialization${NC}"
  echo -e "${BLUE}════════════════════════════════════════════════════════${NC}\n"
}

print_step() {
  echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
  exit 1
}

# Provjera da li je komanda dostupna
check_command() {
  if ! command -v $1 &> /dev/null; then
    print_error "$1 nije instaliran. Molimo instaliraj ga prvo."
  fi
}

# Kreiraj direktorijume
create_directories() {
  print_step "Kreiranje direktorijuma strukture..."
  
  mkdir -p backend
  mkdir -p frontend/src/components
  mkdir -p frontend/public
  
  print_success "Direktorijumi kreirani"
}

# Kopiraj backend fajlove
setup_backend() {
  print_step "Setup backend-a..."
  
  # db.json je već u home direktorijumu, ali ga trebamo kopirati
  if [ -f "db.json" ]; then
    cp db.json backend/
    print_success "db.json kopiran"
  fi
  
  # Kopiraj package.json ako postoji
  if [ -f "package.json" ]; then
    cp package.json backend/
    print_success "package.json kopiran"
  fi
  
  # Kopiraj Dockerfile
  if [ -f "Dockerfile" ]; then
    cp Dockerfile backend/
    print_success "Dockerfile kopiran"
  fi
  
  # Instaliraj zavisnosti
  print_step "Instalacija backend zavisnosti (ovo može potrajati)..."
  cd backend
  npm install
  cd ..
  print_success "Backend zavisnosti instalirane"
}

# Setup frontend-a
setup_frontend() {
  print_step "Setup frontend-a..."
  
  # Kreiraj .env fajl
  if [ ! -f "frontend/.env" ]; then
    echo "REACT_APP_API_URL=http://localhost:3000" > frontend/.env
    print_success "frontend/.env kreiran"
  fi
  
  # Kopiraj React komponente
  if [ -f "AdminPanel.js" ]; then
    cp AdminPanel.js frontend/src/components/
    cp AdminPanel.css frontend/src/components/
    print_success "AdminPanel komponenta kopirana"
  fi
  
  if [ -f "AddWorkoutForm.js" ]; then
    cp AddWorkoutForm.js frontend/src/components/
    cp AddWorkoutForm.css frontend/src/components/
    print_success "AddWorkoutForm komponenta kopirana"
  fi
  
  # Kreiraj osnovne React fajlove ako ne postoje
  if [ ! -f "frontend/src/App.js" ]; then
    cat > frontend/src/App.js << 'EOF'
import React from 'react';
import AdminPanel from './components/AdminPanel';
import AddWorkoutForm from './components/AddWorkoutForm';
import './App.css';

function App() {
  const [refresh, setRefresh] = React.useState(0);

  const handleWorkoutAdded = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="App">
      <AddWorkoutForm onWorkoutAdded={handleWorkoutAdded} />
      <AdminPanel key={refresh} />
    </div>
  );
}

export default App;
EOF
    print_success "frontend/src/App.js kreiran"
  fi

  if [ ! -f "frontend/src/index.js" ]; then
    cat > frontend/src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF
    print_success "frontend/src/index.js kreiran"
  fi

  if [ ! -f "frontend/public/index.html" ]; then
    cat > frontend/public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="sr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="FIT TRACER - Fitness Tracking Aplikacija" />
    <title>FIT TRACER - Fitness Tracking</title>
  </head>
  <body>
    <noscript>Trebate omogućiti JavaScript da biste koristili ovu aplikaciju.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF
    print_success "frontend/public/index.html kreiran"
  fi
  
  # Instaliraj frontend zavisnosti
  print_step "Instalacija frontend zavisnosti (ovo može potrajati)..."
  cd frontend
  npm install react react-dom react-scripts
  cd ..
  print_success "Frontend zavisnosti instalirane"
}

# Kreiraj konfiguracijske fajlove
setup_config() {
  print_step "Kreiranje konfiguracijskh fajlova..."
  
  # .env.example
  if [ -f ".env.example" ]; then
    [ ! -f ".env" ] && cp .env.example .env
    print_success ".env fajl kreiran"
  fi
  
  # docker-compose ako postoji
  if [ -f "docker-compose.yml" ]; then
    print_success "docker-compose.yml dostupan"
  fi
}

# Kreiraj scripts za pokretanje
setup_scripts() {
  print_step "Kreiranje scripts..."
  
  # Čini bash skripte izvršivim
  [ -f "health-check.sh" ] && chmod +x health-check.sh && print_success "health-check.sh je izvršiv"
  [ -f "deploy.sh" ] && chmod +x deploy.sh && print_success "deploy.sh je izvršiv"
  [ -f "init-project.sh" ] && chmod +x init-project.sh
}

# Provjera
final_checks() {
  print_step "Finalne provjere..."
  
  echo ""
  check_command "node"
  print_success "Node.js dostupan"
  
  check_command "npm"
  print_success "npm dostupan"
  
  # Provjeri direktorijume
  if [ -d "backend" ] && [ -d "frontend" ]; then
    print_success "Direktorijumi struktura OK"
  else
    print_error "Direktorijumi struktura nije OK"
  fi
  
  # Provjeri package.json fajlove
  if [ -f "backend/package.json" ] && [ -f "frontend/package.json" ]; then
    print_success "package.json fajlovi dostupni"
  else
    print_error "package.json fajlovi nisu dostupni"
  fi
}

# Prikaži sljedeće korake
print_next_steps() {
  echo ""
  echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}✓ INICIJALIZACIJA JE USPJEŠNA!${NC}"
  echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
  echo ""
  echo -e "${BLUE}Sljedeći koraci:${NC}"
  echo ""
  echo "1. ${YELLOW}Pokreni sa Docker Compose (PREPORUČENO):${NC}"
  echo "   ${BLUE}docker-compose up --build${NC}"
  echo ""
  echo "2. ${YELLOW}Ili pokreni lokalno - dva terminala:${NC}"
  echo "   ${BLUE}Terminal 1: cd backend && npm start${NC}"
  echo "   ${BLUE}Terminal 2: cd frontend && npm start${NC}"
  echo ""
  echo "3. ${YELLOW}Dostup aplikaciji:${NC}"
  echo "   ${BLUE}Frontend: http://localhost:3000${NC}"
  echo "   ${BLUE}Backend API: http://localhost:3000 (ili :3001 ako je zauzet)${NC}"
  echo ""
  echo "4. ${YELLOW}Health check:${NC}"
  echo "   ${BLUE}./health-check.sh${NC}"
  echo ""
  echo "5. ${YELLOW}GCP deployment:${NC}"
  echo "   ${BLUE}./deploy.sh${NC}"
  echo ""
  echo -e "${YELLOW}Za više informacija:${NC}"
  echo "   - ${BLUE}README.md${NC} - Pregled projekta"
  echo "   - ${BLUE}GCP_DEPLOYMENT_GUIDE.md${NC} - GCP deployment uputstvo"
  echo "   - ${BLUE}BACKEND_SETUP.md${NC} - Backend setup detalji"
  echo ""
}

##############################################################################
# Glavna logika
##############################################################################

main() {
  print_header
  
  # Provjere
  print_step "Provjera prerequisita..."
  check_command "node"
  check_command "npm"
  print_success "Svi prerequisiti su dostupni"
  
  # Setup
  create_directories
  setup_backend
  setup_frontend
  setup_config
  setup_scripts
  final_checks
  
  # Završetak
  print_next_steps
}

main "$@"
