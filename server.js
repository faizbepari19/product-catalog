const express = require("express");
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const { monitorMetrics, getMetrics } = require('./app/middlewares/monitor')
const dotenv = require("dotenv");
dotenv.config();

const app = express();


// parse requests of content-type - application/json
app.use(express.json());

//Helmet removes X-Powered-By header.
//By removing the X-Powered-By header, you reduce the information exposed about the server's underlying technology stack, which is considered good practice for security reasons.
app.use(helmet());
// app.use(cookieParser());
// app.use(csrf({ cookie: true, httpOnly: true, secure: false, sameSite: 'None' }));

app.use(monitorMetrics)

app.get('/metrics', getMetrics)

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
