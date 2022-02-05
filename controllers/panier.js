const { PANIER } = require('../models/index');

const GetPanier = async (id_panier) =>
{
    try {
        const panier = await PANIER.findByPk(id_panier);
        return { message: "Success", produits: panier.dataValues.produits }
    } catch (error) {
        return { message: "Faille" }
    }
}

const CreerPanier = async () =>
{
    try {
        const panier = await PANIER.create({ prix_total: 0, produits: [{}] })
        return { message: "Success", id: panier.id_panier }
    } catch (error) {
        return { message: "Faille" }
    }
}
const UpdatePanier = async (id, prix_total, produits) =>
{

    try {
        await PANIER.update({ prix_total, produits }, {
            where: { id_panier: id }
        })
        return { message: "Success" }
    } catch (error) {
        return { message: "Faille" }
    }
}



module.exports = { GetPanier, CreerPanier, UpdatePanier }