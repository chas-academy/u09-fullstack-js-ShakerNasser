import React from 'react';
import BookList from '../components/BookList'; // Justera sökvägen om nödvändigt

function home() {
  return (

    
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of the application.</p>
      <BookList />
    </div>
  );
}

export default home;
