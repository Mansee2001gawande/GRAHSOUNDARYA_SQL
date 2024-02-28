import Product from "../MODEL/Product.model.js";
export const addcategory = (request,response,next)=>{
    let name = request.body.categoryName;

    Product.addcategory(null,name)
    .then(result =>{
        return response.status(200).json({message : 'Category name added successfully...'});
    }).catch(err =>{
        console.err("inside catch controller",err);
        return response.status(500).json({error : 'Internal serer Problem.'})
    })
}
export const addproduct =(request,response,next)=>{
     let pro_id = request.body.professionalId;
     let categoryId = request.body.categoryId;
     let price = request.body.price;
     let title = request.body.title;
     let description = request.body.description;
     let status = request.body.status;
     let stock = request.body.stock;

     Product.addproduct(null,pro_id,categoryId,price,title,description,status,stock)
     .then(result =>{
        return response.status(200).json({message : 'Product added successfully'});
     }).catch(err =>{
        return response.status(500).json({error : 'Internal server Problem...'})
     })

}
export const productImage =(request,response,next)=>{
    let filename = request.file.filename;
    let product_id = request.body.product_id;
    let imageURL = "images/" + filename;

     Product.productImage(null,product_id,imageURL)
     .then(result =>{
        return response.status(200).json({message : 'Product Image upload successfully'});
     }).catch(err =>{
        return response.status(500).json({error : 'Internal server Problem...'})
     })

}
export const productFeedback =(request,response,next)=>{
   let product_id = request.body.product_id;
   let user_id = request.body.user_id;
   let feedback = request.body.feedback;

   Product.productFeedback(product_id,user_id,feedback)
   .then(result=>{
      return response.status(200).json({message: 'Product Feedback added successfully'});
   }).catch(err=>{
      return response.status(500).json({error : 'Internal server Problem...'});
   })
}
export const productByCategory = (request,response,next)=>{
   let category = request.body.categoryName ;

   Product.productByCategory (category)
   .then(result => {
        console.log( result)
        if (result.length != 0)
            return response.status(200).json({ data: result });
        return response.status(404).json("Sorry, we couldn't find the information");
    }).catch(err => {
      console.error(err);
        return response.status(500).json({ error: "Internal server Problem..." });
    })

   }
   /*mysql> select category.name,product.title,product.price,product.description,product_images.image_url, professional.name,professional.city,professional.address, professional.pincode,professional.gender,professional.contact_no,professional.email from category join product on category.category_id = product.category_id join product_images on product.product_id = product_images.product_id join professional on  product.professional_id = professional.professional_id where category.name = 'Furniture'; */

   export const reviewOnProduct = (request,response,next)=>{
      let product_id = request.body.product_id ;

      Product.reviewOnProduct(product_id)
      .then(result =>{
         if(result.length !=0)
         return response.status(200).json({data :result})
         return response.status(404).json("Sorry, we couldn't find the information");
      }).catch(err=>{
         console.error("Error inside catch ",err);
         return response.status(500).json({error : "Internal server Problem..."});
      })
   }
   export const ViewReviewer = (request,response,next)=>{
      let product_id = request.body.product_id ;

   Product.ViewReviewer(product_id)
   .then(result =>{
      if(result.length !=0)
      return response.status(200).json({data :result})
      return response.status(404).json("Sorry, we couldn't find the information");
   }).catch(err=>{
      console.error("Error inside catch ",err);
      return response.status(500).json({error : "Internal server Problem..."});
   })
}
