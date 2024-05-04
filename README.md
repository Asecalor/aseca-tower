# Control Tower

## Proyect Set Up

You should create an `env` file in the root of the proyect and add the following variables:

```
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=control-tower
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/control-tower"
```

## Run Container
To run the container, run the following command on the terminal
```bash
docker compose up --build
```