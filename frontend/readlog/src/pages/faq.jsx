import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">FAQ</h1>
      <h2 className="text-xl mb-6">Questions and answers</h2>
      <div className="bg-white shadow-md rounded-lg">
        {faqData.map((faq, index) => (
          <div
            className={`border-b last:border-b-0 ${index === openIndex ? "bg-gray-100" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="py-4 px-6 cursor-pointer flex justify-between items-center">
              <span className="text-lg font-semibold">{faq.question}</span>
              <span className="text-gray-500">{index === openIndex ? '-' : '+'}</span>
            </div>
            {index === openIndex && (
              <div className="py-2 px-6 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const faqData = [
  { question: 'What is this application?', answer: 'This application is a book management tool that allows users to create a personal reading list, add books, and recommend them to others.' },
  { question: 'How does the book recommendation feature work?', answer: 'The recommendation feature allows you to suggest books to other users. When you find a book you love, you can mark it as a recommendation. Other users will then see your recommendations in their browsing experience.' },
  { question: 'Can I search for books within the app?', answer: 'Yes, there is a search functionality that lets you find books in your list or in the app’s database. Simply enter the title or author’s name in the search bar, and the app will display matching results.' },
  { question: 'How do I add a book to my list?', answer: 'To add a book, navigate to the "Add Book" section. Fill in the required information such as the title, author, and genre. Once you’ve entered the details, click the "Add Book" button to save it to your list.' },
  { question: 'Can I edit or delete a book from my list?', answer: 'Yes, you can edit or delete books from your list. Go to your reading list, select the book you want to modify, and choose the appropriate option to either edit the details or remove it entirely.' },
  { question: 'Is there a way to track my reading progress?', answer: 'Yes, the app allows you to track your reading progress. You can mark books as "currently reading" and update your progress percentage as you read.' },
  { question: 'Can I share my reading list with others?', answer: 'Absolutely! You can share your reading list through social media or by generating a shareable link within the app, allowing others to see your recommended books.' },
  { question: 'Are there any user reviews for the books?', answer: 'Yes, users can leave reviews and ratings for each book. This feature helps others in the community make informed decisions based on personal experiences.' },
];

export default FAQ;
