import { useRouter } from "next/router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (meetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/");
  };

  return (
    <>
      <h1>New Meetup Form page</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
