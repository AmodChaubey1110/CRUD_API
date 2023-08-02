const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./src/routes/index');
const cors = require('cors');
require('./models/index');


let port= process.env.PORT

app.use(cors());

app.use(bodyParser.json());


app.use("/", userRoute);


app.listen(port, () => {
	console.log("running on local port ", port);
})


