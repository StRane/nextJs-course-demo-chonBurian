import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A first meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/b/b4/Bangkok_montage_3.jpg",
//     address: "Some address 3, 12345 Bangkok",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/b/b4/Bangkok_montage_3.jpg",
//     address: "Some address 3, 12345 Bangkok",
//     description: "This is second meetup!",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Chonburian Meetups</title>
        <meta
          name="description"
          content="Browse a highly active React chonburian meetups!"
        />
        <meta
          name="content"
          content="Dynamic pages from mongodb response and next routing"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   return {
//     props:{
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MDB_KEY);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
