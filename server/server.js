import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();



const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Registration endpoint
app.post('/register', (req, res) => {
  const { teamName, email, members } = req.body;
  // Here you would normally save to DB, but for now just echo back
  if (!teamName || !email || !members) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  res.status(200).json({ message: 'Registration successful!', data: { teamName, email, members } });
});
