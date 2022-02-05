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
*        description: Get all  commands
*        param: the user id
*        responses :
*           200:
*               description : Success 
*           500:
*               description : something went wrong
*/
Route.get("/allcommande/:id", GetCommandes);

/** 
*  @swagger
* /Commandes :
*  post:
*        description: Send command to  Arthur and update his status
*        responses :
*           200:
*               description : votre commande a ete enregistre
*           500:
*               description : something went wrong
*/
Route.post("/sendcommander", SendCommande);
/**
*  @swagger
* /Commandes :

*  post:
*        description: Create commande (new panier)
*        Body : The user id => userId 
*        responses :
*           200:
*               description : Success
*           400:
*               description :user dont exist
*           500:
*               something went wrong
*/
Route.get("/sentcommander", SetCommande);
/**
*  @swagger
* /Commandes :
*  post:
*        description: upadate user panier 
*        body :commande  id ,prix_total, produits
*        responses :
*           200:
*               description : Success
*           500:
*               something went wrong
*/
Route.post("/updatecommande", UpdateCommande);
/**
*  @swagger
* /Commandes :
*  post:
*        description: upadte status of commande 
*        body : the commande id and the new status
*        responses :
*           200:
*               description : Success
*           500:
*               something went wrong
*/
Route.put("/update", UpdateCommande);

// getion des users
/**
*  @swagger
* /User :
*  post:
*        description: user singnin
*        body : user  nom_user and password 
*        responses :
*           200:
*               description : Success
*               return :user
*           400: 
*               description : User not exists
*           500:
*               description : something went wrong
*/
Route.post('/singin', Signin)
/**
*  @swagger
* /User :
*  post:
*        description: user Signup
*        body : user  nom_user, email, password and role (user_id for update)
*        responses :
*           200:
*               description : Success
*               return :user
*           201:
*               description : User already exists
*           500:
*               description : something went wrong
*/
Route.post('/singup', Signup)
Route.post('/updateuser', UpdateUser)
/**
*  @swagger
* /User :
*  get:
*        description: user Signup
*        param : user =>nom_user 
*        responses :
*           200:
*               description : Success
*               return :user
*           400:
*               description : User not exists
*           500:
*               description : something went wrong
*/
Route.get('/getuser/:name', GetUser)



module.exports = { Route }