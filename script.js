/**
 * This function creates an app to track products that are loaned out.
 * It uses local storage to store the data.
 */
function createLoanTrackerApp() {
  // Define an array to hold the loaned products
  let loanedProducts = [];

  // Check if there is any data in local storage
  if (localStorage.getItem("loanedProducts")) {
    // If there is, parse the data and assign it to the loanedProducts array
    loanedProducts = JSON.parse(localStorage.getItem("loanedProducts"));
  }

  // Define a function to add a new loaned product
  function addLoanedProduct(productName, borrowerName, loanDate) {
    // Create a new object to hold the loaned product data
    const newProduct = {
      productName: productName,
      borrowerName: borrowerName,
      loanDate: loanDate
    };

    // Add the new product to the loanedProducts array
    loanedProducts.push(newProduct);

    // Save the updated loanedProducts array to local storage
    localStorage.setItem("loanedProducts", JSON.stringify(loanedProducts));
  }

  // Define a function to get all loaned products
  function getAllLoanedProducts() {
    // Return the loanedProducts array
    return loanedProducts;
  }

  // Define a function to remove a loaned product
  function removeLoanedProduct(productName) {
    // Find the index of the product to remove
    const index = loanedProducts.findIndex(
      product => product.productName === productName
    );

    // If the product is found, remove it from the loanedProducts array
    if (index !== -1) {
      loanedProducts.splice(index, 1);

      // Save the updated loanedProducts array to local storage
      localStorage.setItem("loanedProducts", JSON.stringify(loanedProducts));
    }
  }

  // Return an object containing the public functions
  return {
    addLoanedProduct: addLoanedProduct,
    getAllLoanedProducts: getAllLoanedProducts,
    removeLoanedProduct: removeLoanedProduct
  };
}
