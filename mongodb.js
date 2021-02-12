const {MongoClient} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'

//The substring to be checked
const checkString = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBhOTQ0NDY2YzlmNDMzMWMwZjZkNjEiLCJpYXQiOjE2MTMxMjMyNjZ9.x9r6JsMincedFkT4l1qDF8ZcRLjHFAfOu_lq8rsPXC4"

//List of documents to be returned
var documentList = [];

MongoClient.connect(connectionURL, { useNewUrlParser: true , useUnifiedTopology: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName) 
    var cursor = db.collection('users').find();
    
    // Execute the each command, triggers for each document
    cursor.each(function(err, item) {
        let documentString = JSON.stringify(item)
        if(documentString.includes(checkString)) {
            console.log(item._id)
            documentList.push(item._id)
        }
    });
})