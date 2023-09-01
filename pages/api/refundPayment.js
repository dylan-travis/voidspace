const stripe = require('stripe')('sk_test_51NOmPoK1A3hq7BalSQ0eLAKNtdmofgI8FSlR6zmjNYo2NnfSTPnEaM6UD79LL3zfnySUfAj2wKoJe5x7UW9Hph6j00iJtF8xg3');

const refund = await stripe.refunds.create({
  payment_intent: payment_intent,
});