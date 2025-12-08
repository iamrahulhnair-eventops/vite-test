// eslint-disable-next-line no-undef
// eslint-disable-next-line no-undef
// eslint-disable-next-line no-undef
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_YOUR_SECRET_KEY'); // Replace with your Stripe secret key
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Node.js API!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
