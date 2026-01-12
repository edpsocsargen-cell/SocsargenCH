const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/beds', require('./routes/beds'));
app.use('/api/doctors', require('./routes/doctors'));
app.use("/api/announcements", require("./routes/announcements"));



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
