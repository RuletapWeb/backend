# Strapi - CMS
This repository is meant to have a simple, quick and easy way to deploy a Strapi instance using Docker and Docker Compose.

The docker-compose.yml file is deploying the following services:

- Strapi
- MongoDB

## Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

Once Docker and Docker-Compose are installed you need to run the following commands in the root directory where you downloaded this repo.

```bash
$ docker-compose pull
```
After completion, run the following command:
```bash
$ docker-compose up -d
```

## Access

The Strapi WebConsole: http://localhost:1337/admin/

The MongoDB: http://localhost:27017
