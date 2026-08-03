Ce fichier guide les agents IA travaillant sur ce repo. Portée : infra/tooling (`_env/`, `_vps/`, `.github/`, `makefile`, `package.json` racine).
Le frontend et le backend ont chacun leurs propres conventions (voir frontend/AGENTS.md et backend/AGENTS.md si présents).

## Commandes

```bash
make run <env> # démarre l'environnement (dev, e2e, stg)
make stop <env> # arrête un environnement (dev, e2e, stg)
```

Ne jamais lancer une commande Docker sans passer par le makefile sauf pour du diagnostic ponctuel (ex. `docker compose run --rm --entrypoint sh <service>`).

## Environnements (`_env/`)

- `dev`: développement local, inclut adminer, DB sur volume nommé db_data
- `e2e`: tests Playwright, pas de DB persistante, rapports dans `_artifacts/`
- `stg`: build CI déployé sur VPS, pas de compose local, image buildée puis poussée sur Docker Hub
- `prd`: pas d'environnement local, réutilise les images `:latest` poussées lors du build `stg` (voir `_vps/readme.md`)

### CI/CD

- PR sur branche "dev":
  - exécution des tests unitaires/d'intégration sur les services touchés
- Push sur branche "dev":
  - ping du serveur d'hébergement (déploiement auto éventuel)
- PR sur branche "staging":
  - exécution de tous les tests (unitaires/integration/end-to-end)
- Push sur branche "staging":
  - build des images services + envoi vers Dockerhub
  - ping du serveur d'hébergement (déploiement auto éventuel)

## Limites

### Toujours faire

- Utiliser `make` plutôt que des commandes docker/compose brutes pour tout ce qui touche au cycle de vie des environnements.
- Garder `_env/dev`, `_env/e2e`, `_env/stg` alignés en structure (même services, mêmes noms de variables .env) sauf besoin explicite.
- Vérifier l'historique GitHub Actions avant de déclarer un pipeline cassé.

### Demander avant

- Toute modification dans `_vps/` (scripts et config de déploiement de production/staging réels).
- Toute modification des workflows `.github/workflows/*.yaml` qui touche aux secrets ou aux webhooks de déploiement.
- Changer une version d'image/action pinnée (Node, Postgres, actions GitHub) — vérifier la compatibilité plutôt que bumper par réflexe.

### Ne jamais faire

- Committer un fichier `.env` (seuls les `.env.sample` sont versionnés).
