const { MongoClient } = require("mongodb");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://agos:mongo@testcluster.hemmqlb.mongodb.net",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const db = client.db("meetups-db");
    const meetupCollections = db.collection("meetups");
    await meetupCollections.insertOne(data);
    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
};

export default handler;
