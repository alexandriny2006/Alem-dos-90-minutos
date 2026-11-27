var painelModel = require("../models/painelModel");

function responderErro(res, mensagem, erro) {
    console.log("\n" + mensagem, erro);
    res.status(500).json(erro.sqlMessage || erro.message);
}

function listarSignificados(req, res) {
    painelModel.listarSignificados()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            responderErro(res, "Houve um erro ao listar os significados! Erro: ", erro);
        });
}

function buscarMeuSignificado(req, res) {
    var idUsuario = req.params.idUsuario;

    if (isNaN(idUsuario)) {
        res.status(400).send("O id do usuário é inválido!");
    } else {
        painelModel.buscarMeuSignificado(idUsuario)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                responderErro(res, "Houve um erro ao buscar o seu significado! Erro: ", erro);
            });
    }
}

function enviarSignificado(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var significado = req.body.significadoServer;

    if (idUsuario == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else if (significado == undefined) {
        res.status(400).send("O significado está undefined!");
    } else {
        painelModel.enviarSignificado(idUsuario, significado)
            .then(function (significado) {
                res.json(significado);
            })
            .catch(function (erro) {
                responderErro(res, "Houve um erro ao enviar o significado! Erro: ", erro);
            });
    }
}

function listarHabilidades(req, res) {
    var idUsuario = req.params.idUsuario;

    if (isNaN(idUsuario)) {
        res.status(400).send("O id do usuário é inválido!");
    } else {
        painelModel.listarHabilidades(idUsuario)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                responderErro(res, "Houve um erro ao listar as habilidades! Erro: ", erro);
            });
    }
}

function salvarHabilidades(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var habilidades = req.body.habilidadesServer;

    if (idUsuario == undefined) {
        res.status(400).send("O id do usuário está undefined!");
        return;
    }
    if (!Array.isArray(habilidades) || habilidades.length == 0) {
        res.status(400).send("As habilidades precisam ser uma lista com pelo menos 1 item!");
        return;
    }

    var lista = [];
    for (var i = 0; i < habilidades.length; i++) {
        var nome = habilidades[i].nome;
        var nivel = Number(habilidades[i].nivel);

        if (typeof nome != "string" || nome == "" || nome.length > 45) {
            res.status(400).send("Nome de habilidade inválido (até 45 letras)!");
            return;
        }
        if (isNaN(nivel) || nivel < 0 || nivel > 100) {
            res.status(400).send("A nota de " + nome + " precisa ser de 0 a 100!");
            return;
        }

        lista.push({ nome: nome, nivel: Math.round(nivel) });
    }

    painelModel.salvarHabilidades(idUsuario, lista)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            responderErro(res, "Houve um erro ao salvar as habilidades! Erro: ", erro);
        });
}

function listarMediaHabilidades(req, res) {
    painelModel.listarMediaHabilidades()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            responderErro(res, "Houve um erro ao calcular a média das habilidades! Erro: ", erro);
        });
}

function listarCompetencias(req, res) {
    painelModel.listarCompetencias()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            responderErro(res, "Houve um erro ao listar as competências! Erro: ", erro);
        });
}

function buscarMinhasCompetencias(req, res) {
    var idUsuario = req.params.idUsuario;

    if (isNaN(idUsuario)) {
        res.status(400).send("O id do usuário é inválido!");
    } else {
        painelModel.buscarMinhasCompetencias(idUsuario)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                responderErro(res, "Houve um erro ao buscar as suas competências! Erro: ", erro);
            });
    }
}

function enviarCompetencias(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var competencias = req.body.competenciasServer;

    if (idUsuario == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else if (!Array.isArray(competencias) || competencias.length == 0) {
        res.status(400).send("Escolha pelo menos uma competência!");
    } else {
        painelModel.enviarCompetencias(idUsuario, competencias)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                responderErro(res, "Houve um erro ao enviar as competências! Erro: ", erro);
            });
    }
}

function listarComentarios(req, res) {
    painelModel.listarComentarios()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            responderErro(res, "Houve um erro ao listar os comentários! Erro: ", erro);
        });
}

function publicarComentario(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var texto = req.body.textoServer;

    if (idUsuario == undefined) {
        res.status(400).send("O id do usuário está undefined!");
    } else if (typeof texto != "string" || texto.trim() == "") {
        res.status(400).send("Escreva seu comentário!");
    } else if (texto.length > 250) {
        res.status(400).send("O comentário pode ter no máximo 250 caracteres!");
    } else {
        painelModel.publicarComentario(idUsuario, texto)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                if (erro.code == "ER_DUP_ENTRY") {
                    res.status(409).send("Você já tem um comentário. Apague o atual para publicar outro.");
                } else if (erro.code == "ER_NO_REFERENCED_ROW_2") {
                    res.status(404).send("Usuário não encontrado!");
                } else {
                    responderErro(res, "Houve um erro ao publicar o comentário! Erro: ", erro);
                }
            });
    }
}

function apagarComentario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (isNaN(idUsuario)) {
        res.status(400).send("O id do usuário é inválido!");
    } else {
        painelModel.apagarComentario(idUsuario)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                responderErro(res, "Houve um erro ao apagar o comentário! Erro: ", erro);
            });
    }
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