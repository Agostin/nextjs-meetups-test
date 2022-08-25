import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetails from "../components/meetups/MeetupDetails";

const MeetupDetailPage = (props) => {
  return (
    <>
      <Head>
        <title>Detail of {props.meetupData.title} meetup</title>
      </Head>
      <MeetupDetails
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://agos:mongo@testcluster.hemmqlb.mongodb.net",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const meetupCollections = client.db("meetups-db").collection("meetups");
  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://agos:mongo@testcluster.hemmqlb.mongodb.net",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const meetupCollections = client.db("meetups-db").collection("meetups");
  const selectedMeetup = await meetupCollections.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetailPage;
