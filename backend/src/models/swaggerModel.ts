import sequelize from "../config/database";
import { DataTypes, Model} from 'sequelize';


class User extends Model{
    public firstName!: string;
    public lastName!: string;
    public email!: string;
}
User.init(
    {
        firstName:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
        }
    },
    {
        sequelize,
        tableName: "userDeatil"
    })
    
export default User;
