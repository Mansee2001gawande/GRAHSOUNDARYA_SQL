import Admin from "../MODEL/admin.model.js";
export const signUp = (request,response,next)=>{

let username = request.body.username;
let password = request.body.password ;
let name = request.body.name;

const admin  = new Admin(null ,name, password, username,)
admin.signUp()
.then (result =>{
return response.status(200).json({message : 'signUp successfully '});
}).catch(err =>{ 
    console.error("Internal Problem "+err)
    return response.status(500).json({error : 'Internal server problem ',err});
})
}
export const signIn = (request,response,next)=>{
    let username = request.body.username;
    let password = request.body.password ;
    Admin.signIn(username,password)
    .then (result =>{
    return response.status(200).json({message : 'signIn successfully ',data : result});
    }).catch(err =>{ 
        console.error("Internal Problem "+err)
        return response.status(500).json({error : 'Internal server problem ',err});
    })
     
}

