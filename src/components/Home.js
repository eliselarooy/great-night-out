import React from 'react';
import { getSpecialEvents } from '../lib/api';
import EventCard from './EventCard';

const initialUserSearch = {
  event: '',
  date: '',
  location: '',
};

function Home() {
  const [userSearch, setUserSearch] = React.useState(initialUserSearch);
  const [specialEvents, setSpecialEvents] = React.useState(null);

  function handleSearchChange(e) {
    setUserSearch({ ...userSearch, [e.target.name]: e.target.value });
  }

  React.useEffect(() => {
    const getSpecialEventsData = async () => {
      try {
        const {
          data: { results },
        } = await getSpecialEvents();
        setSpecialEvents(results);
      } catch (err) {
        console.error(err);
      }
    };
    getSpecialEventsData();
  }, []);

  console.log(userSearch);
  console.log(specialEvents);

  return (
    <section className='hero is-fullheight-with-navbar is-primary'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title has-text-centered'>Events Home Page</h1>
        </div>
      </div>
      <div className='box container'>
        <div className='columns'>
          <div className='column'>
            <input
              type='text'
              placeholder='Search for event'
              name='event'
              value={userSearch.event}
              onChange={handleSearchChange}
              className='input is-primary is-rounded'
            />
          </div>
        </div>
        <div className='columns'>
          <div className='column'>
            <input
              type='date'
              name='date'
              value={userSearch.date}
              onChange={handleSearchChange}
              className='input is-primary is-rounded'
            />
          </div>
          <div className='column'>
            <input
              type='search'
              placeholder='Location'
              name='location'
              value={userSearch.location}
              onChange={handleSearchChange}
              className='input is-primary is-rounded'
            />
          </div>
        </div>

        <div className='columns is-centered'>
          <div className='column is-half is-centered'>
            <button className='button is-primary is-rounded'>Search</button>
          </div>
        </div>
      </div>

      <div className='container'>
        <h2 className='title has-text-centered'>Featured Events</h2>
        <div className='columns'>
          {!specialEvents ? (
            <p>Loading...</p>
          ) : (
            specialEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
