# Control Tower

## Installation
```bash
$ npm install
```
## Project Configuration

You should create an .env file in the root of the project and add the following variables:

```env
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=control-tower
DATABASE_URL=postgresql://postgres:postgres@control-tower-db:5432/control-tower
```

## Running the Container
To run the container, execute the following command in the terminal:
```bash
$ docker compose up --build
```
## Running Unit tests
```bash
$ npm run test:unit
```