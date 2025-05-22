const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/kuis_ips', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Terhubung ke MongoDB"))
  .catch(err => console.error("Gagal konek DB:", err));

// Skema database
const ScoreSchema = new mongoose.Schema({
  score: Number,
  history: [String],
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', ScoreSchema);

// Endpoint untuk menerima skor
app.post('/submit-score', async (req, res) => {
  try {
    const { score, history } = req.body;
    const newScore = new Score({ score, history });
    await newScore.save();
    res.json({ success: true, message: 'Data tersimpan' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Endpoint untuk melihat semua riwayat
app.get('/history', async (req, res) => {
  const all = await Score.find().sort({ date: -1 });
  res.json(all);
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});