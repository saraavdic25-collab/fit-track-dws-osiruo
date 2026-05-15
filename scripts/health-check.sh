#!/bin/bash

##############################################################################
# FIT TRACER - Health Check Script
# Provjera statusa Cloud Run URL-ova sa logovanjem i timestamp-om
#
# Upotreba:
#   ./health-check.sh
#   ./health-check.sh --url https://custom-url.run.app
#   ./health-check.sh --verbose
##############################################################################

set -o pipefail

# Konfiguracija
BACKEND_URLS=(
  "http://localhost:3000/users"
  "http://localhost:3000/workouts"
  "http://localhost:3000/goals"
)

CLOUD_RUN_URLS=(
  "https://fit-tracer-backend.run.app/users"
  "https://fit-tracer-backend.run.app/workouts"
)

LOG_FILE="health-check.log"
TIMEOUT=10
VERBOSE=false
CUSTOM_URLS=()

# Boje za ispis
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

##############################################################################
# Funkcije
##############################################################################

# Ispis sa logovanjem
log_message() {
  local level=$1
  local message=$2
  local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
  
  case $level in
    INFO)
      echo "[${timestamp}] [INFO] ${message}" | tee -a "$LOG_FILE"
      if [ "$VERBOSE" = true ]; then
        echo -e "${BLUE}ℹ${NC} ${message}"
      fi
      ;;
    SUCCESS)
      echo "[${timestamp}] [SUCCESS] ${message}" >> "$LOG_FILE"
      echo -e "${GREEN}✓${NC} ${message}"
      ;;
    ERROR)
      echo "[${timestamp}] [ERROR] ${message}" >> "$LOG_FILE"
      echo -e "${RED}✗${NC} ${message}"
      ;;
    WARNING)
      echo "[${timestamp}] [WARNING] ${message}" >> "$LOG_FILE"
      echo -e "${YELLOW}⚠${NC} ${message}"
      ;;
  esac
}

# Provjera URL-a
check_url() {
  local url=$1
  local name=$2
  
  if [ -z "$name" ]; then
    name="$url"
  fi
  
  log_message "INFO" "Provjera: $name"
  
  # Koristi curl sa timeout-om
  local response=$(curl -s -o /dev/null -w "%{http_code}" \
    --connect-timeout "$TIMEOUT" \
    --max-time "$TIMEOUT" \
    "$url" 2>&1)
  
  local http_code=$(echo "$response" | tail -1)
  
  # Provjera HTTP koda
  if [[ "$http_code" =~ ^[2][0-9]{2}$ ]]; then
    log_message "SUCCESS" "✓ $name - HTTP $http_code"
    return 0
  elif [[ "$http_code" =~ ^[3][0-9]{2}$ ]]; then
    log_message "WARNING" "⚠ $name - Redirect HTTP $http_code"
    return 0
  elif [[ "$http_code" == "000" ]] || [[ -z "$http_code" ]]; then
    log_message "ERROR" "✗ $name - Konekcija nije moguća (timeout ili mrežna greška)"
    return 1
  else
    log_message "ERROR" "✗ $name - HTTP $http_code"
    return 1
  fi
}

# Provjera svih URL-ova
check_all_urls() {
  local urls=("$@")
  local passed=0
  local failed=0
  
  log_message "INFO" "===== HEALTH CHECK POČETAK ====="
  
  for url in "${urls[@]}"; do
    if check_url "$url"; then
      ((passed++))
    else
      ((failed++))
    fi
    
    # Malko čekanja između zahtjeva
    sleep 1
  done
  
  # Sažetak
  echo ""
  log_message "INFO" "===== HEALTH CHECK REZULTAT ====="
  log_message "INFO" "Ukupno: $((passed + failed)) | ✓ Uspješno: $passed | ✗ Neuspješno: $failed"
  
  # Vraćanje exit code-a
  if [ $failed -eq 0 ]; then
    log_message "SUCCESS" "Sve provjere su prošle uspješno!"
    return 0
  else
    log_message "ERROR" "$failed provjera(e) nije(su) prošla uspješno!"
    return 1
  fi
}

# Ispis help-a
show_help() {
  cat << EOF
FIT TRACER - Health Check Script

UPOTREBA:
  ./health-check.sh [OPCIJE]

OPCIJE:
  --local          Provjeri samo lokalne URL-ove (default)
  --cloud          Provjeri Cloud Run URL-ove
  --all            Provjeri sve URL-ove
  --url <URL>      Provjeri custom URL (može se koristiti više puta)
  --verbose        Detaljniji ispis
  --timeout <SEC>  Postavi timeout (default: 10 sekundi)
  --help           Prikaži ovu poruku

PRIMJERI:
  ./health-check.sh
  ./health-check.sh --cloud
  ./health-check.sh --all --verbose
  ./health-check.sh --url https://api.example.com/health

LOGOVI:
  Svi rezultati se čuvaju u: $LOG_FILE

EOF
}

##############################################################################
# Parsiranje argumenata
##############################################################################

URLS_TYPE="local"

while [[ $# -gt 0 ]]; do
  case $1 in
    --local)
      URLS_TYPE="local"
      shift
      ;;
    --cloud)
      URLS_TYPE="cloud"
      shift
      ;;
    --all)
      URLS_TYPE="all"
      shift
      ;;
    --url)
      CUSTOM_URLS+=("$2")
      shift 2
      ;;
    --verbose)
      VERBOSE=true
      shift
      ;;
    --timeout)
      TIMEOUT="$2"
      shift 2
      ;;
    --help)
      show_help
      exit 0
      ;;
    *)
      echo "Nepoznata opcija: $1"
      show_help
      exit 1
      ;;
  esac
done

##############################################################################
# Glavna logika
##############################################################################

# Kreiraj log datoteku ako ne postoji
if [ ! -f "$LOG_FILE" ]; then
  touch "$LOG_FILE"
  log_message "INFO" "Kreirana nova log datoteka: $LOG_FILE"
fi

log_message "INFO" "===== POČETAK HEALTH CHECK-a ====="
log_message "INFO" "Timeout postavljen na: ${TIMEOUT}s"

# Odaberi URL-ove za provjeru
URLS_TO_CHECK=()

case $URLS_TYPE in
  local)
    URLS_TO_CHECK=("${BACKEND_URLS[@]}")
    log_message "INFO" "Mod: Lokalne provjere"
    ;;
  cloud)
    URLS_TO_CHECK=("${CLOUD_RUN_URLS[@]}")
    log_message "INFO" "Mod: Cloud Run provjere"
    ;;
  all)
    URLS_TO_CHECK=("${BACKEND_URLS[@]}" "${CLOUD_RUN_URLS[@]}")
    log_message "INFO" "Mod: Sve provjere"
    ;;
esac

# Dodaj custom URL-ove ako postoje
if [ ${#CUSTOM_URLS[@]} -gt 0 ]; then
  URLS_TO_CHECK+=("${CUSTOM_URLS[@]}")
  log_message "INFO" "Dodani custom URL-ovi: ${#CUSTOM_URLS[@]}"
fi

# Provjeri da li ima URL-ova
if [ ${#URLS_TO_CHECK[@]} -eq 0 ]; then
  log_message "ERROR" "Nema URL-ova za provjeru!"
  exit 1
fi

# Izvrši provjere
check_all_urls "${URLS_TO_CHECK[@]}"
EXIT_CODE=$?

# Završna poruka
log_message "INFO" "===== HEALTH CHECK ZAVRŠEN ====="

exit $EXIT_CODE
