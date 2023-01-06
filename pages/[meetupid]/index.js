import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
    return (
        <MeetupDetail meetups={props.meetups} />
    );
};

export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'm1',
                },
            },
            {
                params: {
                    meetupId: 'm2',
                },
            },
        ],
    }
}

export async function getStaticProps(context) {
    //fetch data for a single meetup
    context.params.meetupId;

    const meetupId = context.params.meetupId;

    return {
        props: {
            meetupData: {
                image: 'https://cdn.britannica.com/90/153890-050-32CB447A/Administration-Building-University-of-Manitoba-Winnipeg-Canada.jpg',
                id: meetupId,
                title: 'First Meetup',
                address: 'Some Adress Street',
                description: 'Our first meetup',
            }
        }
    }
}

export default MeetupDetails;