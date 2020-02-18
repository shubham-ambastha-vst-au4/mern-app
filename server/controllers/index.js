module.exports={
  ...require('./auth')
}

module.exports.notFound = (req, res, next)=>{
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err)
}

module.exports.error = (err, req, res, next)=>{
    return res.status(err.status || 500).json({
      success: false,
      error: {
        message: err.message || 'Something went wrong.',
      },
    });
};