-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

CREATE DATABASE alemDos90Minutos;
USE alemDos90Minutos;

CREATE TABLE significado(
  idSignificado INT PRIMARY KEY AUTO_INCREMENT,
  nomeSignificado VARCHAR(40)
);

CREATE TABLE competencia(
  idCompetencia INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45)
);

CREATE TABLE usuario(
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(25),
  email VARCHAR(50) CONSTRAINT chk_email CHECK (email LIKE '%@%') UNIQUE,
  senha VARCHAR(30),
  fkSignificado INT,
  FOREIGN KEY (fkSignificado) REFERENCES significado(idSignificado)
);

CREATE TABLE habilidade(
  idHabilidade INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45),
  nivel INT CONSTRAINT chk_nivel CHECK (nivel BETWEEN 0 AND 100),
  fkUsuario INT NOT NULL,
  FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE comentario(
  idComentario INT PRIMARY KEY AUTO_INCREMENT,
  texto VARCHAR(250),
  data_publicacao DATE,
  fkUsuario INT UNIQUE,
  FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE usuario_competencia(
  fkUsuario INT,
  fkCompetencia INT,
  PRIMARY KEY (fkUsuario, fkCompetencia),
  FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
  FOREIGN KEY (fkCompetencia) REFERENCES competencia(idCompetencia)
);

INSERT INTO significado (nomeSignificado) VALUES
  ('Autoconhecimento'),
  ('Crescimento profissional'),
  ('Propósito'),
  ('Conexão com pessoas'),
  ('Liberdade');

INSERT INTO competencia (nome) VALUES
  ('Comunicação'),
  ('Trabalho em equipe'),
  ('Liderança'),
  ('Resolução de problemas'),
  ('Criatividade'),
  ('Organização');

INSERT INTO usuario (nome, email, senha, fkSignificado) VALUES
  ('Alexandriny', 'alexandriny@gmail.com', 'senha123', 1);

INSERT INTO habilidade (nome, nivel, fkUsuario) VALUES
  ('Velocidade', 75, 1),
  ('Finalização', 75, 1),
  ('Passe', 80, 1),
  ('Drible', 60, 1),
  ('Defesa', 90, 1),
  ('Força', 65, 1),
  ('Visão de jogo', 70, 1),
  ('Resistência', 80, 1);

INSERT INTO usuario_competencia (fkUsuario, fkCompetencia) VALUES
  (1, 1),
  (1, 2);

INSERT INTO comentario (texto, data_publicacao, fkUsuario) VALUES
  ('Futebol pra mim vai além dos 90 minutos', '2026-11-18', 1);

SELECT * FROM significado;
SELECT * FROM competencia;
SELECT * FROM usuario;

SELECT s.nomeSignificado AS nome, COUNT(u.idUsuario) AS votos
FROM significado s
LEFT JOIN usuario u ON u.fkSignificado = s.idSignificado
GROUP BY s.idSignificado, s.nomeSignificado
ORDER BY s.idSignificado;

SELECT idUsuario, nome, email FROM usuario;
SHOW DATABASES;

SELECT u.idUsuario, u.nome, c.nome AS competencia
FROM usuario_competencia uc
JOIN usuario u ON u.idUsuario = uc.fkUsuario
JOIN competencia c ON c.idCompetencia = uc.fkCompetencia
ORDER BY u.idUsuario, c.idCompetencia;
