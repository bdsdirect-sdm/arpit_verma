import User from "./userModel";
import Product from "./productModel";

User.hasMany(Product, {
    foreignKey: "userId" as "products"
})

Product.belongsTo(User, {
    foreignKey: "id" as "user"
})


async function serverInitialize(){
    await User.sync()
    .then(() => {
        console.log("Table synced!");
    })

    await Product.sync()
    .then(() => {
        console.log("Table synced!");
    })    
}

export default serverInitialize;