var database = require("../database/config");

function listarSignificados() {
    console.log("ACESSEI O PAINEL MODEL \n function listarSignificados()");
    var instrucaoSql = `
        SELECT s.nomeSignificado AS nome, COUNT(us.fkUsuario) AS votos
        FROM significado s
        LEFT JOIN usuario_significado us ON us.fkSignificado = s.idSignificado
        GROUP BY s.idSignificado, s.nomeSignificado
        ORDER BY s.idSignificado;
    `;
    return database.executar(instrucaoSql);
}

function buscarMeuSignificado(idUsuario) {
    console.log("ACESSEI O PAINEL MODEL \n function buscarMeuSignificado():", idUsuario);
    var instrucaoSql = `
        SELECT s.nomeSignificado AS nome
        FROM usuario_significado us
        JOIN significado s ON s.idSignificado = us.fkSignificado
        WHERE us.fkUsuario = ?;
    `;
    return database.executar(instrucaoSql, [idUsuario]);
}

function enviarSignificado(idUsuario, nomeSignificado) {
    console.log("ACESSEI O PAINEL MODEL \n function enviarSignificado():", idUsuario, nomeSignificado);

    return database
        .executar("DELETE FROM usuario_significado WHERE fkUsuario = ?;", [idUsuario])
        .then(function () {
            var instrucaoSql = `
                INSERT INTO usuario_significado (fkUsuario, fkSignificado)
                SELECT ?, idSignificado
                FROM significado
                WHERE nomeSignificado = ?;
            `;
            return database.executar(instrucaoSql, [idUsuario, nomeSignificado]);
        });
}

function listarHabilidades(idUsuario) {
    console.log("ACESSEI O PAINEL MODEL \n function listarHabilidades():", idUsuario);
    var instrucaoSql = `
        SELECT nome, nivel
        FROM habilidade
        WHERE fkUsuario = ?
        ORDER BY idHabilidade;
    `;
    return database.executar(instrucaoSql, [idUsuario]);
}

function salvarHabilidades(idUsuario, habilidades) {
    console.log("ACESSEI O PAINEL MODEL \n function salvarHabilidades():", idUsuario);

    var linhas = [];
    for (var i = 0; i < habilidades.length; i++) {
        linhas.push([habilidades[i].nome, habilidades[i].nivel, idUsuario]);
    }

    return database
        .executar("DELETE FROM habilidade WHERE fkUsuario = ?;", [idUsuario])
        .then(function () {
            return database.executar(
                "INSERT INTO habilidade (nome, nivel, fkUsuario) VALUES ?;",
                [linhas]
            );
        });
}

function listarMediaHabilidades() {
    var instrucaoSql = `
            SELECT nome, ROUND(AVG(nivel), 0) AS nivel
            FROM habilidade
            GROUP BY nome
            ORDER BY FIELD(nome, 'Velocidade', 'Finalização', 'Passe', 'Drible', 'Defesa', 'Força', 'Visão de jogo', 'Resistência');
        `;
    return database.executar(instrucaoSql);
}

function listarCompetencias() {
    console.log("ACESSEI O PAINEL MODEL \n function listarCompetencias()");

    var instrucaoSql = `
        SELECT c.nome,
               COUNT(uc.fkUsuario) AS votos,
               ROUND(AVG(uc.fkUsuario IS NOT NULL) * 100, 1) AS media
        FROM competencia c
        JOIN usuario u
        LEFT JOIN usuario_competencia uc 
            ON uc.fkUsuario = u.idUsuario
            AND uc.fkCompetencia = c.idCompetencia
        GROUP BY c.idCompetencia, c.nome
        ORDER BY c.idCompetencia;
    `;

    return database.executar(instrucaoSql);
}

function buscarMinhasCompetencias(idUsuario) {
    console.log("ACESSEI O PAINEL MODEL \n function buscarMinhasCompetencias():", idUsuario);
    var instrucaoSql = `
        SELECT c.nome
        FROM usuario_competencia uc
        JOIN competencia c ON c.idCompetencia = uc.fkCompetencia
        WHERE uc.fkUsuario = ?;
    `;
    return database.executar(instrucaoSql, [idUsuario]);
}

function enviarCompetencias(idUsuario, nomes) {
    console.log("ACESSEI O PAINEL MODEL \n function enviarCompetencias():", idUsuario, nomes);

    return database
        .executar("DELETE FROM usuario_competencia WHERE fkUsuario = ?;", [idUsuario])
        .then(function () {
            var instrucaoSql = `
                INSERT INTO usuario_competencia (fkUsuario, fkCompetencia)
                SELECT ?, idCompetencia
                FROM competencia
                WHERE nome IN (?);
            `;
            return database.executar(instrucaoSql, [idUsuario, nomes]);
        });
}

function listarComentarios() {
    console.log("ACESSEI O PAINEL MODEL \n function listarComentarios()");
    var instrucaoSql = `
        SELECT c.fkUsuario AS idUsuario,
               u.nome,
               c.texto,
               DATE_FORMAT(c.data_publicacao, '%d/%m/%Y') AS data
        FROM comentario c
        JOIN usuario u ON u.idUsuario = c.fkUsuario
        ORDER BY c.idComentario DESC;
    `;
    return database.executar(instrucaoSql);
}

function publicarComentario(idUsuario, texto) {
    console.log("ACESSEI O PAINEL MODEL \n function publicarComentario():", idUsuario);
    var instrucaoSql = `
        INSERT INTO comentario (texto, data_publicacao, fkUsuario)
        VALUES (?, CURDATE(), ?);
    `;
    return database.executar(instrucaoSql, [texto, idUsuario]);
}

function apagarComentario(idUsuario) {
    console.log("ACESSEI O PAINEL MODEL \n function apagarComentario():", idUsuario);
    var instrucaoSql = `
        DELETE FROM comentario WHERE fkUsuario = ?;
    `;
    return database.executar(instrucaoSql, [idUsuario]);
}

module.exports = {
    listarSignificados,
    buscarMeuSignificado,
    enviarSignificado,
    listarHabilidades,
    listarMediaHabilidades,
    salvarHabilidades,
    listarCompetencias,
    buscarMinhasCompetencias,
    enviarCompetencias,
    listarComentarios,
    publicarComentario,
    apagarComentario
};