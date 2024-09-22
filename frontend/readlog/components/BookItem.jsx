import React, { useState } from 'react';

const BookItem = ({ book }) => {
  const [isInList, setIsInList] = useState(book.isInList || false);

  const toggleInList = () => {
    setIsInList(!isInList);
    // Här kan du även uppdatera backend om boken har markerats i listan
  };

  return (
    <div className="border p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold">{book.title}</h2>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-600">Genre: {book.genre}</p>
      <div>
        <label className="inline-flex items-center mt-2">
          <input
            type="checkbox"
            checked={isInList}
            onChange={toggleInList}
            className="form-checkbox"
          />
          <span className="ml-2">In List</span>
        </label>
      </div>
    </div>
  );
};



export default BookItem;
