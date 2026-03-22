# Prérequis

- VPS disponible
- Caddy installé et configuré
- Webhook installé et configuré

# Informations

## Arborescence utilisée:

```
~/                  Home de l'utilisateur courant
|- www/apps/        Répertoire contenant tout le code de nos apps
    |- app1/
        |- dev/     Env de test, lancé depuis le code TS
        |- stg/     Env de test, lancé depuis les images DockerHub
        |- prd/     Env public, lancé depuis les images DockerHub
    |- app2/
    |- ...
```

## Exemples de fichiers de configuration

### /etc/caddy/Caddyfile

- Chaque bloc dans ce fichier concerne une _app_ distincte.
  - Le numéro de port doit correspondre avec le port ouvert pour le container gateway (nginx) de l'app concernée.
- Le bloc concernant les hooks ne doit pas être supprimé: c'est lui qui permet à webhook de recevoir les appels depuisl l'extérieur

### /etc/webhook.conf

- Chaque bloc dans ce fichier concerne un _environnement_ distinct.
  - L'`id` doit être unique et sera visible dans l'url du hook à appeler
  - `execute-command` peut être une commande système ou un script bash exécutable
  - `command-working-directory` représente le dossier dans lequel la comande précédente doit être lancée

# Procédure de déploiement sur VPS

## dev

### premier déploiement

- `cd ~/www/apps/[APP]`
- `git clone [REPO] dev`
- `cd dev`
- `git checkout dev`
- `npm run dev`

### déploiement continu

- `~/www/apps/[APP]`
- `nano dev.deploy.sh` (coller le contenu du fichier proposé)
- `chmod 764 dev.deploy.sh`
- `./dev.deploy.sh` (vérifier la bonne exécution)
- `sudo nano /etc/webhook.conf` (ajouter le hook qui appellera `dev.deploy.sh`)
- `sudo service webhook restart`
- Appeler le hook (vérifier les logs des containers, pas de restart mais volumes de synchro)

## stg

### premier déploiement

- `cd ~/www/apps/[APP]`
- `mkdir stg`
- `cd stg`
- `nano compose.yaml` (coller le contenu du fichier proposé)
- `nano .env` (coller le contenu du fichier proposé)
- `docker compose up -d`

### déploiement continu

- `~/www/apps/[APP]`
- `nano stg.deploy.sh` (coller le contenu du fichier proposé)
- `chmod 764 stg.deploy.sh`
- `./stg.deploy.sh` (vérifier la bonne exécution)
- `sudo nano /etc/webhook.conf` (ajouter le hook qui appellera `stg.deploy.sh`)
- `sudo service webhook restart`
- Appeler le hook (vérifier que les containers de stg sont détruits puis recréés)
