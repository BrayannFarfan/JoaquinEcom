import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_ADMIN,
        pass: process.env.MAIL_PASS
    }
})




export async function sendConfirmationEmail ( toEmail, orderId, products, trackingLink) {

    const productsDetails = products.map(product => `${product.name}, Precio: ${product.price}, Descripcion: ${product.description}`).join('\n');


    const mailOptions = {
        from: process.env.MAIL_USER,
        to: toEmail,
        subject: 'purchase successfully confirmed',
        text: `Your Purchase has been confirmed
        Order ID: ${orderId}
        Tracking Link: ${trackingLink}
        Products: ${productsDetails}
        `
    }

    await transporter.sendMail(mailOptions)
}

export async function sendUpdateStatusEmail ( toEmail, newStatus, trackingLink){
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: toEmail,
        subject: 'Order Update',
        text: `Your order status has been updated to ${newStatus}
        Tracking Link: ${trackingLink}`
}

    await transporter.sendMail(mailOptions)
}