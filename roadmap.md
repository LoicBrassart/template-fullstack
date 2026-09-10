# Plannification

## Step 1 : Infrastructure générique

- ✅ Environnements Docker Compose (`dev`, `e2e`, `stg`) alignés en structure
- ✅ Gateway nginx + healthchecks sur tous les services
- ✅ `makefile` (`run`/`stop` par env)
- ✅ Gabarits de déploiement VPS (`_vps/`) + `readme.md` (Caddyfile, webhook.conf, procédures)
- ✅ `compose.yaml` prd (aligné sur stg, images `:latest` réutilisées)

## Step 2 : Projet web fullstack générique

- ✅ Squelette backend (Node/TS, GraphQL — `entities/`, `resolvers/`)
- ✅ Squelette frontend (Vite + React/TS)
- ✅ Base de données Postgres + Adminer en dev
- ❌ Contenu applicatif générique (auth, modèle de données de base, etc.) — _à définir lors de la discussion frontend/backend_

## Step 3 : Tests et CI

- ✅ Squelette tests unitaires frontend/backend (`_unit-tests/sample.test.ts`) — à étoffer
- ✅ Squelette e2e Playwright (`e2e/tests/example.spec.ts`) — à étoffer
- ✅ CI : tests ciblés sur PR → `dev` (services modifiés uniquement)
- ✅ CI : tests complets + e2e réel sur PR → `staging`
- ❌ bouton "MeP !"
  - ❌ créer changelog
  - ❌ créer tag
  - ❌ créer release

## Step 4 : Déploiement et CD

- ✅ Notify webhook sur push → `dev`
- ✅ Build & push images Docker Hub sur push → `staging`
- ✅ Notify webhook sur push → `main` (prd)
- ✅ Scripts de déploiement VPS (`dev.deploy.sh`, `stg.deploy.sh`, `prd.deploy.sh`)
- ❌ Rollback documenté/outillé en cas d'échec de déploiement stg/prd
