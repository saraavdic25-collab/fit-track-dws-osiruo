# 🏋️ FIT TRACER - Fitness Tracking Aplikacija

Moderan, skalabilan fitness tracking sistem sa React frontend-om, json-server backend-om i Docker/Kubernetes orkestracijоm.

## 📚 Sadržaj

- [Projektna Struktura](#struktura)
- [Brzi Start](#brzi-start)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Docker i Deployment](#docker-i-deployment)
- [DevOps i Monitoring](#devops-i-monitoring)
- [API Dokumentacija](#api-dokumentacija)
- [Troubleshooting](#troubleshooting)

---

## 📁 Projektna Struktura

```
fit-tracer/
├── backend/
│   ├── db.json                 # JSON baza podataka
│   ├── package.json           # Node.js zavisnosti
│   ├── Dockerfile             # Docker setup
│   └── README.md              # Backend uputstvo
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminPanel.js      # Admin upravljanja
│   │   │   ├── AdminPanel.css
│   │   │   ├── AddWorkoutForm.js  # Forma za treninge
│   │   │   └── AddWorkoutForm.css
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile             # Frontend Docker setup
│   └── package.json
├── docker-compose.yml          # Multi-container orchestration
├── deploy.sh                   # GCP deployment skript
├── health-check.sh             # Health monitoring skript
├── GCP_DEPLOYMENT_GUIDE.md     # Detaljni GCP uputstvo
└── README.md                   # Ovaj fajl
```

---

## 🚀 Brzi Start

### 1. Kloniraj projekat

```bash
git clone https://github.com/saraavdic25-collab/fit-track-dws-osiruo.git
cd fit-tracer
```

### 2. Pokreni sa Docker Compose-om (PREPORUČENO)

```bash
# Kompletan setup sa backend-om i frontend-om
docker-compose up --build

# Pristup aplikaciji
# Frontend: http://localhost
# Backend API: http://localhost:3000
```

### 3. Ili pokreni lokalno (bez Docker-a)

```bash
# Terminal 1: Backend
cd backend
npm install
npm start

# Terminal 2: Frontend
cd frontend
npm install
npm start

# Frontend će biti dostupan na: http://localhost:3000
# Backend API na: http://localhost:3000/api
```

---

## 🔧 Backend Setup

### Zavisnosti

- **Node.js** 18+
- **npm** 9+
- **json-server** 0.17.4

### Instalacija

```bash
cd backend
npm install
```

### Pokretanje

```bash
# Production
npm start

# Development (sa delay simulacijom)
npm run dev

# Server će biti dostupan na: http://localhost:3000
```

### API Endpoints

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/users` | Preuzmi sve korisnike |
| GET | `/users/:id` | Preuzmi korisnika po ID-u |
| POST | `/users` | Kreiraj novog korisnika |
| PUT | `/users/:id` | Ažuriraj korisnika |
| DELETE | `/users/:id` | Obriši korisnika |
| GET | `/workouts` | Preuzmi sve treninge |
| GET | `/workouts/:id` | Preuzmi trening po ID-u |
| POST | `/workouts` | Kreiraj novi trening |
| PUT | `/workouts/:id` | Ažuriraj trening |
| DELETE | `/workouts/:id` | Obriši trening |

### Primjer Fetch-a

```javascript
// Preuzmi sve treninge
const workouts = await fetch('http://localhost:3000/workouts')
  .then(res => res.json());

// Kreiraj novi trening
const response = await fetch('http://localhost:3000/workouts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 2,
    exerciseType: 'Running',
    duration: 30,
    calories: 300,
    date: new Date().toISOString()
  })
});
```

### Struktura db.json

```json
{
  "users": [
    {
      "id": 1,
      "name": "Marko Marković",
      "email": "marko@fittracer.com",
      "password": "hashed_password",
      "role": "admin"
    }
  ],
  "workouts": [
    {
      "id": 1,
      "userId": 2,
      "exerciseType": "Running",
      "duration": 30,
      "calories": 300,
      "date": "2025-05-14T10:30:00Z"
    }
  ],
  "goals": [
    {
      "id": 1,
      "userId": 2,
      "goalType": "weight_loss",
      "targetValue": 75,
      "currentValue": 82,
      "unit": "kg",
      "deadline": "2025-12-31"
    }
  ]
}
```

---

## ⚛️ Frontend Setup

### Zavisnosti

- **React** 18+
- **Node.js** 18+
- **npm** 9+

### Instalacija

```bash
cd frontend
npm install
```

### Pokretanje

```bash
npm start

# Aplikacija će biti dostupna na: http://localhost:3000
```

### Komponente

#### AdminPanel.js
Komponenta za upravljanje korisnicima i treninzima:
- Pregled svih korisnika i treninga
- CRUD operacije (Create, Read, Update, Delete)
- Toast notifikacije
- Real-time osvježavanje

```javascript
import AdminPanel from './components/AdminPanel';

<AdminPanel />
```

#### AddWorkoutForm.js
Komponenta za dodavanje novih treninga:
- Klijentska validacija
- Autocomplete za tipove vježbi
- Toast notifikacije
- Error handling

```javascript
import AddWorkoutForm from './components/AddWorkoutForm';

<AddWorkoutForm onWorkoutAdded={(workout) => console.log(workout)} />
```

### Konfiguracija API URL-a

Postavi environment varijablu u `.env`:

```env
REACT_APP_API_URL=http://localhost:3000
```

---

## 🐳 Docker i Deployment

### Docker Compose

Kompletan setup sa frontend-om i backend-om:

```bash
docker-compose up --build
```

**Dostupni servisi:**
- Frontend: `http://localhost` (port 80)
- Backend: `http://localhost:3000` (port 3000)

### Environment Varijable

Kreiraj `.env` fajl:

```env
BACKEND_PORT=3000
FRONTEND_PORT=80
API_URL=http://localhost:3000
NODE_ENV=production
```

### Build Individual Docker Image-a

**Backend:**
```bash
docker build -t fit-tracer-backend:latest backend/
docker run -p 3000:3000 fit-tracer-backend:latest
```

**Frontend:**
```bash
docker build -t fit-tracer-frontend:latest frontend/
docker run -p 80:80 fit-tracer-frontend:latest
```

### Volumes i Persistence

```bash
# Kreiraj named volume za bazu podataka
docker volume create fit-tracer-db

# Docker Compose automatski koristi volume
docker-compose up
```

### Network

Svi servisi su u istoj mreži (`fit-tracer-network`), što omogućava inter-service komunikaciju:

```
Frontend (port 80) → Backend (port 3000)
```

---

## 🚀 GCP Cloud Run Deployment

### Brzi Deploy

```bash
# Čini skript izvršivim
chmod +x deploy.sh

# Pokreni deployment
./deploy.sh

# Sa opcijama
./deploy.sh --env production --region europe-west1
```

### Detaljni Koraci

1. **Authentifikacija**
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

2. **Build Docker Image**
```bash
docker build -t eu.gcr.io/PROJECT_ID/fit-tracer-backend:latest backend/
```

3. **Push u Artifact Registry**
```bash
docker push eu.gcr.io/PROJECT_ID/fit-tracer-backend:latest
```

4. **Deploy na Cloud Run**
```bash
gcloud run deploy fit-tracer-backend \
  --image eu.gcr.io/PROJECT_ID/fit-tracer-backend:latest \
  --region europe-west1 \
  --allow-unauthenticated
```

5. **Provjera**
```bash
gcloud run describe fit-tracer-backend --region europe-west1
```

Detaljno uputstvo je dostupno u `GCP_DEPLOYMENT_GUIDE.md`

---

## 📊 DevOps i Monitoring

### Health Check Script

Provjera statusa servisa:

```bash
# Čini skript izvršivim
chmod +x health-check.sh

# Provjeri lokalne URL-ove
./health-check.sh --local

# Provjeri Cloud Run URL-ove
./health-check.sh --cloud

# Provjeri sve
./health-check.sh --all --verbose
```

Log-ovi se čuvaju u `health-check.log`

### Cloud Run Monitoring

```bash
# Real-time log-ovi
gcloud run services logs read fit-tracer-backend \
  --region europe-west1 \
  --follow

# Metrics
gcloud monitoring time-series list \
  --filter="resource.type=cloud_run_revision"
```

### Health Endpoints

```bash
# Lokalno
curl http://localhost:3000/users
curl http://localhost:3000/workouts

# Cloud Run
curl https://fit-tracer-backend.run.app/users
```

---

## 📖 API Dokumentacija

### Users Endpointi

**GET /users**
```bash
curl http://localhost:3000/users
```
Response:
```json
[
  {
    "id": 1,
    "name": "Marko Marković",
    "email": "marko@fittracer.com",
    "role": "admin"
  }
]
```

**POST /users**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Novi Korisnik",
    "email": "novi@fittracer.com",
    "password": "hashed",
    "role": "user"
  }'
```

**PUT /users/:id**
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Ažurirano Ime"}'
```

**DELETE /users/:id**
```bash
curl -X DELETE http://localhost:3000/users/1
```

### Workouts Endpointi

**GET /workouts**
```bash
curl http://localhost:3000/workouts
```

**GET /workouts?userId=2** (Filter)
```bash
curl http://localhost:3000/workouts?userId=2
```

**POST /workouts**
```bash
curl -X POST http://localhost:3000/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 2,
    "exerciseType": "Running",
    "duration": 30,
    "calories": 300,
    "date": "2025-05-14T10:30:00Z"
  }'
```

---

## 🔒 Sigurnost

### Best Practices

1. **Environment Varijable** - Nikad ne commituj `.env` fajlove
2. **API Autentifikacija** - Implementiraj JWT token-e za produkciju
3. **CORS** - Konfiguriraj sa `Access-Control-Allow-Origin`
4. **Data Validation** - Validiraj sve unose na backend-u
5. **HTTPS** - Koristi HTTPS u produkciji (Cloud Run automatski)

### `.gitignore`

```
node_modules/
.env
.env.local
dist/
build/
*.log
.DS_Store
```

---

## 🐛 Troubleshooting

### Problem: CORS greške u React-u

**Rješenje:**
```bash
# Sigurno koristi --cors flag sa json-server
npm start
```

U Docker-u je već aktivno u `docker-compose.yml`

### Problem: Port 3000 već zauzet

```bash
# Pronađi proces koji koristi port
lsof -i :3000

# Ili koristi drugačiji port
PORT=3001 npm start
```

### Problem: Docker image build fail

```bash
# Očisti Docker cache
docker system prune -a

# Re-build
docker-compose up --build
```

### Problem: Cloud Run deployment timeout

```bash
# Povećaj timeout
gcloud run services update fit-tracer-backend \
  --region europe-west1 \
  --timeout 3600
```

### Problem: Network greška između servisa

```bash
# Provjeri network
docker network ls
docker network inspect fit-tracer-network

# Restart servisa
docker-compose restart
```

---

## 📝 Contributing

1. Kreiraj feature branch: `git checkout -b feature/nova-feature`
2. Committ promjene: `git commit -m 'Dodaj novu feature'`
3. Push: `git push origin feature/nova-feature`
4. Otvori Pull Request

---

## 📄 Licenca

MIT License - vidi LICENSE fajl za detalje

---

## 👥 Timski Članovi

- **Frontend** - React aplikacija
- **Backend** - json-server i API
- **DevOps** - Docker, Cloud Run i monitoring

---

## 📞 Podrška

Za pitanja ili probleme:
1. Provjeri `GCP_DEPLOYMENT_GUIDE.md`
2. Provjeri `BACKEND_SETUP.md`
3. Pokreni `health-check.sh` za diagnostiku
4. Pogledaj log-ove: `docker-compose logs`

---
# 👥 Članovi tima

## Sara Avdić

### DWS
- Izrada korisničkog interfejsa u React-u
- Razvoj stranica i komponenti aplikacije
- Testiranje funkcionalnosti

### OSiRuO
- Dockerizacija aplikacije
- Konfiguracija Docker Compose okruženja
- Testiranje i održavanje deploymenta

## Član 2

### DWS
- Razvoj backend funkcionalnosti
- Kreiranje i održavanje baze podataka
- Implementacija CRUD operacija

### OSiRuO
- Konfiguracija backend Docker image-a
- Integracija frontend i backend servisa
- Testiranje Docker okruženja

## Član 3

### DWS
- Povezivanje frontend i backend dijela
- Validacija podataka
- Testiranje aplikacije

### OSiRuO
- Deploy aplikacije
- Konfiguracija produkcijskog okruženja
- Dokumentacija projekta

---

# 🛠 Tech Stack

| Tehnologija | Verzija |
|------------|----------|
| React | 18.x |
| Node.js | 18.x |
| json-server | 0.17.x |
| Docker | 24.x |
| Docker Compose | 2.x |
| Git | Najnovija |
| GitHub | Cloud Repository |
| Render | Cloud Hosting |

---

# 🏗 Arhitektura sistema

```text
Korisnik
    │
    ▼
React Frontend
    │
    ▼
json-server Backend
    │
    ▼
db.json Baza Podataka
```

Docker Compose povezuje frontend i backend servise u jedinstveno okruženje.

---

# 🎨 Paleta boja i fontovi

## Boje

- Primarna: #2563EB
- Sekundarna: #1E293B
- Pozadina: #F8FAFC
- Akcent: #22C55E

## Fontovi

- Poppins
- Sans-serif

---

# 👤 Korisničke uloge

## Korisnik

Može:
- pregledati treninge
- dodavati treninge
- pratiti napredak
- pregledati statistiku

## Administrator

Može:
- upravljati korisnicima
- uređivati treninge
- brisati podatke
- pregledati sve podatke sistema

---

# 🌐 Produkcijski URL

https://fit-track-dws-osiruo-1.onrender.com/

---

# 📸 Screenshots

## 🏠 Početna stranica

![Početna stranica](Screenshot%20(199).png)

Prikaz početne stranice FitTrack aplikacije sa uvodnim informacijama i navigacijom.

---

## 📝 Registracija korisnika

![Registracija](Screenshot%20(200).png)

Forma za registraciju novih korisnika i kreiranje korisničkog računa.

---

## 💎 Odabir plana

![Planovi](Screenshot%20(201).png)

Prikaz dostupnih fitness paketa i planova koje korisnici mogu odabrati.

---

## 🏋️ Informacije o vježbama

![Vježbe](Screenshot%20(202).png)

Pregled informacija o treningu, vježbama i fitness sadržajima dostupnim korisnicima.

---

## 📱 Mobilni prikaz

![Mobilni prikaz](Screenshot%20(206).png)

Responzivni prikaz aplikacije na mobilnim uređajima.


# 📚 Naučene lekcije i izazovi

Tokom razvoja projekta tim je stekao iskustvo u:

- razvoju React aplikacija
- radu sa REST API servisima
- Docker kontejnerizaciji
- korištenju Docker Compose-a
- Git i GitHub workflow-u
- cloud deploymentu aplikacija

Najveći izazovi bili su konfiguracija Docker okruženja, povezivanje frontend i backend servisa te rješavanje problema prilikom deploymenta.

U budućnosti bismo unaprijedili autentifikaciju korisnika, dodali napredniju bazu podataka i implementirali dodatne funkcionalnosti za praćenje fitness aktivnosti.
**Fit Tracer Team** 🏋️

