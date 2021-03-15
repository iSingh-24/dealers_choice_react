const express = require("express");
const { static } = express;
const path = require("path");
const { conn, syncAndSeed, House, Character } = require("./db/index");

const app = express();
app.use("/dist", static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/api/characters", async (req, res, next) => {
  try {
    const characters = await Character.findAll();
    res.send(characters);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/houses", async (req, res, next) => {
  try {
    const houses = await House.findAll({
      include: Character,
    });
    res.send(houses);
  } catch (ex) {
    next(ex);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
