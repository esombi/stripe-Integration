const BigPromise = require("../middleware/bigPromise");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const storeItems = new Map([
    [1, {priceInCents: 10000, name: "Xtha"}],
    [2, {priceInCents: 20000, name: "Captivo"}]
]);

exports.createCheckout = BigPromise(async(req, res, next) =>{
    
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount:storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url:  `${process.env.SERVER_URL}/cancel.html`
        })
        res.json({url: session.url});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
    
})