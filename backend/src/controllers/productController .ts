import Product from "../models/productModel";
import User from "../models/userModel";


export interface productInterface {
    user_id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
    status: "Draft" | "Published"; 
    image: string;
  }


export const getProduct = async (req: any, res: any) => {
const { id } = req.params.id;
const product = await Product.findOne()
}





//send id as request.body
export const addProduct = async (req: any, res: any) => {
    try {
        const {
            user_id,
            name,
            category,
            quantity,
            price,
            status
        } = req.body
        console.log("Request>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..",req.body);    
    
        const filesData: any = req.files;
        console.log("Result>>>>>>>>>>>>>>>>>>>>>>>>>>", req.files);
        
        let productDetails: productInterface = {
            user_id: user_id,
            name,
            category,
            quantity,
            price,
            status,
            image: filesData.image[0].path,
        }
    
        const product = await Product.create(productDetails as any);
        return res.status(201).json({ product });
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ message: "Error adding product" });
    }
}

export const editProduct = (req: Request, res: Response) => {

}

export const deleteProduct = (req: Request, res: Response) => {

}

//send id as request.body
export const productListing = async (req: any, res: any) => {
    try {
        const { id } = req.body;
        const products = await Product.findAll({
          where: {
            userId: id,
          },
        });
        res.status(200).json(products);
      } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ message: "Error adding product" });
    }
}