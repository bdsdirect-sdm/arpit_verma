import sequelize from "../config/database";
import {DataTypes, Model} from "sequelize";

class User extends Model{
    public id!:number
    public firstname!:string
    public lastname!:string
    public companyName!:string
    public email!:string
    public password!:string
    public phone!:string
    public address!:string
    public companyLogo!:string
    public ProfileImage!:string
   }


User.init(
{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    companyName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:true
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    companyLogo:{
        type:DataTypes.STRING,
        allowNull:true
    },
    ProfileImage:{
        type:DataTypes.STRING,
        allowNull:true
    },
},
{
    sequelize,
    tableName: "retailer"
});

export default User;