const User = require('../models/user.model');


exports.findAll = async(req, res) => {
        console.log("Find all user's products")


try{

    const result = await User.find({},{username: 1, products:1});
    res.status(200).json({status:true, data:result});
    console.log("Succes in reading all user's product");

}catch(err){
    res.status(400).json({status:false, data: err})
    console.log("Problem on finding all users");
}

}

exports.findOne = async(req,res) => {

}

exports.addProduct = async(req,res) => {


    const username = req.body.username;
    const products = req.body.products;

    console.log("Insert product to username ", username);

    try{

        const result = await User.updateOne({username:username},
            {
                $push: {
                    products: products
                }
            }
            );
            res.status(200).json({status:true, data:result});
            console.log("Succes in saving  Product");

    }catch (err){
        res.status(400).json({status:false, data: err})
        console.log("Problem in saving product", username);
    }
}

exports.updateProduct = async(req,res) =>{
    const username = req.params.username;
    const product_id = req.body.product._id;
    const product_quantity = req.body.product.product_quantity;

    console.log("Update product for username: ", username);

    try{
        const result = await User.updateOne(
            {username:username,"products._id": product_id},
            {
               $set: {
                "products.$.quantity": product_quantity
               }     
            }
        );
        res.status(200).json({status:true, data:result});
        console.log("Succes in saving  Product");

    }catch(err){
        res.status(400).json({status:false, data: err})
        console.log("Problem in updating product for user", username);
    }
}

exports.deleteProduct = async(req,res) =>{


    const username = req.params.username;
    const product = req.params.product;

    try{
        const result = await User.updateOne(
            {
                username: username },
            {
                $pull: {
                    products: { product: product}
                }
            }    
        );
        res.status(200).json({status:true, data:result});
        console.log("Succes in deleting  Product");

    }catch(err){
        res.status(400).json({status:false, data: err})
        console.log("Problem in deleting product for user", username);
    }
}

exports.stats1 = async(req,res) =>{
    console.log("For all users sum by product and count");

    try{

        const result = await User.aggregate(
            [
                {
                    $unwind: "$products"
                },
                {
                    $project: {
                        id: 1,
                        username: 1,
                        products: 1
                    }   
                },
                {
                    $group: {
                        _id: {
                            username: "$username",
                            product: "$products.product"
                        },
                        totalAmmount:{
                            $sum: {
                                $multiply: ["$products.cost", "$products.quantity"]
                            }
                        },
                        count: {$sum: 1} 
            
                    }
                }
            ]
    
        ) ;

        res.status(200).json({status:true, data:result});
        console.log("Succes in stats1  Product");



    }catch(err){
        res.status(400).json({status:false, data: err})
        console.log("Problem in deleting product for user", username);
    }
}