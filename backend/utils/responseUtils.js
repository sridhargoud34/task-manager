

const handleErrorResponse = (res,err) => {
    try{
        const statusCode = err.statusCode|| 500
        return res.status(statusCode).json({
            statusCode,
           error:true,
           message:err.message || 'internal server error',
           response:null,
           err:err.error || {}
            
        })
    }
    catch(err){
        console.log(err)
    }
   
}
module.exports = {
    handleErrorResponse
}