const asyncHandler = (requestHandler) =>{
    (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

export {asyncHandler}

// ++++++high order function++++
// const asyncHandler = () =>
//     // pass the function inside a function 
// const asyncHandler = (func) => {() => {}}
// // for making async
// const asyncHandler = (func) => async () => {}
 

    //with async await, try catch
// const asyncHandler = (fn) =>async (req, res, next) => {
//     try{
//             await fn(req, res, next)
//     }
//     catch(error){
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }