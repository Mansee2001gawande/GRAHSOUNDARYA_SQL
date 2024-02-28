import pool from '../DATABASE/dbConfig.js';
export default class Product {
    constructor(id, name) {
        this.id = id;
        this.name;
    }
    static addcategory(id, name) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error in connection...", err);
                    reject(err);
                } else {
                    let sql = "insert into category(name)values(?)";
                    con.query(sql, [name], (err, result) => {
                        if (err) {
                            console.error("Error in sql Query...", err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                }
            })
        })
    }
    static addproduct(id, pro_id, categoryId, price, title, description, status, stock) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error during connection...", err);
                    reject(err);
                } else {
                    let sql = "insert into product (professional_id,category_id,price,title,description,status,stock)values(?,?,?,?,?,?,?)";
                    con.query(sql, [pro_id, categoryId, price, title, description, status, stock], (err, result) => {
                        if (err) {
                            console.error("Error during Connection ", err);
                            reject(err);
                        } else {
                            console.log("Product added successfully...");
                            resolve(result);
                        }
                    })
                }
            })
        })
    }
    static productImage(id,product_id,imageURL){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error in connection...", err);
                    reject(err);
                } else {
                    let sql = "insert into product_images(product_id,image_url)values(?,?)";
                    con.query(sql, [product_id,imageURL], (err, result) => {
                        if (err) {
                            console.error("Error in sql Query...", err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                }
            })
        })

    }
    static productFeedback(product_id,user_id,feedback){
       return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(err){
                console.error("Error during Connection ",err);
                reject(err);
            } else {
                let sql = "insert into product_feedback(product_id,user_id,feedback)values (?,?,?)";
                con.query(sql,[product_id,user_id,feedback],(err,result)=>{
                    if(err){
                        console.error("Error in sql query...",err);
                        reject(err);
                    } else {
                        console.log("Product feedback upload successfully...");
                        resolve(result);
                    }
                })
            }
        })
       })     
    }
    static productByCategory(category){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
            if(err){
                console.log("Error during connection..");
                reject(err);
            } else {
                let sql = "select category.name,product.title,product.price,product.description,product_images.image_url, professional.name,professional.city,professional.address, professional.pincode,professional.gender,professional.contact_no,professional.email from category join product on category.category_id = product.category_id join product_images on product.product_id = product_images.product_id join professional on  product.professional_id = professional.professional_id where category.name = ?;"
                con.query(sql,[category],(err,result)=>{
                    if(err){                                                                
                        console.log("Error in sql Query ",err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }
        })
        })
    }
    static reviewOnProduct(product_id){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    console.error("Error during Connection..",err);
                    reject(err);
                } else {
                    let sql = "SELECT category.name AS category_name, product.title, product.price,product.description, product_images.image_url,professional.name AS professional_name,professional.city, professional.gender,professional.contact_no,professional.email,professional.professional_id,product_feedback.feedback FROM category JOIN product ON category.category_id = product.category_id JOIN product_images ON product.product_id = product_images.product_id JOIN professional ON product.professional_id = professional.professional_id LEFT JOIN product_feedback ON product.product_id = product_feedback.product_id WHERE product.product_id = ? ";
                    con.query(sql,[product_id],(err,result)=>{
                        if(err){
                            console.log("Error in Sql query ",err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                }


            })
        })
    }
    static ViewReviewer(product_id){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    console.error("Error during Connection..",err);
                    reject(err);
                } else {
                    let sql = "select df.product_id, u.username, df.feedback, di.image_url, p.professional_id, p.name AS professional_name,pr.title AS product_name,pr.price,pr.stock FROM product_feedback df INNER JOIN user u ON df.user_id = u.user_id INNER JOIN product pr ON df.product_id = pr.product_id INNER JOIN product_images di ON pr.product_id = di.product_id INNER JOIN professional p ON pr.professional_id = p.professional_id WHERE df.product_id = ? ";
                    con.query(sql,[product_id],(err,result)=>{
                        if(err){
                            console.log("Error in Sql query ",err);
                            reject(err);
                        } else {
                            console.log("Design Successfully view reviewer on product");
                            resolve(result);
                        }
                    })
                }


            })
        })
  
    }

}
/*SELECT
         category.name AS category_name,
         product.title,
        product.price,
         product.description,
         product_images.image_url,
         professional.name AS professional_name,
        professional.city,
         professional.gender,
         professional.contact_no,
         professional.email,
        product_feedback.feedback
        FROM
       category
        JOIN
        product ON category.category_id = product.category_id
        JOIN
         product_images ON product.product_id = product_images.product_id
        JOIN
         professional ON product.professional_id = professional.professional_id
        LEFT JOIN
         product_feedback ON product.product_id = product_feedback.product_id
         WHERE
         product.product_id = ? ;  */