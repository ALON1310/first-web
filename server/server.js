const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const stripe = Stripe('your-secret-key-here');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: req.body.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.send({ url: session.url });
});

app.listen(4000, () => console.log('Server running on port 4000'));
