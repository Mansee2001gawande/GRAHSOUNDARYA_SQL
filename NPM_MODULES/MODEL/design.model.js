import pool from '../DATABASE/dbConfig.js'
export default class RoomType {
    constructor(room_id, roomType) {
        this.roomType = roomType;
        this.room_id = room_id;
    }
    static roomType(room_id, roomType) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error in connection");
                    reject(err);
                } else {
                    let sql = "insert into roomType (roomType) values(?)";
                    con.query(sql, [roomType], (err, result) => {
                        if (err) {
                            console.error("Error in sql query");
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                }
            })
        })
    }
    static design(id, pro_id, room_id, video_URL) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error during connection...");
                    reject(err);
                } else {
                    let sql = "insert into design (professional_id,room_id,video)values(?,?,?)";
                    con.query(sql, [pro_id, room_id, video_URL], (err, result) => {
                        if (err) {
                            console.error("error in sql query ");
                            reject(err);
                        } else {
                            console.log("video uploded successfully");
                            resolve(result);
                        }
                    })
                }
            })
        })
    }
    static design_images(id, design_id, image_url, description) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error during connection..", err);
                    reject(err);
                } else {
                    let sql = "insert into design_image (design_id,image_url,description)values(?,?,?)";
                    con.query(sql, [design_id, image_url, description], (err, result) => {
                        if (err) {
                            console.error("Error during Connection..");
                            reject(err);
                        } else {
                            console.log("image uploded successfully");
                            resolve(result);

                        }
                    })
                }
            })
        })
    }
    static design_feedback(design_id, user_id, feedback) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error during Connection...");
                    reject(err);
                } else {
                    let sql = "insert into design_feedback(design_id,user_id,feedback)values(?,?,?)";
                    con.query(sql, [design_id, user_id, feedback], (err, result) => {
                        if (err) {
                            console.error("Error in sql query...",err);
                            reject(err);
                        } else {
                            console.log("Design feedback added successfully...");
                            resolve(result);
                        }
                    })
                }
            })
        })
    }
    static favourite_design(user_id, design_id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error during Connection");
                    reject(err);
                } else {
                    let sql = "insert into favourite_design (user_id,design_id)values(?,?)";
                    con.query(sql, [user_id, design_id], (err, result) => {
                        if (err) {
                            console.error("Error in sql query");
                            reject(err);
                        } else {
                            console.log("Design added in favourites..");
                            resolve(result);
                        }
                    })
                }
            })
        })
    }
    static getDesignByRoomType(roomType) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.log("Error during Connection...");
                    reject(err);
                } else {
                    let sql = "SELECT design.video, design_image.image_url,professional.name, professional.city, professional.address, professional.pincode, professional.gender, professional.contact_no, professional.email, roomType.roomType FROM design JOIN design_image ON design.design_id = design_image.design_id JOIN roomType ON design.room_id = roomType.room_id JOIN professional ON professional.professional_id = design.professional_id WHERE     roomType.roomType =  ? ";


                    con.query(sql, [roomType], (err, result) => {
                        if (err) {
                            console.error("Error in sql query..", err);
                            reject(err);
                        } else {
                            console.log("data get successfully..")
                            resolve(result)
                        }
                    })
                }
            })
        })
    }
    static viewalldesign() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.error("Error during Connection...");
                    reject(err);
                } else {
                    let sql = "select * from design_image join design on design.design_id = design_image.design_id join roomType on roomType.room_id = design.room_id join professional on professional.professional_id = design.professional_id";
                    con.query(sql, (err, result) => {
                        if (err) {
                            console.error("Error in sql in Sql Query..", err);
                            reject(err);
                        } else
                            resolve(result);

                    })
                }

            })
        })
    }
    static description(design_id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.log("Error during connection ", err);
                    reject(err)
                } else {
                    let sql = "select description from design_image where design_id = ?";
                    con.query(sql, [design_id], (err, result) => {
                        if (err) {
                            console.log * ("Error in sql query..." + err);
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


/*SELECT 
    design.video,
    design_image.image_url,
    professional.name,
    professional.city,
    professional.address,
    professional.pincode,
    professional.gender,
    professional.contact_no,
    professional.is_created,
    professional.is_update,
    professional.email,
    roomType.roomType
FROM 
    design
JOIN 
    design_image ON design.design_id = design_image.design_id
JOIN 
    roomType ON design.room_id = roomType.room_id
JOIN 
    professional ON professional.professional_id = design.professional_id 
WHERE 
    roomType.roomType =  ?;
 */