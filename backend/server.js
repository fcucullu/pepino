require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("API de The Pepino Brand funcionando 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then(() => console.log("🟢 Conectado a PostgreSQL"))
  .catch((err) => console.error("🔴 Error al conectar a PostgreSQL", err));

app.post("/save-design", async (req, res) => {
  try {
    const { projectId, data } = req.body;

    const result = await pool.query(
      "INSERT INTO designs (project_id, data) VALUES ($1, $2) ON CONFLICT (project_id) DO UPDATE SET data = EXCLUDED.data RETURNING *",
      [projectId, data]
    );

    res.json({ message: "Diseño guardado con éxito", design: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar el diseño" });
  }
});

app.get("/load-design/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;

    const result = await pool.query(
      "SELECT data FROM designs WHERE project_id = $1",
      [projectId]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0].data);
    } else {
      res.status(404).json({ error: "Diseño no encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al cargar el diseño" });
  }
});
