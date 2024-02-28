import  pool from '../DATABASE/dbConfig.js';
export default class OrderItems{
    constructor(order_id,product_id,quantity){
        this.order_id = order_id;
        this.product_id = product_id;
        this.quantity = quantity;
    }
    static addProductIntoOrder(order_id,product_id,quantity){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    console.error("Error during Conncetion ",err);
                    reject(err);
                } else {
                    let sql = "insert into order_items(order_id,product_id,quantity)values(?,?,?)";
                    con.query(sql,[order_id,product_id,quantity],(err,result)=>{
                        if(err){
                            console.error("Error in sql addProductIntoOrder() ",err);
                            reject(err);
                        } else{
                            resolve(result);
                    }
                    })
                }
            })
        })
    }

}