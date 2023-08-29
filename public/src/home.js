function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  const checkedOut = books.filter((book) => book.borrows[0].returned === false)
  return checkedOut.length
}

function getMostCommonGenres(books) {
  const genres = books.map((book) => book.genre) //returns an array of genres for every book
  const genreCounts = {}
  let formattedGenres = []
  genres.forEach((genre) => {
    genreCounts[genre] = (genreCounts[genre] || 0) + 1 //creates an object with each genre as a key, and count as the sum of times that a given genre appeared in the "genres" array
  })                                                   
  for (let genreName in genreCounts){ //reformats "genreCounts" to {name: value count: value} 
    formattedGenres.push({name: genreName, count: genreCounts[genreName]})
 }
  return sortTopFive(formattedGenres) //return top 5 objects by "count" amount 
}

function getMostPopularBooks(books) {
  let bookCounts = []
  books.forEach((book) => { //pushes each book title and amount of borrows to "bookCounts" array
    const {title,borrows} = book
    bookCounts.push({name: title, count: borrows.length})
  })
 return sortTopFive(bookCounts) //return top 5 objects by "count" amount 
}


function getMostPopularAuthors(books, authors) {
  let authorBorrowCounts = []
  //loops through each author. For each author - loops through each book to see if book was written by the author
  authors.forEach((author) => {
    const {name} = author
    const fullName = `${name.first} ${name.last}`
    let authorBorrows = []
    books.forEach((book) => {
      if (author.id === book.authorId) {
        authorBorrows = [...authorBorrows, ...book.borrows] //Uses spread to concat all matching book.borrows arrays into 1 array
      }
    })
   authorBorrowCounts.push({name: fullName, count: authorBorrows.length}) //push an object for each author that displays the name and number of amount of borrows
  })
  return sortTopFive(authorBorrowCounts) //return top 5 objects by "count" amount 
}

//Helper function: Takes array of objects {name: value, count: value}, sorts them by value of count (highest to lowest), then returns array of top five objects
function sortTopFive(itemsObj) {
  itemsObj.sort((num1, num2) => (num1.count < num2.count) ? 1 : (num1.count > num2.count) ? -1 : 0)
  return itemsObj.slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
  sortTopFive,
};

