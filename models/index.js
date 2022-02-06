const { sequelize, DataTypes, DISABLE_SEQUELIZE_DEFAULTS } = require("../Dbconfig")

const USER = sequelize.define('User', {
    id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom_user: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('CLIENT', 'SAV'), allowNull: false }
}, DISABLE_SEQUELIZE_DEFAULTS);

const PANIER = sequelize.define('Panier', {
    id_panier: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    prix_total: { type: DataTypes.INTEGER, allowNull: false },
    produits: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() { JSON.parse(this.getDataValue('produits')) },
        set(val) { this.setDataValue('produits', JSON.stringify(val)) }
    }
}, DISABLE_SEQUELIZE_DEFAULTS);

const ORDER = sequelize.define('Order', {
    id_order: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    statut: { type: DataTypes.ENUM('INIT', 'EN COURS', 'ANNULER', 'EXPEDIER'), defaultValue: "INIT", allowNull: false },
}, DISABLE_SEQUELIZE_DEFAULTS);

PANIER.hasOne(ORDER, { foreignKey: 'panierId', allowNull: false })
USER.hasMany(ORDER, { foreignKey: 'userId', allowNull: false });
//ORDER.belongsTo(USER);
//ORDER.belongsTo(PANIER);

//sequelize.sync()
//sequelize.sync({ force: true })
module.exports = { USER, PANIER, ORDER }