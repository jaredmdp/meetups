import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>

    );
};

export async function getStaticPaths() {
    //fetch data from API
    const client = await MongoClient.connect(
        'mongodb+srv://Mandapj:FGihrxQncVvwzfJ6@cluster0.pd7ri3k.mongodb.net/meetups');
    const db = client.db();
    //insert into DB
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: { meetupid: meetup._id.toString() },
        }))
    }
}

export async function getStaticProps(context) {
    //fetch data for a single meetup
    const meetupid = context.params.meetupid;

    //fetch data from API
    const client = await MongoClient.connect(
        'mongodb+srv://Mandapj:FGihrxQncVvwzfJ6@cluster0.pd7ri3k.mongodb.net/meetups');
    const db = client.db();
    //insert into DB
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupid) });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        }
    };
};

export default MeetupDetails;