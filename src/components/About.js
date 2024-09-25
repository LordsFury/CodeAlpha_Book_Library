import React from 'react';

const About = (props) => {
  let { mode } = props;
  return (
    <div className="accordion container my-5" id="accordionExample">
      <h2 className='mx-2 my-3'>Library Features</h2>
      <div className={`accordion-item bg-${mode}`} style={{ color: mode === 'light' ? 'black' : 'white' }}>
        <h2 className='accordion-header'>
          <button className={`accordion-button collapsed bg-${mode}`} style={{ color: mode === 'light' ? 'black' : 'white' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            User Account Management
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <strong>Users can create an account, log in, and manage their personal information.</strong> Once registered, users have access to a personalized dashboard where they can view their reading history, update their profile, and manage preferences. Account security is prioritized, ensuring a seamless and secure user experience. Users can also reset their passwords or update their email addresses at any time, keeping their profiles up to date.
          </div>
        </div>
      </div>
      <div className={`accordion-item bg-${mode}`} style={{ color: mode === 'light' ? 'black' : 'white' }}>
        <h2 className="accordion-header">
          <button className={`accordion-button collapsed bg-${mode}`} style={{ color: mode === 'light' ? 'black' : 'white' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Book Categories
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <strong>Explore a wide range of book categories to suit all kinds of readers.</strong> Whether you are into fiction, non-fiction, mystery, fantasy, or science, the library offers a vast collection of books that can be easily browsed by category. Users can filter their searches to quickly find the genres that interest them the most, making it easier to discover new favorites or revisit classic reads. The category system is designed to streamline the process of exploring the library's extensive collection.
          </div>
        </div>
      </div>
      <div className={`accordion-item bg-${mode}`} style={{ color: mode === 'light' ? 'black' : 'white' }}>
        <h2 className="accordion-header">
          <button className={`accordion-button collapsed bg-${mode}`} style={{ color: mode === 'light' ? 'black' : 'white' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Search Books by Title
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <strong>Quickly find books using the search feature.</strong> Users can type in a book's title, and the search engine will display results that match the query. This feature helps users navigate the library's collection more efficiently, especially when they know exactly what they're looking for. It also supports partial matches, so even if users remember only part of the title, they can still find the book they want.
          </div>
        </div>
      </div>
      <div className={`accordion-item bg-${mode}`} style={{ color: mode === 'light' ? 'black' : 'white' }}>
        <h2 className="accordion-header">
          <button className={`accordion-button collapsed bg-${mode}`} style={{ color: mode === 'light' ? 'black' : 'white' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            Manage Your Shelf
          </button>
        </h2>
        <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <strong>Organize your bookshelf by adding or removing books based on your preferences.</strong> Users can curate their own reading shelves by adding books from the library. Books that you’ve added to your shelf are easy to access, and once you’ve finished reading a book, you can simply remove it from your shelf. This feature helps users manage their ongoing reads and future reading lists with ease. Additionally, users can mark books as 'read' or 'currently reading' to track their progress.
          </div>
        </div>
      </div>

      <style jsx>{`
        .accordion-button.collapsed::after {
          filter: ${mode === 'light' ? 'invert(0)' : 'invert(1)'};
        }
        .accordion-button::after {
          filter: ${mode === 'light' ? 'invert(0)' : 'invert(1)'};
        }
      `}</style>
    </div>
  );
}

export default About;