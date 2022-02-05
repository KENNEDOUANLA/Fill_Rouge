const express = require("express")
const Route = express.Router();
const { Stripe } = require('../controllers/stripe');
const { GetPanier, CreerPanier } = require('../controllers/panier');
const { GetCommandes, SendCommande, SetCommande, UpdateCommande } = require('../controllers/commande')
const { Signin, Signup, GetUser, UpdateUser } = require('../controllers/user');
//stripe
Route.post("/paiement", Stripe);

//paniers
Route.get("/panier", GetPanier);
Route.post("/newPanier", CreerPanier);
//commandes

/** 
*  @swagger
* /Commandes :
*  get:
*        description: Get all commands
*        responses :
*           200:
*               description : Success 
*/
Route.get("/allcommande/:id", GetCommandes);

/** 
*  @swagger
* /Commandes :
*  post:
*        description: Send command
*        responses :
*           200:
*               description : Success 
*/
Route.get("/sendcommander", SendCommande);
Route.get("/sentcommander", SetCommande);
Route.post("/updatecommande", UpdateCommande);
Route.put("/update", UpdateCommande);

// getion des users
Route.post('/singin', Signin)
Route.post('/singup', Signup)
Route.post('/getuser', GetUser)
Route.post('/updateuser', UpdateUser)


module.exports = { Route }