const User = require('./User');
const Collection = require("./Collection");
const ArtPiece = require("./ArtPiece");
// const sequelize = require

//User relationships
User.hasMany(Collection, {
    foreignKey: "user_id",
});

User.hasMany(ArtPiece, {
    foreignKey: "user_id",
});

//Collection relationships
Collection.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Collection.hasMany(ArtPiece, {
    foreignKey: "collection_id"
});

//ArtPiece relationships
ArtPiece.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

ArtPiece.belongsTo(Collection, {
    foreignKey: "collection_id",
    onDelete: "SET NULL"
})

module.exports = { User, Collection, ArtPiece };