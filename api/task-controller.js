const { Router } = require("express");
const { getConnection } = require("./db");

const router = Router();

// para obtener todas las tareas
router.get("/", async (req, res) => {
  const {state} = req.query;

  const filterState = state === "Todas" ? "" : state;  
  const conn = await getConnection();
  try {

    const [tasks] = await conn.query(`
      SELECT * 
      FROM tasks 
      WHERE state LIKE '%${filterState}%'
      ORDER BY id DESC
    `);

    const data = [];
    for (const task of tasks) {
      const [users] = await conn.query(`SELECT * FROM users WHERE id_task = ${task.id}`);
      const formatedUsers = users.map(u => {
        return {
          ...u,
          skills: u.skills ? JSON.parse(u.skills) : []
        }
      })
      const obj = {
        ...task,
        users: formatedUsers
      }
      data.push(obj);
    }

    res.json({ name: "ok", data });
  } catch (error) {
    console.log(error);
    res.json({ name: "error" });
  }
});

// para agregar tareas
router.post("/", async (req, res) => {
  // obtengo los datos del cuerpo
  const { title, date, users } = req.body;

  // Obtengo la conexión e inicio la transación
  const conn = await getConnection();
  await conn.beginTransaction();
  try {

    const [{ insertId }] = await conn.query(`
      INSERT INTO tasks 
      (title, state, date)
      VALUES 
      ('${title}', 'Pendiente', '${date}')
      `);

    for (const user of users) {
      await conn.query(`
          INSERT INTO users 
          (name, age, id_task, skills)
          VALUES 
          ('${user.name}', ${user.age}, ${insertId}, '${JSON.stringify(user.skills)}' )
          `);
    }
    // si no hubo error se hace commit de los datos
    await conn.commit();

    res.json({ name: "ok" });
  } catch (error) {
    console.log(error);
    await conn.rollback();
    res.json({ name: "error" });
  }
});

// para marca una tarea como cerrada
router.post("/close", async (req, res) => {
  // obtengo los datos del cuerpo
  const { id } = req.body;
  // Obtengo la conexión e inicio la transación
  const conn = await getConnection();
  try {

    await conn.query(`
        UPDATE tasks
        SET state = 'Cerrada' 
        WHERE id = ${id}
        `);

    res.json({ name: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ name: "error" });
  }
});

// para eliminar una tarea
router.delete("/:id", async (req, res) => {
  // obtengo los datos del cuerpo
  const { id } = req.params;
  // Obtengo la conexión e inicio la transación
  const conn = await getConnection();
  try {

    await conn.query(`
        DELETE FROM tasks
        WHERE id = ${id}
        `);

    res.json({ name: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ name: "error" });
  }
});

module.exports = router