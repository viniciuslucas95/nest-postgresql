#!/bin/bash
export PGPASSWORD='superpostgresql'
psql -U 'superpostgresql' <<- EOSQL
    CREATE DATABASE api;
    CREATE ROLE api WITH
    	LOGIN
	    NOSUPERUSER
	    NOCREATEDB
	    NOCREATEROLE
	    INHERIT
	    NOREPLICATION
	    CONNECTION LIMIT -1
	    PASSWORD 'api';
    GRANT CONNECT ON DATABASE api TO api;
EOSQL
psql -U 'superpostgresql' -d 'api' <<- EOSQL
    CREATE TABLE IF NOT EXISTS alunos (
      cpf BIGINT PRIMARY KEY,
      nome VARCHAR NOT NULL,
      data_insercao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE public.alunos TO api;
EOSQL