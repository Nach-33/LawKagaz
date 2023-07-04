const handleError = (res, error) => {
  console.log(error);
  res.status(500).json({ message: error.message });
};

module.exports = handleError;
