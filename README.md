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
## Running Integration tests
First you need to set up WMS project. Make sure that you have the following .env
```env
CONTROL_TOWER_URL="http://localhost:3000"
DATABASE_URL="postgresql://test:test@localhost:5436/test?schema=public"
```

On it project you need to run the following command:
```bash
$ npm run pre:test
```
After that you can run on this project the following command:
```bash
$ npm run test:integration
```
Please note that after running the integration tests you need to remove the test database
```bash
$ docker-compose -f docker-compose-test.yml down -v
```