/**
 * BooksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
"use strict";
module.exports = {

  /**
   * `BooksController.entry()`
   */
  entry: (req, res) => {
    res.view("admin/newBooks");
  },

  /**
   * `BooksController.books()`
   */
  books: async function (req, res) {
    const makeRequest = async () => {
      try {
        const showAllBooks = await Books.find()
          .populate('_Inventory')
          .then(books => {
            if (!books || books.length === 0) {
              throw new Error('No Books Found')
            }
            // return res.ok(books)
            return res.view('admin/books', {
              books: books
            })
          })
        // sails.log(showAllBooks)
      } catch (err) {
        return res.status(500).send('No books in Database!')
        // throw err
      }
    }
    makeRequest()
  },

  // /**
  //  * `BooksController.onebook()`
  //  */
  // onebook: async function (req, res) {
  //   let mongo_bookId = req.params.id
  //   // console.log(mongo_bookId)
  //   if (!mongo_bookId) {
  //     return res.badRequest({
  //       err: ('Invalid mongo_bookId')
  //     })
  //   }
  //   const makeRequest = async () => {
  //     try {
  //       const showBook = await Books.findOne({
  //           id: mongo_bookId
  //         })
  //         .populate('_Category')
  //         .then(books => {
  //           if (!books || books.length === 0) {
  //             throw new Error('No Books Found')
  //           }
  //           return res.ok(books)
  //         })
  //     } catch (err) {
  //       throw err
  //     }
  //   }
  //   makeRequest()
  //     .catch(err => res.notFound(err));
  // },

  /**
   * `BooksController.create()`
   */
  create: async function (req, res) {
    // Request parameters from headers/body
    let genre = req.body.genre
    let bookName = req.param('book_name');
    let authorName = req.param('author_name');
    let publisherName = req.param('publisher_name');
    let isbn_10 = req.param('isbn10');
    let isbn_13 = req.param('isbn13');
    let price = req.param('price');
    let type = req.param('type');
    let language = req.param('lang');
    let imgLink = req.param('img_link');

    // Creating globals
    var inventory_id;

    // Validate params
    if (genre) {
      Array.isArray(genre)
      genre = genre.toString()
    }
    if (type) {
      Array.isArray(type)
      type = type.toString()
    }
    if (!bookName) {
      return res.badRequest({
        err: 'Invalid Param : book_name'
      })
    }
    if (!authorName) {
      return res.badRequest({
        err: 'Invalid Param : author_name'
      })
    }
    if (!publisherName) {
      return res.badRequest({
        err: 'Invalid Param : publisher_name'
      })
    }
    if (!isbn_10) {
      return res.badRequest({
        err: 'Invalid Param : isbn'
      })
    }
    if (!price) {
      return res.badRequest({
        err: 'Invalid Param : price'
      })
    }
    // if (!imgLink) {
    //   return res.badRequest({
    //     err: 'Invalid Param : book_img'
    //   })
    // }
    // Create Inventory & Books
    const insertNewBook = async () => {
      try {
        const inventory = await Inventory.create({
          reorderStatus: false,
          status: "pending"
        }).fetch()
        sails.log('inventory_id is :', inventory.id);
        inventory_id = inventory.id;
        const book = await Books.create({
          book: bookName,
          author: authorName,
          publisher: publisherName,
          isbn_10,
          isbn_13,
          price,
          imgLink,
          genre,
          type,
          language,
          _Inventory: inventory.id
        }).fetch()
        sails.log('book_id is :', book.id);
        return {
          book,
          inventory
        }
      } catch (err) {
        // Book already exists in bookstore OR if book is not inserted
        try {
          Inventory.destroy({
            id: inventory_id
          }).then(
            sails.log(`inventory item has been successfully deleted with ID : ${inventory_id}`)
          ).catch(err => res.serverError(err))
        } catch (err) {
          throw err
        }
        console.log('Problem is :', err);
        if (err.code = "E_UNIQUE") {
          res.status(403).send("ISBN already exists in Bookstore")
        } else {
          throw err;
        }
      }
    }
    insertNewBook()
      .then(result => res.ok(result))
      .catch(err => res.end(err))
  },

  // /**
  //  * `BooksController.update()`
  //  */
  // update: async function (req, res) {
  //   let mongo_bookId = req.params.id,
  //     // Book Details Object
  //     booksDetails = {},

  //     bookName = req.param('book_name'),
  //     authorName = req.param('author_name'),
  //     publisherName = req.param('publisher_name'),
  //     isbn = req.param('isbn'),
  //     price = req.param('price'),
  //     bookImg = req.param('book_img')

  //   if (bookName) {
  //     booksDetails.Book = bookName;
  //   }
  //   if (authorName) {
  //     booksDetails.Author = authorName;
  //   }
  //   if (publisherName) {
  //     booksDetails.Publisher = publisherName;
  //   }
  //   if (isbn) {
  //     booksDetails.ISBN = isbn;
  //   }
  //   if (price) {
  //     booksDetails.Price = price;
  //   }
  //   if (bookImg) {
  //     booksDetails.BookIMG = bookImg;
  //   }
  //   // console.log(booksDetails)
  //   const makeRequest = async () => {
  //     try {
  //       const updateBooks = await Books.update({
  //             id: mongo_bookId
  //           },
  //           booksDetails
  //         )
  //         .then(books => {
  //           return res.ok(books)
  //         })
  //     } catch (err) {
  //       throw err
  //     }
  //   }
  //   makeRequest()
  //     .catch(err => res.ok(err))
  // },

  // /**
  //  * `BooksController.delete()`
  //  */
  // delete: async function (req, res) {
  //   let mongo_bookId = req.params.id
  //   // console.log(mongo_bookId)
  //   if (!mongo_bookId) {
  //     return res.badRequest({
  //       err: ('Invalid mongo_bookId')
  //     })
  //   }
  //   const makeRequest = async () => {
  //     try {
  //       const deleteBook = await Books.destroy({
  //         id: mongo_bookId
  //       }).then(books => {
  //         res.ok(`Book has been successfully deleted with ID : ${mongo_bookId}`)
  //       }).catch(err => res.serverError(err))
  //     } catch (err) {
  //       throw err
  //     }
  //   }
  //   makeRequest()
  //     .catch(err => res.notFound(err))
  // }

};
