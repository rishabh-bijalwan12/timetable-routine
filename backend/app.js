const express = require("express");
const app = express();
require('./config/db');
const authRoute = require('./routes/auth-route');
const classScheduleRoute = require('./routes/classSchedule-route');
const cors = require('cors');

const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/', authRoute);
app.use('/api', classScheduleRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
