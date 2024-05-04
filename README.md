# Control Tower

## Proyect Set Up

You should create an `.env` file in the root of the proyect and add the following variables:

```env
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=db-name
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/db-name
```

## Run Container
To run the container, run the following command on the terminal
```bash
docker compose up --build
```