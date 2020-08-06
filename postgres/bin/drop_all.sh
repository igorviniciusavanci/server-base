#!/bin/bash
set -e

echo "Droping all database"
psql -h db-avanci -U avanci avancidb -a -q -c 'DROP SCHEMA public CASCADE;' -c 'CREATE SCHEMA public;' -c 'GRANT ALL ON SCHEMA public TO postgres;' -c 'GRANT ALL ON SCHEMA public TO public;'

echo "Database empty"