-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/
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
  ('Válvula de escape');
  
INSERT INTO usuario (nome, email, senha, fkSignificado) VALUES
  ('Alexandriny', 'alexandriny@gmail.com', 'senha123', 1);
  
INSERT INTO habilidade (nome, nivel, fkUsuario) VALUES
  ('Chute', 75, 1),
  ('Drible', 60, 1),
  ('Velocidade', 75, 1),
  ('Agilidade', 90, 1),
  ('Passe', 80, 1),
  ('Marcação', 90, 1);
  
INSERT INTO competencia (nome) VALUES
  ('Trabalho em equipe'),
  ('Liderança'),
  ('Comunicação'),
  ('Disciplina'),
  ('Resiliência');

INSERT INTO usuario_competencia (fkUsuario, fkCompetencia) VALUES
  (1, 1),
  (1, 3);
  
INSERT INTO comentario (texto, data_publicacao, fkUsuario) VALUES
  ('Futebol pra mim vai além dos 90 minutos', '2026-11-18', 1);
  
  
  
-- usuario_competencia para competencia
-- comentario para usuario

SELECT s.nomeSignificado, 
u.nome
FROM significado AS s LEFT JOIN usuario AS u
ON s.idSignificado = u.fkSignificado;

SELECT c.nome
FROM usuario_competencia uc
JOIN competencia c ON c.idCompetencia = uc.fkCompetencia
WHERE uc.fkUsuario = 1;

  
  SELECT u.nome, h.nome AS habilidade, h.nivel
FROM habilidade h
JOIN usuario u ON u.idUsuario = h.fkUsuario;

SELECT u.nome, c.nome AS competencia
FROM usuario u
JOIN usuario_competencia uc ON uc.fkUsuario = u.idUsuario
JOIN competencia c ON c.idCompetencia = uc.fkCompetencia;
	SELECT * FROM usuario;
    DELETE FROM usuario WHERE idUsuario = 18