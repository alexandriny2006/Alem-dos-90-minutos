var express = require("express");
var router = express.Router();

var painelController = require("../controllers/painelController");

// ---------- SIGNIFICADO ----------
router.get("/significados", function (req, res) {
    painelController.listarSignificados(req, res);
});

router.get("/significados/:idUsuario", function (req, res) {
    painelController.buscarMeuSignificado(req, res);
});

router.post("/significados", function (req, res) {
    painelController.enviarSignificado(req, res);
});

// ---------- HABILIDADES ----------
router.get("/habilidades/media", function (req, res) {
    painelController.listarMediaHabilidades(req, res);
});

router.get("/habilidades/:idUsuario", function (req, res) {
    painelController.listarHabilidades(req, res);
});

router.post("/habilidades", function (req, res) {
    painelController.salvarHabilidades(req, res);
});

// ---------- COMPETÊNCIAS ----------
router.get("/competencias", function (req, res) {
    painelController.listarCompetencias(req, res);
});

router.get("/competencias/:idUsuario", function (req, res) {
    painelController.buscarMinhasCompetencias(req, res);
});

router.post("/competencias", function (req, res) {
    painelController.enviarCompetencias(req, res);
});

// ---------- COMENTÁRIO ----------
router.get("/comentarios", function (req, res) {
    painelController.listarComentarios(req, res);
});

router.post("/comentarios", function (req, res) {
    painelController.publicarComentario(req, res);
});

router.delete("/comentarios/:idUsuario", function (req, res) {
    painelController.apagarComentario(req, res);
});

module.exports = router;