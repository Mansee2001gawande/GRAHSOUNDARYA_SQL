import pool from '../DATABASE/dbConfig.js'

 class User {
    constructor(user_id,name,username,password,contact,is_created,is_updates){
        this.user_id = user_id ;
        this.name = name;
        this.username = username;
        this.password = password ;
        this.contact = contact;
        this.is_created = is_created;
        this.is_updates = is_updates;
    }
         signUp(){
            return new Promise ((resolve,reject)=>{
                pool.getConnection((err,con)=>{
                    console.log("name "+this.name +" username "+this.username+" password "+this.password+" contact_no "+this.contact+" is_created "+this.is_created+" is_updates "+this.is_updates);

                    if(err){
                        console.log("Error during connection",err);
                        reject(err)
                    } else {
                       let  sql = "insert into user(name,username,password,contact_no,is_created,is_updates)values (?,?,?,?,?,?)";

                       con.query(sql,[this.name,this.username,this.password,this.contact,this.is_created,this.is_updates],(err,result)=>{
                        if(err){
                            console.error("Error in sql query..",err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                       })
                    }
                })
            })
        }
        static signIn(username , password){
            return new Promise ((resolve,reject)=>{
                pool.getConnection((err,con)=>{
                    if(err){
                        console.error("Error during connection ");
                        reject(err);
                    } else {
                        let sql = "select * from user where username = ? and password = ? ";
                        con.query(sql,[username,password],(err,result)=>{
                            if(err){
                                console.error ("Error in sql query....");
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        })
                    }
                })
            })
        }

    }
    export default User;
