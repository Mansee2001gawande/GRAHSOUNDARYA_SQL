import pool from '../DATABASE/dbConfig.js'

export default class Order {
    constructor(user_id, bill_amt, order_date, delivery_date, status, contact_no) {
        this.user_id = user_id;
        this.bill_amt = bill_amt;
        this.order_date = order_date;
        this.delivery_date = delivery_date;
        this.status = status;
        this.contact_no = contact_no;
    }
    static isOrderPlace(order_id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error during connection");
                    reject(err);
                } else {
                    let sql = "select * from  orders where order_id = ?";
                    con.query(sql, [order_id], (err, result) => {
                        if (err) {
                            console.error("Error in sql QUERY...");
                            reject(err);
                        } else {
                            console.log("is OrderExist", result.length);
                            resolve(result);
                        }
                    })
                }
            })
        })
    }

    static OrderPlace(user_id, bill_amt, order_date, delivery_date, status, contact_no) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error during connection");
                    reject(err);
                } else {
                    let sql = "insert into orders(user_id,bill_amt,order_date,delivery_date,status, contact_no)values(?,?,?,?,?,?)";
                    con.query(sql, [user_id, bill_amt, order_date, delivery_date, status, contact_no], (err, result) => {
                        if (err) {
                            console.error("Error in sql QUERY...");
                            reject(err);
                        } else {
                            console.log("Order place successfully.");
                            resolve(result);
                        }
                    })
                }
            })
        })
    }
    static OrderListByDate(current_date){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error during connection");
                    reject(err);
                } else {
                    let sql = "select   orders.bill_amt, orders.order_date, orders.delivery_date, orders.status, orders.contact_no ,order_items.quantity, product.product_id,product.title,product.price,product.status AS Product_status,product.stock,category.name,user.name,user.username,user.contact_no from orders join order_items on orders.order_id = order_items.order_id join product on product.product_id = order_items.product_id join category on category. category_id = product.category_id join user on orders.user_id = user.user_id join professional on product.professional_id = professional.professional_id where     orders.order_date <= ?";
                    con.query(sql, [current_date.toISOString()], (err, result) => {
                        if (err) {
                            console.error("Error in sql QUERY...");
                            reject(err);
                        } else {
                            console.log("Order List get successfully.");
                            resolve(result);
                        }
                    })
                }
            })
        })
 
    }
}