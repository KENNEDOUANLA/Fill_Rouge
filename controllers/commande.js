const axios = require('axios');

const { ORDER, USER, PANIER } = require('../models/index');
const { GetPanier, CreerPanier, UpdatePanier } = require('./panier');

const GetCommandes = async (req, res) =>
{
    //const { userId } = req.body
    const userId = req.params.id
    ORDER.findAll({
        where: { userId }
    }).then(async (orders) =>
    {
        let commande = [];
        await Promise.all(orders.map(async (order) =>
        {
            const response = await GetPanier(order.panierId);
            commande.push({ id: order.id_order, status: order.statut, produit: response.produits });
        }))
        res.status(200).json({ message: "success", "order": commande });
    }).catch((error) =>
    {
        res.status(500).json({ message: 'something went wrong ', error });
    });
}

const SetCommande = async (req, res) =>
{
    const { userId } = req.body
    const panier = await CreerPanier();
    if (userId && panier.message === "Success") {
        ORDER.create({ statut: "INIT", userId, panierId: panier.id }
        ).then((order) =>
        {
            res.status(200).json({ message: "success", order: order })
        }).catch((error) =>
        {
            res.status(500).json({ message: 'something went wrong ', error });
        })

    } else {
        res.status(400).json({ message: 'user dont exist ' });
    }

}

const UpdateCommande = async (req, res) =>
{
    const { id, prix_total, produits } = req.body

    try {
        const order = await ORDER.findByPk(id)
        const result = await UpdatePanier(order.panierId, prix_total, produits)
        if (result.message === "Success")
            res.status(200).json({ message: "success", order: order.id_order })
        else
            res.status(400).json({ message: 'something went wrong ' });
    } catch (error) {
        res.status(500).json({ message: 'something went wrong ', error });
    }
}

const Update = async (req, res) =>
{
    const { id, status } = req.body
    try {
        await ORDER.update({ status }, {
            where: { id_order: id }
        })
        res.status(200).json({ message: "success" })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong ', error });
    }
}

const SendCommande = async (req, res) =>
{
    const { id } = req.body;
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
                })
                .catch((error) => { res.status(500).json({ message: 'something went wrong ', error }) });
        } else {
            res.status(500).json({ message: 'error: http://90.73.65.139:8000/api/orders ' });
        }
    } catch (error) {
        res.status(500).json({ message: 'something went wrong ', error });
    }

}

module.exports = { GetCommandes, SendCommande, SetCommande, UpdateCommande, Update }