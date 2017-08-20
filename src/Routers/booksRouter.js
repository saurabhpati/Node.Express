var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectID;

function booksRouterFunc(navbar) {
    var booksRouter = new express.Router();

    booksRouter.route('/')
        .get(function (request, response) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (error, db) {
                if (error) {
                    console.log(error);
                }
                var collection = db.collection('books');
                collection.find({}).toArray(function (error, result) {
                    if (error) {
                        console.error(error);
                    }
                    response.render('books', {
                        navbar: navbar,
                        books: result
                    });
                });
            });
        });

    booksRouter.route('/:id')
        .get(function (request, response) {
            var id = objectId(request.params.id);

            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (error, db) {
                if (error) {
                    console.log(error);
                }
                var collection = db.collection('books');
                collection.findOne({_id: id}, function (error, result) {
                    if (error) {
                        console.error(error);
                    }
                    response.render('book', {
                        navbar: navbar,
                        book: result
                    });
                });
            });
        });

    return booksRouter;
}

module.exports = booksRouterFunc;