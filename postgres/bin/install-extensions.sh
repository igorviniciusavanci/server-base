#!/bin/bash
set -e

echo "Installing extensions..."
psql -v ON_ERROR_STOP=1 --dbname $POSTGRES_DB --username "$POSTGRES_USER" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
echo "Extensions successfully installed!"
