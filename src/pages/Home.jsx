import React from 'react';
import Terminal from '../Components/displays/Terminal';
import CardList from '../Components/cards/CardList';

const Home = () => {
    return (
        <div className="page" style={{ textAlign: 'center'}}>
            <p className="page-title">Simple OAuth with NodeJs</p>
            <p style={{ fontSize: 20 }}>Passport works</p>
            <p>get started today with just a username and password</p>
            <Terminal 
            userData={'passport.authenticate("facebook")'}
            selected='All'
            />
            <CardList />
            <div style={{ marginBottom: 20 }}></div>
        </div>
    )
}

export default Home
