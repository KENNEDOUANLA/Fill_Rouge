const stripe = require("stripe")(process.env.CLE_PRIVE)

const Stripe = async (req, res) =>
{
    const { montant, number } = req.body;
    const total = montant * 100
    const session = await stripe.checkout.sessions.create({
        success_url: 'page le paiement avec success',
        cancel_url: 'page le paiement sans success',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: `nombre de produit : ${number}`
                    },
                    unit_amount: total
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
    });
    res.send(session);
}


module.exports = { Stripe }