function findAccountById(accounts, id) {
  return accounts.find((account) => account["id"] === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((lastName1, lastName2) => lastName1.name.last > lastName2.name.last ? 1 : -1) 
}

function getTotalNumberOfBorrows(account, books) {
  let borrows = []
  // nested for loops go through each 'borrow' of each 'book' and push all borrow id values into the "borrows" array variable
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++){
      borrows.push(books[i].borrows[j])
    }
  }
  const total = borrows.reduce((acc, borrow) => { // reduce() adds increments the acc variable by 1 for each match found in the if statement
    if (borrow.id === account.id) { // if statement inside looks for matches on id in the "borrows" array 
      acc++
    } 
    return acc
  },0)
  return total
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksAuthors = []
  for (let i = 0; i < books.length; i++){ //loops through books. Deconstructs each book and reconstructs it in "bookAuthor"  
   const {id,title,genre,authorId,borrows} = books[i]
   const foundAuthor = authors.find((author) => author.id === books[i].authorId) //find() gets the matching author object for the current book, then that object is nested into "bookAuthor"
   const bookAuthor = {
      id: id,
      title: title,
      genre: genre,
      authorId: authorId,
      author: foundAuthor,
      borrows: borrows
    }
  booksAuthors.push(bookAuthor) //push each bookAuthor into the BooksAuthors array
  }
  //return the books from "bookAuthor" that were borrowed by the account, and the latest borrow has not been returned
  const BooksPossessed = booksAuthors.filter((book) => book.borrows[0].returned === false && book.borrows[0].id === account.id)
  return BooksPossessed
}



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
