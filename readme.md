# Hypeon
Hypeon is a image sharing app for entrepeneurs allowing users to share images of their journeys to the world. 

###Launching the api and the app

Starting the API
1. Run mongodb before launch using 'mongod'
2. Run 'npm start'
3. The server should be running at this point
Starting the app
1. Open the ExpoIDE
2. Test the app using the simulator and sharing should be functional

## Frontend
The frontend is written in React Native, and you are able to preview the app after running 'npm install' and then running ExpoIDE simulator.

## Backend
This app is to create an API interface using NodeJS to the destination app which will be able to:

- Create post hosted on Amazon S3
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

### To do: Deployment
- Deploy on digital ocean
- Ubuntu 
- PM2 
- NodeJS 