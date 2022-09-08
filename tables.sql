-- Active: 1659189503693@@35.226.146.116@3306@guimaraes-4211185-crhistian-silva
CREATE TABLE IF NOT EXISTS NOME_TABELA_BANDAS (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  music_genre VARCHAR(255) NOT NULL,
  responsible VARCHAR(255) UNIQUE NOT NULL 
);

CREATE TABLE IF NOT EXISTS NOME_TABELA_SHOWS (
  id VARCHAR(255) PRIMARY KEY,
  week_day VARCHAR(255) NOT NULL,
  start_time INT NOT NULL,
  end_time INT NOT NULL,
  band_id VARCHAR(255) NOT NULL,
  FOREIGN KEY(band_id) REFERENCES NOME_TABELA_BANDAS(id)
);

CREATE TABLE IF NOT EXISTS NOME_TABELA_INGRESSOS (
  id VARCHAR(255) PRIMARY KEY,
  name_ticket VARCHAR(255) NOT NULL,
  value_ticket INT NOT NULL,
  id_event VARCHAR(255) NOT NULL,
  total_tickets INT NOT NULL,
  sales_tickets INT NOT NULL DEFAULT 0, 
  FOREIGN KEY(id_event) REFERENCES NOME_TABELA_SHOWS(id)
);

CREATE TABLE IF NOT EXISTS NOME_TABELAS_USUÁRIOS (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);

describe NOME_TABELAS_USUÁRIOS;

drop table NOME_TABELA_INGRESSOS;