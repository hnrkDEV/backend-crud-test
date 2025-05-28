module.exports = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
};
