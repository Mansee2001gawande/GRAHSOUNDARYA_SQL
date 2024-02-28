import pool from '../DATABASE/dbConfig.js'
export default class Subscription{
    constructor(id ,name,amount,pro_id,start_date,end_date){
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.pro_id = pro_id;
        this.start_date = start_date;
        this.end_date = end_date;
    }
    static subscription  (name,amount,pro_id,start_date,end_date){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    console.error("Error during connection");
                    reject(err);
                } else {
                    let sql = "insert into subscription (name,amount,professional_id,start_date,end_date)values(?,?,?,?,?)";
                    con.query(sql,[name,amount,pro_id,start_date,end_date],(err,result)=>{
                        if(err){
                            console.error("error during connection....");
                            reject(err);
                        } else {
                            console.log("subscription taken successfully..");
                            resolve(result);
                        }
                    })
                }
            })
        })
    }
}