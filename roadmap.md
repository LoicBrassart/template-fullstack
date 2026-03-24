# Plannification

## Step 1 : Infrastructure générique

- dossier `_env`
- makefile
- package.json
  - ? bump des packages
  - ? workspaces
  - ? outils git
  - ? linter
- CI
  - ? pull_request_template.md
  - ? CODEOWNERS

## Step 2 : Projet web fullstack générique

- frontend Vite classique
- backend GraphQL (requete "health")
- Postgres
- Gateway Nginx
- Dockerisation `dev`

## Step 3 : Tests et CI

- tests unit/inté avec Vitest pour chaque conrtainer
- tests e2e avec Playwright
  - env GHub (complet, pour execution PWright)
- Dockerisation CI `stg`
  - Dockerfiles spécifiques (build)
  - env GHub (de quoi envoyer les images sur DHub)
- CI
  - PR>dev
    - lancer les tests unit/inté touched
  - PR>stg
    - lancer tous les tests unit/inté
    - lancer PWright
  - push>staging
    - build images
    - images -> DHub
  - ❌ bouton "MeP !"
    - créer changelog
    - créer tag
    - créer release

## Step 4 : Déploiement et CD

- installer les environnements sur le vps
  - dev
    - .env
    - git clone du projet
    - git checkout dev
    - make run dev
  - stg
    - .env
    - `compose.yaml`
    - docker compose up -d
  - prd
    - .env
    - `compose.yaml`
    - docker compose up -d
- configurer les outils du VPS
  - Caddy
  - WebHooks
- CD
  - push>dev -> ping vps
    - cd dev
    - git pull origin dev
  - push>staging -> ping vps
    - cd stg
    - docker compose up
  - bouton "MeP !" -> ping vps
    - cd prd
    - docker compose up

## Step 5 : Sauvegarde des données

- Mettre en place les migrations TypeORM pour les environnements stg/prd
- Creation d'un backup de prd, hébergé sur un GDrive
- Crontab sur le backup
- Restaurer un backup vers stg, depuis un GDrive
