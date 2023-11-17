import DataTypes from "sequelize";
import sequelize from "../Database/db.config.js";

const News = sequelize.define("news", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    release_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW()
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// await News.sync({ force: true });

export default News;



// DB Table

// CREATE TABLE news (
//     id BIGINT(20) primary key auto_increment NOT NULL,
//     title VARCHAR(50) NOT NULL,
//     description VARCHAR(255) DEFAULT NULL,
//     image TEXT DEFAULT NULL,
//     release_date DATE DEFAULT NULL,
//     status VARCHAR(20) NOT NULL
// );