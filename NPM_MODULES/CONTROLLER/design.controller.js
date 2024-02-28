import RoomType from "../MODEL/design.model.js";

export const roomType = (request, response, next) => {
    let roomType = request.body.roomType;

    RoomType.roomType(null, roomType)
        .then(result => {
            return response.status(200).json({ message: "Room Type added successfully" })
        }).catch(err => {
            console.error("Error inside catch ");
            return response.status(500).json({ error: 'Internal server Problem..' });
        })
}

export const design = (request, response, next) => {
    let filename = request.file.filename;
    let room_id = request.body.room_id;
    let video_URL = "videos/" + filename;
    let pro_id = request.body.professionalId;

    RoomType.design(null, pro_id, room_id, video_URL)
        .then(result => {
            const designId = result.insertId;
            if (designId) {
                return response.status(200).json({ message: 'Video uploaded successfully...', designId: designId });
            } else {
                return response.status(500).json({ error: 'Internal server Problem: No insert ID returned from database' });
            }
        }).catch(err => {
            console.log("result " + err);
            return response.status(500).json({ error: 'Intenal server Problem..' });
        })

}
export const design_images = (request, response, next) => {
    let filename = request.file.filename;
    let design_id = request.body.design_id;
    let image_url = "images/" + filename;   // pass img from local save data
    let description = request.body.description;

    RoomType.design_images(null, design_id, image_url, description)
        .then(result => {
            return response.status(200).json({ message: 'Image uploaded successfully ' })
        }).catch(err => {
            console.error("Error inside catch...", err)
            return response.status(500).json({ error: 'internal server Problem ....' })

        })
}
export const design_feedback = (request, response, next) => {
    let design_id = request.body.design_id;
    let user_id = request.body.user_id;
    let feedback = request.body.feedback;

    RoomType.design_feedback(design_id, user_id, feedback)
        .then(result => {
            return response.status(200).json({ message: 'Design feedback added successfully' });
        }).catch(err => {
            return response.status(500).json({ error: 'Internal server Problem...' })
        })

}
export const favourite_design = (request, response, next) => {
    let user_id = request.body.user_id;
    let design_id = request.body.design_id

    RoomType.favourite_design(user_id, design_id)
        .then(result => {
            return response.status(200).json({ message: "Design successfully added in favourites" });
        }).catch(err => {
            return response.status(500).json({ error: "Internal server Problem.." });
        })
}
export const getDesignByRoomType = (request, response, next) => {
    let roomType = request.body.roomType;

    RoomType.getDesignByRoomType(roomType)
        .then(result => {
            console.log(result)
            if (result.length != 0)
                return response.status(200).json({ data: result });
            return response.status(404).json("Sorry, we couldn't find the information");
        }).catch(err => {
            return response.status(500).json({ error: "Internal server Problem..." });
        })
}
export const viewalldesign = (request, response, next) => {
    RoomType.viewalldesign()
        .then(result => {
            return response.status(200).json({ message: 'All designes ', data: result });
        }).catch(err => {
            return response.status(500).json({ error: 'Internal server Problem...' });
        })
}
export const description = (request, response, next) => {
    let design_id = request.body.design_id;
    RoomType.description(design_id)
        .then(result => {
            console.log(result)
            if (result.length != 0)
                return response.status(200).json({ data: result });
            return response.status(404).json("Sorry, we couldn't find the information");
        }).catch(err => {
            return response.status(500).json({ error: "Internal server Problem..." });
        })

}


