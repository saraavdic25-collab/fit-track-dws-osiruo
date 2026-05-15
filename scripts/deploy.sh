#!/bin/bash

##############################################################################
# FIT TRACER - GCP Cloud Run Deployment Script
# Automatizirano build, push i deployment
#
# Upotreba:
#   ./deploy.sh [--env dev|prod] [--region europe-west1] [--skip-build]
##############################################################################

set -e  # Exit ako neka komanda fail-a

# Boje
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

##############################################################################
# Konfiguracija
##############################################################################

# Default varijable
ENVIRONMENT="production"
REGION="europe-west1"
SKIP_BUILD=false
REPO_NAME="fit-tracer-repo"
SERVICE_NAME="fit-tracer-backend"
IMAGE_NAME="backend"
MEMORY="512Mi"
CPU="1"
MAX_INSTANCES="100"
MIN_INSTANCES="1"

##############################################################################
# Funkcije
##############################################################################

print_header() {
  echo -e "\n${BLUE}════════════════════════════════════════════════════════${NC}"
  echo -e "${BLUE}🏋️  FIT TRACER - GCP Cloud Run Deployment${NC}"
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

print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

# Provjera da li je komanda dostupna
check_command() {
  if ! command -v $1 &> /dev/null; then
    print_error "$1 nije instaliran. Molimo instaliraj ga prvo."
  fi
}

# Provjera GCP konfiguracije
check_gcp_config() {
  print_step "Provjera GCP konfiguracije..."
  
  # Provjeri da li je gcloud dostupan
  check_command "gcloud"
  
  # Provjeri da li je korisnik ulogovan
  if ! gcloud auth application-default print-access-token &> /dev/null; then
    print_error "Niste ulogovani u GCP. Pokrenite: gcloud auth login"
  fi
  
  # Dobij projekt ID
  PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
  if [ -z "$PROJECT_ID" ]; then
    print_error "Nema postavljenog projekta. Pokrenite: gcloud config set project YOUR_PROJECT_ID"
  fi
  
  print_success "GCP konfiguracija OK (Project: $PROJECT_ID)"
}

# Provjera Docker
check_docker_config() {
  print_step "Provjera Docker-a..."
  
  check_command "docker"
  
  # Provjeri da li je Docker daemon pokrenut
  if ! docker ps &> /dev/null; then
    print_error "Docker daemon nije pokrenut. Pokrenite Docker Desktop ili docker daemon."
  fi
  
  print_success "Docker dostupan"
}

# Provjera potrebnih servisa
enable_services() {
  print_step "Omogućavanje GCP servisa..."
  
  gcloud services enable run.googleapis.com \
    artifactregistry.googleapis.com \
    cloudbuild.googleapis.com \
    logging.googleapis.com \
    --quiet
  
  print_success "GCP servisi omogućeni"
}

# Kreiraj Artifact Registry ako ne postoji
create_artifact_registry() {
  print_step "Provjera Artifact Registry repozitorijuma..."
  
  if gcloud artifacts repositories describe $REPO_NAME \
    --location=$REGION &> /dev/null; then
    print_success "Repozitorijum već postoji: $REPO_NAME"
  else
    print_step "Kreiranja novog repozitorijuma..."
    gcloud artifacts repositories create $REPO_NAME \
      --repository-format=docker \
      --location=$REGION \
      --description="FIT Tracer Docker Images" \
      --quiet
    print_success "Repozitorijum kreiran: $REPO_NAME"
  fi
  
  # Konfiguriraj Docker authentifikaciju
  gcloud auth configure-docker ${REGION}-docker.pkg.dev --quiet
}

# Build Docker image
build_image() {
  print_step "Build Docker image..."
  
  if [ ! -f "backend/Dockerfile" ]; then
    print_error "Dockerfile nije pronađen u backend/ direktorijumu"
  fi
  
  FULL_IMAGE_PATH="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${IMAGE_NAME}:latest"
  
  docker build \
    -t "$FULL_IMAGE_PATH" \
    -f backend/Dockerfile \
    backend/
  
  if [ $? -eq 0 ]; then
    print_success "Image je izgrađen: $FULL_IMAGE_PATH"
  else
    print_error "Build je neuspješan"
  fi
}

# Push image u Artifact Registry
push_image() {
  print_step "Push image u Artifact Registry..."
  
  FULL_IMAGE_PATH="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${IMAGE_NAME}:latest"
  
  docker push "$FULL_IMAGE_PATH"
  
  if [ $? -eq 0 ]; then
    print_success "Image push-an: $FULL_IMAGE_PATH"
  else
    print_error "Push je neuspješan"
  fi
}

# Deploy na Cloud Run
deploy_cloud_run() {
  print_step "Deploy na Cloud Run..."
  
  FULL_IMAGE_PATH="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${IMAGE_NAME}:latest"
  
  # Postavi environment varijable
  ENV_VARS="NODE_ENV=${ENVIRONMENT}"
  
  if [ "$ENVIRONMENT" = "development" ]; then
    ENV_VARS="${ENV_VARS},LOG_LEVEL=DEBUG"
  else
    ENV_VARS="${ENV_VARS},LOG_LEVEL=INFO"
  fi
  
  gcloud run deploy $SERVICE_NAME \
    --image "$FULL_IMAGE_PATH" \
    --platform managed \
    --region $REGION \
    --memory $MEMORY \
    --cpu $CPU \
    --max-instances $MAX_INSTANCES \
    --min-instances $MIN_INSTANCES \
    --timeout 3600 \
    --set-env-vars "$ENV_VARS" \
    --allow-unauthenticated \
    --quiet
  
  if [ $? -eq 0 ]; then
    print_success "Deployment je uspješan"
  else
    print_error "Deployment je neuspješan"
  fi
}

# Prikaži informacije o servisu
show_service_info() {
  print_step "Informacije o servisu..."
  
  echo ""
  gcloud run services describe $SERVICE_NAME \
    --region $REGION \
    --format='table(
      status.url,
      status.conditions[0].message,
      spec.template.metadata.creationTimestamp
    )'
  
  SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
    --region $REGION \
    --format='value(status.url)')
  
  echo -e "\n${GREEN}Service URL: ${SERVICE_URL}${NC}"
  
  # Provjeri health
  echo -e "\n${BLUE}▶ Testiranje health endpoint-a...${NC}"
  if curl -s -o /dev/null -w "%{http_code}" "${SERVICE_URL}/users" | grep -q "200"; then
    print_success "Health check prošao"
  else
    print_warning "Health check nije dostupan (API može trebati vremena da se pokrene)"
  fi
}

# Prikaži log-ove
show_logs() {
  echo -e "\n${BLUE}▶ Poslednji log-ovi:${NC}"
  gcloud run services logs read $SERVICE_NAME \
    --region $REGION \
    --limit 10 \
    --format json | head -20
}

# Parsiranje argumenata
parse_arguments() {
  while [[ $# -gt 0 ]]; do
    case $1 in
      --env)
        ENVIRONMENT="$2"
        shift 2
        ;;
      --region)
        REGION="$2"
        shift 2
        ;;
      --skip-build)
        SKIP_BUILD=true
        shift
        ;;
      --help)
        show_help
        exit 0
        ;;
      *)
        print_error "Nepoznata opcija: $1"
        ;;
    esac
  done
}

# Prikaži help
show_help() {
  cat << EOF

FIT TRACER - Cloud Run Deployment Script

UPOTREBA:
  ./deploy.sh [OPCIJE]

OPCIJE:
  --env [dev|prod]       Okruženje (default: production)
  --region REGION        GCP region (default: europe-west1)
  --skip-build          Preskoči build, samo deploy
  --help                 Prikaži ovu poruku

PRIMJERI:
  ./deploy.sh
  ./deploy.sh --env dev
  ./deploy.sh --region us-central1 --env prod
  ./deploy.sh --skip-build

VARIJABLE OKRUŽENJA:
  PROJECT_ID            GCP projekat ID
  REGION                GCP regija
  ENVIRONMENT           Development ili Production

EOF
}

##############################################################################
# Glavna logika
##############################################################################

main() {
  print_header
  
  # Parsiranje argumenata
  parse_arguments "$@"
  
  # Provjere
  check_gcp_config
  check_docker_config
  enable_services
  
  # Priprema
  create_artifact_registry
  
  # Build i deploy
  if [ "$SKIP_BUILD" = false ]; then
    build_image
  else
    print_step "Preskakanje build-a (--skip-build je aktivno)"
  fi
  
  push_image
  deploy_cloud_run
  
  # Rezultati
  show_service_info
  
  echo -e "\n${GREEN}════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}✓ DEPLOYMENT JE USPJEŠAN!${NC}"
  echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
}

# Pokreni main funkciju
main "$@"
