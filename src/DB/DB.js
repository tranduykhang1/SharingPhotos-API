var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

const conn = () => {
	return MongoClient.connect(url, { useUnifiedTopology: true })
		.then(db => {
			return db.db("sep3_1700215");
		})
		.catch(err => {
			return err;
		});
};

module.exports = conn();
