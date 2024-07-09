const getOrders = (req, res) => {
  res.send('Get all orders');
};

const createOrder = (req, res) => {
  res.send('Create a new order');
};

module.exports = {
  getOrders,
  createOrder,
};
