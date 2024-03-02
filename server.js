const express = require("express");
const client = require('prom-client');

const dotenv = require("dotenv");
dotenv.config();

const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register })

// parse requests of content-type - application/json
app.use(express.json());

app.get('/metrics', async (req, res) => {
  res.setHeader('Contecnt-Type', client.register.contentType)
  const metrics = await client.register.metrics()
  res.send(metrics)
})

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
    console.log(err)
    //proces.exit();
  });

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


require("./app/routes/product.routes")(app);
require("./app/routes/shipping-rate.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
