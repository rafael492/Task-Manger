import { useEffect, useState } from "react";
import axios from "axios";
import NotaForm from "../components/NotaForm";

function Home() {
  const [notas, setNotas] = useState([]);
  const [notaEditando, setNotaEditando] = useState(null);
  const [mostrarArchivadas, setMostrarArchivadas] = useState(false);

  // Cargar notas activas o archivadas según el estado
  const cargarNotas = async () => {
    try {
      const endpoint = mostrarArchivadas ? "/notas/archivadas" : "/notas";
      const response = await axios.get(`${import.meta.env.VITE_API_URL}${endpoint}`);
      setNotas(response.data);
    } catch (error) {
      console.error("Error cargando notas:", error);
    }
  };

  useEffect(() => {
    cargarNotas();
  }, [mostrarArchivadas]); // Se ejecuta cuando cambia `mostrarArchivadas`

  const eliminarNota = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/notas/${id}`);
      cargarNotas();
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };

  const archivarNota = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/notas/${id}/archivar`);
      cargarNotas();
    } catch (error) {
      console.error("Error al archivar/desarchivar la nota:", error);
    }
  };

  return (
    <div>
      <h2>Gestor de Notas 📝</h2>

      {/* Botón para cambiar entre notas activas y archivadas */}
      <button onClick={() => setMostrarArchivadas(!mostrarArchivadas)}>
        {mostrarArchivadas ? "📃 Ver Notas Activas" : "📂 Ver Notas Archivadas"}
      </button>

      <NotaForm onNotaCreada={cargarNotas} notaEditando={notaEditando} setNotaEditando={setNotaEditando} />

      <ul>
        {notas.length > 0 ? (
          notas.map((nota) => (
            <li key={nota.id} style={{ opacity: nota.archivada ? 0.5 : 1 }}>
              <strong>{nota.titulo}</strong>: {nota.contenido}
              <button onClick={() => setNotaEditando(nota)}>✏️ Editar</button>
              <button onClick={() => eliminarNota(nota.id)}>🗑️ Eliminar</button>
              <button onClick={() => archivarNota(nota.id)}>
                {nota.archivada ? "📂 Desarchivar" : "📁 Archivar"}
              </button>
            </li>
          ))
        ) : (
          <p>No hay notas disponibles.</p>
        )}
      </ul>
    </div>
  );
}

export default Home;
