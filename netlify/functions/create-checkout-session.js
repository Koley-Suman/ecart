require('dotenv').config();



const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

export async function handler(event) {
    
    try {
        const { carts } = JSON.parse(event.body);
        const lineItems = carts.map(product => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: product.name,
                images: [product.imageUrl],
              },
              unit_amount: product.price * 100, // Convert dollars to cents
            },
            quantity: product.quantity,
          }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items:lineItems,
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