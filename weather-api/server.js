const User = require('./models/user');

// Store user details
app.post('/users', async (req, res) => {
  const { email, location } = req.body;
  const user = new User({ email, location });
  await user.save();
  res.status(201).send(user);
});

// Update user location
app.put('/users/:email', async (req, res) => {
  const { email } = req.params;
  const { location } = req.body;
  const user = await User.findOneAndUpdate({ email }, { location }, { new: true });
  res.send(user);
});

// Get user weather data for a given day
app.get('/users/:email/weather', async (req, res) => {
  const { email } = req.params;
  const { date } = req.query;
  const user = await User.findOne({ email });
  const weatherData = user.weatherData.filter(data => data.date.toDateString() === new Date(date).toDateString());
  res.send(weatherData);
});