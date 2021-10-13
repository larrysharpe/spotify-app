module.exports = (sequelize, Sequelize) => {
    const Tracks = sequelize.define("tracks", {
        ISRC: {
            primaryKey: true,
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        imageURL: {
            type: Sequelize.STRING
        },
        artists: {
            type: Sequelize.STRING
        }
    });

    return Tracks;
};