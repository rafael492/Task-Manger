import { useState, useEffect } from "react";
import axios from "axios";

function NotaForm({ onNotaCreada, notaEditando, setNotaEditando }) {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  useEffect(() => {
    if (notaEditando) {
      setTitulo(notaEditando.titulo);
      setContenido(notaEditando.contenido);
    }
  }, [notaEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !contenido) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (notaEditando) {
        await axios.put(`${import.meta.env.VITE_API_URL}/notas/${notaEditando.id}`, {
          titulo,
          contenido,
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/notas`, {
          titulo,
          contenido,
        });
      }

      setTitulo("");
      setContenido("");
      setNotaEditando(null);
      onNotaCreada(); // Recargar lista
    } catch (error) {
      console.error("Error al guardar la nota:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="nota-form">
      <h3>{notaEditando ? "Editar Nota" : "Crear Nueva Nota"}</h3>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <textarea
        placeholder="Contenido"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
      />
      <button type="submit">{notaEditando ? "Actualizar" : "Agregar Nota"}</button>
      {notaEditando && <button onClick={() => setNotaEditando(null)}>Cancelar</button>}
    </form>
  );
}

export default NotaForm;
