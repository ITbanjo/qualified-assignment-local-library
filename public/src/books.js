function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) { 
  const checkedOut = books.filter((book) => book.borrows[0].returned === false) //Uses filter() to return an array of books that have been checked out (return === false)
  const returned = books.filter((book) => book.borrows[0].returned === true) //Uses filter() to return an array of books that have been returned (return === true)
  const combined = nestTwoArraysInsideArray(checkedOut,returned) //Calls helper function to nest both arrays inside of an array, then returns array containing 2 arrays
  return combined
}

function getBorrowersForBook(book, accounts) {
  const {borrows} = book
  let tenAccounts = []
  for (let i = 0; i < borrows.length; i++){ //Loops through borrows array
    const borrow = borrows[i]
    //for each borrow object find() compares each account object to see if there is a match on id, and returns the account if true
    //also, !tenAccounts.includes(account) keeps the function from returning the same account more than once
    const foundAccInfo = accounts.find((account) => borrow.id === account.id && !tenAccounts.includes(account))
    const {id,picture,age,name,company,email,registered} = foundAccInfo
    if (tenAccounts.length < 10) { //restructures elements in "foundAccInfo" to include borrow status element. Limits length of tenAccounts variable to 10 values
      tenAccounts.push(
        {
          id: id,
          returned: borrow.returned,
          picture: picture,
          age: age,
          name: name,
          company: company,
          email: email,
          registered: registered
        }
     )}
   }
return tenAccounts
}
  

//Helper function: takes in 2 arrays and nests them inside another array --- used in partitionBooksByBorrowedStatus()
function nestTwoArraysInsideArray(array1,array2) {
  let outerArray = []
  outerArray[0] = array1
  outerArray[1] = array2
  return outerArray
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
  nestTwoArraysInsideArray,
};
