const { Nota, Etiqueta } = require("../models");

// Crear una nueva nota con etiquetas
exports.crearNota = async (req, res) => {
    try {
        const { titulo, contenido, etiquetas } = req.body;
        const nuevaNota = await Nota.create({ titulo, contenido });

        if (etiquetas && etiquetas.length > 0) {
            const etiquetasExistentes = await Etiqueta.findAll({ where: { id: etiquetas } });
            await nuevaNota.addEtiquetas(etiquetasExistentes);
        }

        const notaConEtiquetas = await Nota.findByPk(nuevaNota.id, { include: Etiqueta });
        res.status(201).json(notaConEtiquetas);
    } catch (error) {
        console.error("Error al crear la nota:", error);
        res.status(500).json({ error: "Error interno al crear la nota" });
    }
};

// Obtener todas las notas activas
exports.obtenerNotas = async (req, res) => {
    try {
        const notas = await Nota.findAll({ where: { archivada: false } });
        res.json(notas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener notas" });
    }
};

// Obtener notas archivadas
exports.obtenerNotasArchivadas = async (req, res) => {
    try {
        const notas = await Nota.findAll({ where: { archivada: true } });
        res.json(notas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener notas archivadas" });
    }
};

// Editar una nota
exports.editarNota = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, contenido } = req.body;
        const nota = await Nota.findByPk(id);
        if (!nota) return res.status(404).json({ error: "Nota no encontrada" });

        nota.titulo = titulo;
        nota.contenido = contenido;
        await nota.save();

        res.json(nota);
    } catch (error) {
        res.status(500).json({ error: "Error al editar la nota" });
    }
};

// Archivar/desarchivar una nota
exports.archivarNota = async (req, res) => {
    try {
        const { id } = req.params;
        const nota = await Nota.findByPk(id);
        if (!nota) return res.status(404).json({ error: "Nota no encontrada" });

        nota.archivada = !nota.archivada; // Cambia el estado de archivada
        await nota.save();

        res.json(nota);
    } catch (error) {
        res.status(500).json({ error: "Error al archivar la nota" });
    }
};

// Eliminar una nota
exports.eliminarNota = async (req, res) => {
    try {
        const { id } = req.params;
        const nota = await Nota.findByPk(id);
        if (!nota) return res.status(404).json({ error: "Nota no encontrada" });

        await nota.destroy();
        res.json({ mensaje: "Nota eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la nota" });
    }
};
