import sequelize from "../config/database";

const dbconnect = async () => {
    try {
        await sequelize.authenticate(); 
        console.log("Database connected successfully.");
        
        await sequelize.sync({ alter: true }); 
        console.log("Database synchronized successfully.");
    } catch (err) {
        console.error("Unable to connect to the database:", err);
        console.log("Problem in creating user");
    }
};

export default dbconnect;