import { response } from 'express';
import pool from '../DATABASE/dbConfig.js'
export default class Professional {
    constructor(id, p_name, city, address, pincode, gender, contact_no, is_created, is_active, is_updated, email, profileImg_URL) {
        this.id = id;
        this.p_name = p_name;
        this.city = city;
        this.address = address;
        this.pincode = pincode;
        this.gender = gender;
        this.contact_no = contact_no;
        this.is_created = is_created;
        this.is_active = is_active;
        this.is_updated = is_updated;
        this.email = email;
        this.profileImg_URL = profileImg_URL;
    }

    static isProfessionalExist(pro_id) {

        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error during connection");
                    reject(err);
                } else {
                    let sql = "select * from professional where professional_id = ? ";
                    // console.log("Proffessional id... " + pro_id);
                    con.query(sql, [pro_id], (err, result) => {
                        if (err) {
                            console.error("error during connection....");
                            reject(err);
                        } else {
                            // console.log("professional exist/not in table,...");
                            console.log("Isprofessional Exist  "+result)

                            resolve(result);
                        }
                    })
                }

            })
        })
    }

    static ProfileDesigner(p_name, city, address, pincode, gender, contact_no, is_created, is_active, is_updated, email, profileImg_URL) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("error during Connection...", err);
                    reject(err);
                } else {
                    let sql = "insert into Professional(name,city,address,pincode,gender,contact_no,is_created,is_active,is_update,email,profileImg_URL)values (?,?,?,?,?,?,?,?,?,?,?)";

                    con.query(sql, [p_name, city, address, pincode, gender, contact_no, is_created, is_active, is_updated, email, profileImg_URL], (err, result) => {
                        if (err) {
                            console.error("Error in sql query...", err);
                            reject(err);
                        } else {
                            console.log("Profile created successfully...");
                            resolve(result);

                        }
                    })
                }

            })
        })
    }
    static ProfileDesigner(p_name, city, address, pincode, gender, contact_no, is_created, is_active, is_updated, email, profileImg_URL) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("error during Connection...", err);
                    reject(err);
                } else {
                    let sql = "insert into Professional(name,city,address,pincode,gender,contact_no,is_created,is_active,is_update,email,profileImg_URL)values (?,?,?,?,?,?,?,?,?,?,?)";

                    con.query(sql, [p_name, city, address, pincode, gender, contact_no, is_created, is_active, is_updated, email, profileImg_URL], (err, result) => {
                        if (err) {
                            console.error("Error in sql query...", err);
                            reject(err);
                        } else {
                            console.log("Profile created successfully...");
                            resolve(result);

                        }
                    })
                }

            })
        })
    }

    static getDesignerByCity(city) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("error during Connection...", err);
                    reject(err);
                } else {
                    let sql = "select * from Professional where city = ?";

                    con.query(sql, [city], (err, result) => {
                        if (err) {
                            console.error("Error in sql query...", err);
                            reject(err);
                        } else {
                            console.log("professional Info get successfully...");
                            resolve(result);

                        }
                    })
                }

            })
        })
    }

    static ProfileDesigner(p_name, city, address, pincode, gender, contact_no, is_created, is_active, is_updated, email, profileImg_URL) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("error during Connection...", err);
                    reject(err);
                } else {
                    let sql = "insert into Professional(name,city,address,pincode,gender,contact_no,is_created,is_active,is_update,email,profileImg_URL)values (?,?,?,?,?,?,?,?,?,?,?)";

                    con.query(sql, [p_name, city, address, pincode, gender, contact_no, is_created, is_active, is_updated, email, profileImg_URL], (err, result) => {
                        if (err) {
                            console.error("Error in sql query...", err);
                            reject(err);
                        } else {
                            console.log("Profile created successfully...");
                            resolve(result);

                        }
                    })
                }

            })
        })
    }
    static reviewOnDesign(design_id){
        return new Promise((resolve,reject)=>{
            pool.getConnection ((err,con)=>{
                if(err){
                    console.error("Error during Connection... ",err);
                    reject(err);
                } else{
                    let sql = "SELECT df.design_id, u.username, df.feedback, di.image_url, di.description, p.professional_id, p.name AS professional_name FROM design_feedback df INNER JOIN user u ON df.user_id = u.user_id INNER JOIN design d ON df.design_id = d.design_id INNER JOIN design_image di ON d.design_id = di.design_id INNER JOIN professional p ON d.professional_id = p.professional_id WHERE df.design_id = ?";
                    con.query(sql,[design_id],(err,result)=>{
                        if(err){
                            console.log("Error in sql Query..."+err);
                            reject(err);
                        } else 
                        resolve(result);
                    })
                }
            })
        })
    }

}

/*mysql> SELECT
         df.design_id,
         u.username,
        df.feedback,
         di.image_url,
         di.description,
         p.professional_id,
         p.name AS professional_name
         FROM
         design_feedback df
         INNER JOIN
         user u ON df.user_id = u.user_id
         INNER JOIN
         design d ON df.design_id = d.design_id
         INNER JOIN
         design_image di ON d.design_id = di.design_id
         INNER JOIN
         professional p ON d.professional_id = p.professional_id
          WHERE
         df.design_id = ?;  */