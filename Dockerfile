FROM postgres:15

RUN apt-get update && apt-get install -y wget unzip

WORKDIR /docker-entrypoint-initdb.d

RUN wget https://github.com/f1db/f1db/releases/download/v2025.0.1/f1db-sql-postgresql.zip \
    && unzip f1db-sql-postgresql.zip \
    && rm f1db-sql-postgresql.zip

ENV POSTGRES_DB=f1db \
    POSTGRES_USER=f1user \
    POSTGRES_PASSWORD=f1password

EXPOSE 5432
