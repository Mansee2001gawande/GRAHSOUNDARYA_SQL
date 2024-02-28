import pool from "../DATABASE/dbConfig.js";
export default class CartItems{
    constructor(product_id, cart_id, quantity){
        this.product_id = product_id;
        this.cart_id = cart_id;
        this.quantity = quantity;
    }

    static addItem(product_id,cart_id,quantity){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    console.error("Error during connection");
                    reject(err);
                } else {
                    let sql = "insert into cart_items (product_id,cart_id,quantity)values(?,?,?)";
                    con.query(sql,[product_id,cart_id,quantity],(err,result)=>{
                        if(err){
                            console.error("Error in sql query...");
                            reject(err);
                        } else {
                            console.log("Product successfully add in cartItems");
                            resolve(result);
                        }
                    })
                }
            })
        })
    }
}
