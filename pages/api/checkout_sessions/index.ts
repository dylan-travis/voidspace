import { CURRENCY, MAX_AMOUNT, MIN_AMOUNT } from '../../../config'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';


import Stripe from 'stripe'
import { formatAmountForStripe } from '../../../utils/stripe-helpers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-08-01',
})

async function postToStripeHook(checkoutSessionId: string) {
    try {
      // Replace 'YOUR_API_URL' with the actual URL where your 'stripe_hook.js' route is hosted.
      const apiUrl = 'http://localhost:3000/api/webhooks';
      const headers = {
        'Content-Type': 'application/json', // Set the content type to JSON
        'stripe-signature': 'payment_intent'
    };
      // Make a POST request to the 'stripe_hook.js' route.
      await axios.post(apiUrl, { checkoutSessionId }, {headers});
  
      console.log('Successfully posted to stripe_hook.js');
    } catch (error) {
      console.error('Error while posting to stripe_hook.js:', error.message);
      // Handle the error appropriately (e.g., retry, log, etc.).
    }
  }
  

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        console.log("request body is " + JSON.stringify(req.body, null, 2))
        try {
            // Validate the amount that was passed from the client.
            // if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
            //     throw new Error('Invalid amount.')
            // }

            const items = req.body.items;

            // Create the line_items array for the Stripe checkout session
            const lineItems = items.map((item) => ({
              price: item.price,
              quantity: item.quantity,
            }));

            console.log("LineItems are: " + JSON.stringify(lineItems, null, 2))

            // Create Checkout Sessions from body params.
            const params: Stripe.Checkout.SessionCreateParams = {
                mode: 'payment',
                submit_type: 'pay',
                payment_method_types: ['card'],
                line_items: lineItems,
                success_url: `${req.headers.origin}/result?success=true&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/cart`,
            }
            const checkoutSession: Stripe.Checkout.Session =
                await stripe.checkout.sessions.create(params)

            // Call the function to post to stripe_hook.js with the created checkout session ID.
            await postToStripeHook(checkoutSession.id);

            res.status(200).json(checkoutSession)
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : 'Internal server error'
            res.status(500).json({ statusCode: 500, message: errorMessage })
        }
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}