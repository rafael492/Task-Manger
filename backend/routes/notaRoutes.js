const express = require("express");
const router = express.Router();
const notaController = require("../controllers/notaController");

router.post("/", notaController.crearNota);
router.get("/", notaController.obtenerNotas);
router.get("/archivadas", notaController.obtenerNotasArchivadas);
router.put("/:id", notaController.editarNota);
router.patch("/:id/archivar", notaController.archivarNota);
router.delete("/:id", notaController.eliminarNota);

module.exports = router;
