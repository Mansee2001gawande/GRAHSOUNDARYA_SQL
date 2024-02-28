
import User from '../MODEL/user.model.js';
export const signUp = (request,response,next)=>{
    let name = request.body.name ;
    let username = request.body.username;
    let password = request.body.password;
    let contact = request.body.contact;
    let is_created = request.body.is_created ;
    let is_updates = request.body.is_updates ;


 let user = new User(null,name,username,password,contact,is_created,is_updates);   

 user.signUp()
    .then(result =>{
        return response.status(200).json({message : 'SignnUp successfull'});
    }).catch(err=>{
        return response.status(500).json({error : 'UnAuthourized User'});
    })

}
export const signIn = (request , response,next)=>{
    let username = request.body.username;
    let password = request.body.password;

    User.signIn(username,password)
    .then(result =>{
        return response.status(200).json({message : 'SignIn successfull',data : result});
    }).catch(err=>{
        return response.status(500).json({error : 'UnAuthourized User'});
    })


}