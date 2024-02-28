// import Subscription from "../MODEL/subscription.model.js";
// export const subscription = (request,response,next)=>{
//     let name = request.body.name;
//     let amount = request.body.amount;
//     let pro_id = request.body.professional_id;
//     let start_date = request.body.start_date;
//     let end_date = request.body.end_date;

//     Subscription.subscription(name,amount,pro_id,start_date,end_date)
//     .then(result =>{
//         return response.status(200).json({message : 'subscription taken successfully'});
//     }).catch(err =>{
//         console.error("Errror inside catch...",err);
//         return response.status(500).json({error : 'Internal server Problem...'});
//     })

// }