import { Order } from "../models/Order.js";
import { Products } from "../models/Products.js";
import { User } from "../models/User.js";
import { sendUpdateStatusEmail } from "../services/Mailer.js";


export const OrderController = async (req, res) => {
    const { orderId } = req.params;
    const { newStatus } = req.body;

    try {

        const order = await Order.findByPk( orderId, 
            { include:[ 
            {
                model: Products
            },
            {
                model: User
            }
         ]}
         );


        if(!order) return res.status( 404 ).json({ message: 'Order not found' });

        const userId  = order.userId;

        
        const user = await User.findByPk(userId);
        
        if(!user) return res.status( 404 ).json({ message: 'User not found' });
        
        const userEmail = user.email
        
        
 
        order.state = newStatus;
        await order.save();
        await sendUpdateStatusEmail(userEmail, newStatus, order.trackingLink);

        return res.status( 200 ).json({ message: 'Order updated' });
    } catch (error) {
        return console.log({ mgs: error });
    }

}