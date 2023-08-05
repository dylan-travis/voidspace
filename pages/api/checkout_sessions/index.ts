import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-11-15',
})

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

            console.log("checkoutSession object is: " + JSON.stringify(checkoutSession))

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