export const handleNotFound = ( req, res, next ) => {
    res.status( 404 ).json({
        msg: 'Endpoint not found'
    })
}