var express = require('express'),
    mongodb = require('mongodb').MongoClient;

function adminRouterFunc(nav) {

    var adminRouter = new express.Router();

    adminRouter.route('/')
        .get(function (request, response) {
            response.render('index');
        });

    adminRouter.route('/addbooks')
    .get(function (request, response) {
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (error, db) {
            if (error) {
                console.log(error);
            }
            var books = [{
                    id: '1',
                    source: 'http://api.randomuser.me/portraits/thumb/men/58.jpg',
                    title: 'War and Peace',
                    author: 'Leo Tolstoy'
                },
                {
                    id: '2',
                    source: 'http://api.randomuser.me/portraits/thumb/women/56.jpg',
                    title: 'Harry Potter and the Prisoner of Azkaban',
                    author: 'J.K Rowling'
                },
                {
                    id: '3',
                    source: 'http://api.randomuser.me/portraits/thumb/men/29.jpg',
                    title: 'The Alchemest',
                    author: 'Paulo Coelho'
                },
                {
                    id: '4',
                    source: 'http://api.randomuser.me/portraits/thumb/women/11.jpg',
                    title: 'The Mysterious Affair at Styles',
                    author: 'Agatha Christie'
                },
                {
                    id: '5',
                    source: 'http://api.randomuser.me/portraits/thumb/men/42.jpg',
                    title: 'The Crescent Moon',
                    author: 'Lao She'
                }
            ];
            var collection = db.collection('books');
            collection.insertMany(books, function (error, result) {
                if (error) {
                    console.log(error);
                }
                response.send(result);
            });
            db.close();
        });
    });

    return adminRouter;
}

module.exports = adminRouterFunc;