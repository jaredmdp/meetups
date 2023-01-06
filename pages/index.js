import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

function Homepage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of user generated meetups via React" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

//executes during prerendering process, wont go to visitor's machines
export async function getStaticProps() {
  //fetch data from API
  const client = await MongoClient.connect(
    'mongodb+srv://Mandapj:FGihrxQncVvwzfJ6@cluster0.pd7ri3k.mongodb.net/meetups');
  const db = client.db();
  //insert into DB
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      })),
    },
    revalidate: 10
  };
}

export default Homepage;