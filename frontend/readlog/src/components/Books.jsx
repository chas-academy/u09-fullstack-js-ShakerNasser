// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import BookItem from './BookItem';

// const Books = () => {
//   const [books, setBooks] = useState([]);
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [genre, setGenre] = useState('');
  
//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     const response = await axios.get('http://localhost:3000/api/books');
//     setBooks(response.data);
//   };

//   const addBook = async () => {
//     const newBook = { title, author, genre };
//     await axios.post('http://localhost:3000/api/books', newBook);
//     fetchBooks(); // Uppdatera boklistan efter att ha lagt till en ny bok
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Books</h1>
      
//       {/* Form för att lägga till ny bok */}
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Add a new book</h2>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="border p-2 mr-2"
//         />
//         <input
//           type="text"
//           placeholder="Author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           className="border p-2 mr-2"
//         />
//         <input
//           type="text"
//           placeholder="Genre"
//           value={genre}
//           onChange={(e) => setGenre(e.target.value)}
//           className="border p-2 mr-2"
//         />
//         <button onClick={addBook} className="bg-blue-500 text-white p-2">Add Book</button>
//       </div>

//       {/* Lista över böcker */}
//       <div className="grid grid-cols-1 gap-4">
//         {books.map((book) => (
//           <BookItem key={book._id} book={book} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Books;
