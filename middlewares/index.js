
const { ORDER, USER, PANIER } = require('../models/index');

const SendCommande = async (req, res, next) =>
{
    const { id } = req.params.id;
    const ToSend = { idCommande: "", clientName: "", listeProduit: "", date: "", status: "En cours" }
    const host = 'http://90.73.65.139:8000/api/orders'
    let resulat;
    try {
        const order = await ORDER.findByPk(id)
        if (order) {
            const { userId, panierId } = order.dataValues;
            const panier = await PANIER.findByPk(panierId)
            const user = await USER.findByPk(userId)

            console.log(JSON.stringify(panier.dataValues.produits))
            if (panier && user) {
                ToSend.listeProduit = JSON.stringify(panier.dataValues.produits);
                ToSend.clientName = user.dataValues.nom_user;
                ToSend.idCommande = id.toString();
                ToSend.date = new Date().toString().split("GMT")[0];
                resulat = await axios.post(host, ToSend);
            } else {
                res.status(500).json({ message: 'something went wrong in singin' });
            }
        } else {
            res.status(500).json({ message: 'commande inexistante' });
        }
        if (resulat.status === 201) {
            order.update({ statut: "EN COURS" })
                .then((response) =>
                {
                    res.status(200).json({ message: 'votre commande a ete enregistre' });
                    console.log(response)
                    next()
                })
                .catch((error) => { res.status(500).json({ message: 'something went wrong ', error }) });
        } else {
            res.status(500).json({ message: 'error: http://90.73.65.139:8000/api/orders ' });
        }
    } catch (error) {
        res.status(500).json({ message: 'something went wrong ', error });
    }

}

module.exports = SendCommande