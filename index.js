import express from "express";
import DataStore from "nedb";

const app = express();
const PORT = 8000;

// Base de donnee
const db = new DataStore({ filename: "perso" });
db.loadDatabase();

// =================================================================
app.use(express.json());

/* -------------------------------- API CRUD -------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   CREATE                                   */
/* -------------------------------------------------------------------------- */
app.post("/api/perso", (req, res) => {
  console.log(req.body);
  db.insert(req.body);
  res.send(req.body);
});

/* -------------------------------------------------------------------------- */
/*                                    LIRE  TOUT                                  */
/* -------------------------------------------------------------------------- */
app.get("/api/perso", (req, res) => {
  db.find({}, (err, docs) => {
    if (err) console.log(err);

    res.send(docs);
  });
});

/* -------------------------------------------------------------------------- */
/*                            LIRE UN SEUL ELEMENT                            */
/* -------------------------------------------------------------------------- */
app.get("/api/perso/:id", (req, res) => {
  db.find({ _id: req.params.id }, (err, docs) => {
    if (err) console.log(err);

    res.send(docs);
  });
});

/* -------------------------------------------------------------------------- */
/*                                   UPDATE                                   */
/* -------------------------------------------------------------------------- */
app.patch("/api/perso/:id", (req, res) => {
  db.update({ _id: req.params.id }, { $set: { ...req.body } });
  res.send(req.body);
});

/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */
app.delete("/api/perso/:id", (req, res) => {
  db.remove({ _id: req.params.id });
});
/* -------------------------------------------------------------------------- */
/*                                   SERVEUR                                  */
/* -------------------------------------------------------------------------- */
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
