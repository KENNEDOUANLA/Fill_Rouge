const { USER } = require('../models/index');

const Signin = async (req, res) =>
{
    const { nom_user, password } = req.body;
    USER.findAll({
        where: { nom_user, password }
    }).then((user) =>
    {
        if (user[0])
            res.status(200).json({ message: "success", user: user[0] })
        else
            res.status(400).json({ message: "User not exists" })
    }).catch((error) =>
    {
        res.status(500).json({ message: "something went wrong ", error })
    });

}

const Signup = async (req, res) =>
{
    const { nom_user, email, password, role } = req.body;
    USER.findAll({
        where: { nom_user }
    }).then((user) =>
    {
        if (user[0])
            res.status(201).json({ message: "User already exists " })
        else
            USER.create({ nom_user, email, password, role }).then((user) =>
            {
                res.status(200).json({ message: "success", user: user.nom_user })
            }).catch((error) =>
            {
                res.status(500).json({ message: "something went wrong ", error })
            });
    }).catch(() =>
    {
        res.status(500).json({ message: "something went wrong ", error })
    });
}

const GetUser = async (req, res) =>
{

    const { nom_user } = req.body;

    USER.findAll({
        where: { nom_user }
    }).then((user) =>
    {
        console.log(user);
        console.log("THIS IS TE ID", user)
        if (user[0])
            res.status(200).json({ message: "success", "name": user[0] })
        else
            res.status(400).json({ message: "User not exists" })
    }).catch((error) =>
    {
        res.status(500).json({ message: "something went wrong ", error })
    });
}
const UpdateUser = async (req, res) =>
{
    const { id_user, nom_user, email, password, role } = req.body;
    USER.update({ nom_user, email, password, role }, {
        where: { id_user }
    }).then((user) =>
    {
        if (user)
            res.status(200).json({ message: "success" })

    }).catch((error) =>
    {
        res.status(500).json({ message: "something went wrong ", error })
    });
}

module.exports = { Signin, Signup, GetUser, UpdateUser }