import { User } from '../models/User.js';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const Register = async ( req, res ) => {

    const { name, email, password , isAdmin} = req.body;

    try {

        const newPass = md5( password );
        const findUser = await User.findOne( { where: { email } } );

        if( findUser ) {
            res.status( 400 ).json({ message: 'User already exists' } );
        }else{
            const register = await User.create( { name, email, password: newPass, isAdmin } );
            return res.status( 201 ).json( { message: 'User created', register , ok: 201} );
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
}
export const Login = async ( req, res ) => {

    const { email, password } = req.body;
    try {

        const user = await User.findOne( { where: { email } } );
        if( !user) return res.status( 404 ).json( { message: 'User with that email does not exist' } );

        const validPassword = user.password === md5( password );
        if( !validPassword ) return res.status( 400 ).json( { message: 'Invalid password' } );

        const isAdmin = user.isAdmin;
        let token = jwt.sign({ id: user.id , isAdmin}, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({ message: 'Login successful', token, isAdmin });

    } catch ( error ) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
}