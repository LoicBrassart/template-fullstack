# Prérequis

- VPS disponible
- Caddy installé et configuré
- Webhook installé et configuré
- make installé

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

```
# Default
<domain.tld> {
        root * /usr/share/caddy
        file_server
}

# Webhooks
hooks.<domain.tld> {
        reverse_proxy localhost:9000
}

# DEV du projet <appname>
dev.<appname>.<domain.tld> {
        reverse_proxy localhost:8001
}

# STG du projet <appname>
stg.<appname>.<domain.tld> {
        reverse_proxy localhost:8002
}

# PRD du projet <appname>
<appname>.<domain.tld> {
        reverse_proxy localhost:8003
}
```

- Chaque bloc dans ce fichier concerne une app distincte.
  - Le numéro de port doit correspondre avec le port ouvert pour le container gateway (nginx) de l'app concernée.
- Le bloc concernant les hooks ne doit pas être supprimé: c'est lui qui permet à webhook de recevoir les appels depuisl l'extérieur

### /etc/webhook.conf

```
[
  {
    "id": "dev-<appname>",
    "execute-command": "/home/ubuntu/www/apps/<appname>/dev.deploy.sh",
    "command-working-directory": "/home/ubuntu/www/apps/<appname>"
  },
  {
    "id": "stg-<appname>",
    "execute-command": "/home/ubuntu/www/apps/<appname>/stg.deploy.sh",
    "command-working-directory": "/home/ubuntu/www/apps/<appname>"
  },
  {
    "id": "prd-<appname>",
    "execute-command": "/home/ubuntu/www/apps/<appname>/prd.deploy.sh",
    "command-working-directory": "/home/ubuntu/www/apps/<appname>"
  }
]
```

# Procédure de déploiement sur VPS

## dev

### premier déploiement

- `cd ~/www/apps/<appname>`
- `git clone [REPO] dev`
- `cd dev`
- `git checkout dev`
- `make run dev`

### déploiement continu

- `~/www/apps/<appname>`
- `nano dev.deploy.sh` (coller le contenu du fichier proposé)
- `chmod 764 dev.deploy.sh`
- `./dev.deploy.sh` (vérifier la bonne exécution)
- `sudo nano /etc/webhook.conf` (ajouter le hook qui appellera `dev.deploy.sh`)
- `sudo service webhook restart`
- Appeler le hook (vérifier les logs des containers, pas de restart mais volumes de synchro)

## stg

### premier déploiement

- `cd ~/www/apps/<appname>`
- `mkdir stg`
- `cd stg`
- `nano compose.yaml` (coller le contenu du fichier proposé)
- `nano .env` (coller le contenu du fichier proposé)
- `docker compose up -d`

### déploiement continu

- `~/www/apps/<appname>`
- `nano stg.deploy.sh` (coller le contenu du fichier proposé)
- `chmod 764 stg.deploy.sh`
- `./stg.deploy.sh` (vérifier la bonne exécution)
- `sudo nano /etc/webhook.conf` (ajouter le hook qui appellera `stg.deploy.sh`)
- `sudo service webhook restart`
- Appeler le hook (vérifier que les containers de stg sont détruits puis recréés)
