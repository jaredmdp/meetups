import MeetupList from '../components/meetups/MeetupList'
import Layout from '../components/layout/Layout';

const TEST = [
  {
    id: 'm1',
    title: 'First Meetup',
    image: 'https://cdn.britannica.com/90/153890-050-32CB447A/Administration-Building-University-of-Manitoba-Winnipeg-Canada.jpg',
    address: 'some address, 12345 Winnipeg Manitoba',
    description: 'this is a meetup at university',
  }
];

function Homepage() {
  return (
    <MeetupList meetups={TEST} />
  )
}


export default Homepage;