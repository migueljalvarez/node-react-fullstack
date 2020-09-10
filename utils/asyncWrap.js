// Helper function that wraps express routes to handle rejected promises

module.exports =  fn => {
  return (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch((err)=>{
      res.status(err.status).json(err)
    })
  }
}