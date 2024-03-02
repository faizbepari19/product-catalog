# Product-Catalog

This project contains REST APIs to manage products and invoice

## Requirements

Make sure `docker` and `docker-compose` is installed.

## To start the multi-container app

Clone the repository.

```bash
docker compose build
docker compose up
```

## .env

Add a .env file in the root directory with following content.

```
PORT=3001
MYSQL_HOST=db4free.net
MYSQL_PORT=3306
MYSQL_USERNAME=sql6506249
MYSQL_PASSWORD = fcm1MqlMgF
MYSQL_DB = file_analyser
MYSQL_SERVER=mysql
```

## Monitoring 

I have used prometheus, grafana and grafano-loki for monitoring and logging purpose.
Open localhost:9090 to access prometheus
Open localhost:3000 to access grafana. Login with default credentials admin/admin to log-in into grafana. Add your data source as prometheus and loki. Create your dashboard to view all the required metrics