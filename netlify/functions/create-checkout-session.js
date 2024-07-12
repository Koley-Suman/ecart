require('dotenv').config();

console.log("dotenv",process.env);

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

export async function handler(event) {
    console.log("request received: ", event.body);
    try {
        const { quantity } = JSON.parse(event.body);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: "sample Product",
                        },
                        unit_amount: 1000,
                    },
                    quantity: quantity
                },
            ],
            success_url: `${process.env.REACT_APP_URL}/success`,
            cancel_url: `${process.env.REACT_APP_URL}/cancel`,
        });

        console.log(session);
        return {
            statusCode: 200,
            body: JSON.stringify({ url: session.url }),
        };
    } catch (error) {
        console.log("error creating", error);

        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        }
    }
}