import products from "../data/products.json";//products
import transactions from "../data/transactions.json";
import orders from '../data/orders.json'
import users from '../data/users.json'
//------------------fetch items
export const getTopItems = (data, limit = 10) => {
  const allItems = data.flatMap(category => category.items);
  return allItems.filter(item => item.isTop).slice(0, limit);
};
export const getNewItems = (data, limit = 10) => {
  const allItems = data.flatMap(category => category.items);
  return allItems.filter(item => item.isNew).slice(0, limit);
};

//--------------------fetch categories
export const getCategories = () => {
  return products.map((category) => ({
    categoryName: category.categoryName || "N/A",
    categoryImage: category.categoryImage || "https://via.placeholder.com/100?text=Category"
  }));
};


//---------------fectch transactions

// Get all transactions
export const getAllTransactions = () => {
  return transactions;
};

// Get transactions by status (e.g., 'Pending', 'Completed')
export const getTransactionsByStatus = (status) => {
  return transactions.filter(txn => txn.Status === status);
};

// Get recent transactions by date (sorted descending)
export const getRecentTransactions = (limit = 10) => {
  return [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

// Get transactions by customer name
export const getTransactionsByCustomer = (customerName) => {
  return transactions.filter(txn => txn.customer === customerName);
};

// Get total amount of all transactions
export const getTotalTransactionAmount = () => {
  return transactions.reduce((total, txn) => total + txn.amount, 0);
};


//--------------------get all orders
export const getAllOrders = () => {
  return orders;
};


//-----------get all items
export const getAllItems = (data) => {
  return data.flatMap(category =>
    category.items.map(item => ({
      ...item,
      categoryName: category.categoryName,
      categoryImage: category.categoryImage
    }))
  );
};

//---------------get all users
export const getAllUsers = () => {
  return users;
};
