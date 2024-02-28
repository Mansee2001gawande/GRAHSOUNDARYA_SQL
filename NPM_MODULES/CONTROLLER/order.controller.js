import Order from '../MODEL/order.model.js';
import OrderItems from '../MODEL/OrderItems.model.js';
export const addOrderItem = async (request, response, next) => {
    try {
        //Order table data
        let user_id = request.body.user_id;
        let bill_amt = request.body.bill_amount;
        let order_date = request.body.order_date;
        let delivery_date = request.body.delivery_date;
        let status = request.body.status;
        let contact_no = request.body.contact_no;

        //OrderItems 
        let order_id = request.body.order_id;
        let product_id = request.body.product_id;
        let quantity = request.body.quantity;

        let result = await Order.isOrderPlace(order_id);
        console.log("Is OrderPlaced " + result.length);
        if (result.length) {
            console.log(result[0]);
            let order_id = result[0].order_id;
            console.log("Order_id in Order_items table " + order_id)
            await OrderItems.addProductIntoOrder(order_id, product_id, quantity);
            return response.status(200).json({ message: 'Product added successfully in OrderItems' });
        } else {
            await Order.OrderPlace(user_id, bill_amt, order_date, delivery_date, status, contact_no);

            result = await Order.isOrderPlace(order_id);
            await OrderItems.addProductIntoOrder(order_id, product_id, quantity);
            return response.status(200).json({ message: 'Product Add into Order' });
        }
    } catch (err) {
        console.error("controller catch " + err);
    }

}
export const OrderListByDate = (request,response,next)=>{
    let current_date = new Date();

    Order.OrderListByDate(current_date)
    .then(result =>{
        if(result.length !=0)
        return response.status(200).json({data :result})
        return response.status(404).json("Sorry, we couldn't find the information");
     }).catch(err=>{
        console.error("Error inside catch ",err);
        return response.status(500).json({error : "Internal server Problem..."});
     })
  


}