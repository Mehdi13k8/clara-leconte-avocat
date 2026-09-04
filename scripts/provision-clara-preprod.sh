#!/usr/bin/env bash
#
# scripts/provision-clara-preprod.sh
#
# Câblage Azure unique pour la préproduction de Clara. Ne crée PAS le DNS
# (il est chez IONOS, `az` n'y a pas accès) et ne touche à AUCUN
# sitecontainer de production (proxy / novagentic / palier / clara).
#
# Ce que ce script fait, et rien d'autre :
#   1. rattache le nom d'hôte preprod.claraleconteavocat.com au Web App ;
#   2. demande un certificat managé et le lie en SNI.
#
# Le sitecontainer `clara-preprod` lui-même est créé par le workflow
# « Deploy Clara preprod » au premier déploiement. Tant qu'il n'existe pas,
# nginx répond 502 sur ce nom d'hôte — c'est attendu.
#
# Prérequis, dans l'ordre :
#   1. Chez IONOS, sur la zone claraleconteavocat.com, deux entrées :
#
#        CNAME  preprod        → novagentic-htf8ezc8a8e9aya8.francecentral-01.azurewebsites.net
#        TXT    asuid.preprod  → 2CF8571789D6BB326B7934E97E0F2127F17D68560775C2FEA110D2BF840117FD
#
#      Le TXT est la preuve de propriété exigée par Azure ; sans lui,
#      `hostname add` échoue même si le CNAME résout. La valeur est
#      `customDomainVerificationId` du Web App, commune à tous ses domaines.
#
#      Attention : ne touchez pas aux enregistrements de l'apex
#      (claraleconteavocat.com, A + TXT). La production passe par eux.
#
#   2. az login, avec accès au groupe de ressources Novagentic_group
#   3. proxy/nginx.conf (dépôt Novagentic_group) contient déjà le bloc
#      server preprod.claraleconteavocat.com, et le proxy a été redéployé
#
# Puis :
#   bash scripts/provision-clara-preprod.sh
#   # Actions → « Deploy Clara preprod » → Run workflow (ou push sur pre-prod)
#   curl -sI https://preprod.claraleconteavocat.com/
#
set -euo pipefail

RESOURCE_GROUP="${AZURE_RESOURCE_GROUP:-Novagentic_group}"
APP_NAME="${AZURE_WEBAPP_NAME:-Novagentic}"
HOSTNAME="preprod.claraleconteavocat.com"
AZURE_DNS="novagentic-htf8ezc8a8e9aya8.francecentral-01.azurewebsites.net"

if ! command -v az >/dev/null 2>&1; then
  echo "ERREUR : Azure CLI ('az') introuvable. Installation : https://aka.ms/azcli" >&2
  exit 1
fi
if ! az account show --output none 2>/dev/null; then
  echo "ERREUR : pas de session Azure CLI. Lancez 'az login'." >&2
  exit 1
fi

echo "=== DNS (à faire chez IONOS, az n'y a pas la main) ==="
echo "  CNAME preprod       → ${AZURE_DNS}"
echo "  TXT   asuid.preprod → $(az webapp show -g "$RESOURCE_GROUP" -n "$APP_NAME" \
                                 --query customDomainVerificationId -o tsv | tr -d '\r')"
echo

if ! getent hosts "$HOSTNAME" >/dev/null 2>&1 && ! host "$HOSTNAME" >/dev/null 2>&1; then
  echo "STOP : ${HOSTNAME} ne résout pas encore." >&2
  echo "       Azure vérifie le nom d'hôte avant de l'accepter. Ajoutez les deux" >&2
  echo "       entrées ci-dessus, attendez la propagation, relancez ce script." >&2
  exit 1
fi

echo "=== Rattachement du nom d'hôte au Web App ${APP_NAME} ==="
if az webapp config hostname list -g "$RESOURCE_GROUP" --webapp-name "$APP_NAME" \
    --query "[?name=='${HOSTNAME}'].name" -o tsv | tr -d '\r' | grep -qx "$HOSTNAME"; then
  echo "déjà rattaché : ${HOSTNAME}"
else
  az webapp config hostname add -g "$RESOURCE_GROUP" --webapp-name "$APP_NAME" \
    --hostname "$HOSTNAME"
fi

echo "=== Certificat managé + liaison SNI ==="
# `az webapp config ssl list` est à l'échelle du groupe de ressources et
# n'accepte pas --name ; on interroge le certificat par son nom.
thumbprint="$(az webapp config ssl show -g "$RESOURCE_GROUP" --certificate-name "$HOSTNAME" \
  --query thumbprint -o tsv 2>/dev/null || true)"
thumbprint="${thumbprint//$'\r'/}"
if [[ -z "$thumbprint" || "$thumbprint" == "null" ]]; then
  az webapp config ssl create -g "$RESOURCE_GROUP" --name "$APP_NAME" --hostname "$HOSTNAME"
  thumbprint="$(az webapp config ssl show -g "$RESOURCE_GROUP" --certificate-name "$HOSTNAME" \
    --query thumbprint -o tsv)"
  thumbprint="${thumbprint//$'\r'/}"
fi
if [[ -n "$thumbprint" && "$thumbprint" != "null" ]]; then
  az webapp config ssl bind -g "$RESOURCE_GROUP" -n "$APP_NAME" \
    --certificate-thumbprint "$thumbprint" --ssl-type SNI --output none
  echo "TLS lié (${thumbprint:0:8}…)"
else
  echo "ATTENTION : pas encore d'empreinte de certificat. Relancez après vérification du DNS." >&2
fi

echo "=== App Settings pour le port du sidecar (références sitecontainers) ==="
# Azure sitecontainers: environmentVariables[].value is an App Setting *name*,
# not a literal. Without these, NITRO_PORT resolves empty → listen :3000 →
# EADDRINUSE → Azure cancels startup for the whole shared Web App.
az webapp config appsettings set -g "$RESOURCE_GROUP" -n "$APP_NAME" --settings \
  CLARA_PREPROD_PORT=3004 \
  CLARA_PREPROD_NITRO_PORT=3004 \
  CLARA_PREPROD_NITRO_HOST=0.0.0.0 \
  --output none
echo "CLARA_PREPROD_PORT / NITRO_PORT / NITRO_HOST OK"

echo
echo "Reste à faire :"
echo "  # Actions → « Deploy Clara preprod » → Run workflow"
echo "  curl -sI https://${HOSTNAME}/"
echo "  # doit renvoyer 200 et l'en-tête X-Robots-Tag: noindex"
