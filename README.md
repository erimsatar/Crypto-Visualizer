# Crypto-Visualizer
Cryptocurrencies Historical Price Visualization

In .env of server give the necessary database credentials for posgresql and mongodb.
Example .env
'''
MONGO_URL="mongodb://host.docker.internal:27017/crypto"
PG_USER="erim"
PG_HOST="localhost"
PG_DATABASE="postgres"
PG_PASSWORD=""
PG_PORT=5432
PORT=3000
'''
Then run the command below to build and run the docker image.
'''bash
docker-compose up --build
'''