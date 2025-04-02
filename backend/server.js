require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Permite recibir JSON en las peticiones

app.get('/', (req, res) => {
    res.send('Servidor funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
const notaRoutes = require("./routes/notaRoutes");
app.use("/api/notas", notaRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const db = require("./models"); // Importar modelos

db.sequelize.sync().then(() => {
    console.log("Base de datos sincronizada ✅");
}).catch(err => {
    console.error("Error al sincronizar la base de datos ❌", err);
});
