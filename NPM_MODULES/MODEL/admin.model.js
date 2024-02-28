import pool from '../DATABASE/dbConfig.js'
class Admin {
  constructor(admin_id, name, password, username) {
    this.admin_id = admin_id;
    this.name = name;
    this.password = password;
    this.username = username;
  }
  signUp() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (err) {
          console.log("error during connection ");
          reject(err);
        } else {
          let sql = "insert into admin(name,username,password)values(?,?,?)";
          con.query(sql, [this.name, this.username, this.password], (err, result) => {
            err ? reject(err) : resolve(result);
          })
        }
      })
    })
  }

static signIn(username,password){
return new Promise((resolve,reject)=>{
pool.getConnection((err,con)=>{
  if(err){
    console.log("error during connection");
    reject(err);
  } else {
    let sql = "select * from admin where username = ? and password = ?";
    con.query(sql,[username,password],(err,result)=>{
       err ? reject (err) : resolve (result)
      // if(err){
      //   console.error("Error during sql query"+err);
      //   reject(err);
      // } else {
      //   console.log("result "+result);
      //   resolve(result);
      // }
    })
  }
})
})
}
}
export default Admin;