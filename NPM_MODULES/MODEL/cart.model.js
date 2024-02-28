import pool from "../DATABASE/dbConfig.js";
 export default class Cart {
    constructor(id,user_id){
        this.id = id;
        this.user_id = user_id;
    }

    static isCartExist(cart_id){
        return new Promise((resolve,reject)=>{
        pool.getConnection((err, con) => {
            if (err) {
                console.error("Error during connection");
                reject(err);
            } else {
                let sql = "select * from cart where cart_id = ? ";
                // console.log("cart id... " + cart_id);
                con.query(sql, [cart_id], (err, result) => {
                    if (err) {
                        console.error("error during connection....");
                        reject(err);
                    } else {
                        // console.log("cart exist/not in table,...");
                        resolve(result);
                    }
                })
            }
        })

        })
    }
    static createCart(user_id){
        return new Promise((resolve,reject)=>{
             pool.getConnection((err,con)=>{
                if(err){
                    console.error("Error during Connection "+err);
                    reject(err);
                } else {
                    let sql = "insert into cart (user_id)values(?)";
                    con.query(sql,[user_id],(err,result)=>{
                        if(err){
                            console.error("Error in sql query...");
                            reject(err);
                        } else {
                            console.log("Cart created successfully");
                            resolve(result)
                        }
                    })
                }
            })
        })
    }

    }
 