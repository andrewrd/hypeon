## Hypeon-Api

This app is to create an API interface to the destination app which will be able to:

- Create post
- Get current post
- Token based auth


### Run this the first time to initialise the database
```
	MongoClient.connect(url, function(err, db) {
		  assert.equal(null, err);
		  console.log("Connected correctly to create post");
		  
		  if(err) { return console.dir(err); }
				 db.collection('posts').insertOne({
				  	username: 'andrew',
				  	message: 'hi this is the first posts',
				  	image: 'this is an image link',

					function(err, result) {
				    assert.equal(err, null);
				    console.log("Inserted a document into the database");
				    callback();
				    }
				});
	});
```

- mongoexpress for admin 'mongo-express etcetc'
- run node using supervisor in dev 'supervisor ./bin/www'
- run mongodb before launch 'mongod'


### Production 
- Deploy on digital ocean
- Ubuntu 
- PM2 
- NodeJS 