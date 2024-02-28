import Cart from "../MODEL/cart.model.js";
import CartItems from "../MODEL/CartItems.model.js";

export const addTocart = async (request, response, next) => {
    try {

        //cart_List
        let product_id = request.body.product_id;
        let cart_id = request.body.cart_id;
        let quantity = request.body.quantity;
        //==================================================  cart 
        let user_id = request.body.user_id;

        let result = await Cart.isCartExist(cart_id);
        console.log("isCartExistc" + result.length);

        if (result.length) {
            //cart Exist and then we add product
            console.log(result[0]);
            let cart_id = result[0].cart_id;

            console.log("Cart_id in cart_items table " + cart_id)
            await CartItems.addItem(product_id, cart_id, quantity);
            return response.status(200).json({ message: 'Product added successfully in the cart..' });
        } else {
            await Cart.createCart(user_id);
            result = await Cart.isCartExist(user_id);
            await CartItems.addItem(product_id, cart_id, quantity);
            return response.status(200).json({ message: 'Product added in the cart' });

        }
    } catch (err) {
        console.error("controller catch " + err);
    }
}