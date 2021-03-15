const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/hogwarts_db"
);

const House = conn.define("house", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(20),
  },
});

const Character = conn.define("character", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(20),
  },
});

Character.belongsTo(House);
House.hasMany(Character);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const [
    harry,
    malfoy,
    snape,
    hermoine,
    luna,
    cedric,
    gryffindor,
    hufflepuff,
    ravenclaw,
    slytherin,
  ] = await Promise.all([
    Character.create({ name: "Harry Potter" }),
    Character.create({ name: "Draco Malfoy" }),
    Character.create({ name: "Severus Snape" }),
    Character.create({ name: "Hermoine Granger" }),
    Character.create({ name: "Luna Lovegood" }),
    Character.create({ name: "Cedric Diggory" }),
    House.create({ name: "Gryffindor" }),
    House.create({ name: "Hufflepuff" }),
    House.create({ name: "Ravenclaw" }),
    House.create({ name: "Slytherin" }),
  ]);

  harry.houseId = gryffindor.id;
  malfoy.houseId = slytherin.id;
  snape.houseId = slytherin.id;
  hermoine.houseId = gryffindor.id;
  luna.houseId = hufflepuff.id;
  cedric.houseId = ravenclaw.id;

  await Promise.all([
    harry.save(),
    malfoy.save(),
    snape.save(),
    hermoine.save(),
    luna.save(),
    cedric.save(),
  ]);
};

module.exports = {
  syncAndSeed,
  conn,
  House,
  Character,
};
