// queries.js

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } });

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book
db.books.updateOne({ title: "1984" }, { $set: { price: 13.99 } });

// 5. Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });

// 1. Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 2. Projection: title, author, price
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
);

// 3. Sort by price ascending
db.books.find().sort({ price: 1 });

// 4. Sort by price descending
db.books.find().sort({ price: -1 });

// 5. Pagination: Page 1
db.books.find().skip(0).limit(5);

// 6. Pagination: Page 2
db.books.find().skip(5).limit(5);
// 1. Average price by genre
db.books.aggregate([
    { $group: { _id: "$genre", average_price: { $avg: "$price" } } },
    { $sort: { average_price: -1 } }
  ])
  
  // 2. Author with most books
  db.books.aggregate([
    { $group: { _id: "$author", book_count: { $sum: 1 } } },
    { $sort: { book_count: -1 } },
    { $limit: 1 }
  ])
  
  // 3. Group books by decade
  db.books.aggregate([
    {
      $project: {
        decade: {
          $concat: [
            { $toString: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } },
            "s"
          ]
        }
      }
    },
    { $group: { _id: "$decade", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ])
  // 1. Create index on title
db.books.createIndex({ title: 1 })

// 2. Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// 3. Use explain() to show performance
db.books.find({ title: "1984" }).explain("executionStats")
