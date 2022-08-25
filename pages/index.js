import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_DATA = [
  {
    id: "meet1",
    title: "Meetup 1",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Katrinedal_bergsutsikt_2010.jpg",
    address: "Some Address, 123 - Some City (SC)",
    description: "Lorem Ipsum",
  },
  {
    id: "meet2",
    title: "King Prawn Asian Restaurant",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/95/HK_SYP_%E8%A5%BF%E7%92%B0_Sai_Ying_Pun_%E6%B0%B4%E8%A1%97_Water_Street_August_2022_Px3_28_King_Prawn_Restaurant.jpg",
    address: "Some Address, 345 - Hong Kong",
    description: "Lorem Ipsum",
  },
  {
    id: "meet3",
    title: "Meetup 3 in a big building",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/78/HK_SYP_%E8%A5%BF%E7%92%B0_Sai_Ying_Pun_%E6%B0%B4%E8%A1%97_Water_Street_August_2022_Px3_24.jpg",
    address: "Somewhere in the world - Some City",
    description: "Lorem Ipsum",
  },
];

const Homepage = (props) => {
  return (
    <>
      <Head>
        <title>React NextJS test</title>
        <meta name="description" content="Description goes here" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://agos:mongo@testcluster.hemmqlb.mongodb.net",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const meetupCollections = client.db("meetups-db").collection("meetups");
  const meetups = await meetupCollections.find().toArray();

  return {
    props: {
      meetups: meetups.map((item) => ({
        id: item._id.toString(),
        title: item.title,
        address: item.address,
        image: item.image,
      })),
    },
    revalidate: 1,
  };
}

export default Homepage;
