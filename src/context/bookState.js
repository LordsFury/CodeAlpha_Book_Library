import AlertContext from './alertcontext';
import bookContext from './bookcontext';
import { useContext, useState } from 'react';

const BookState = (props) => {
  const alcontext = useContext(AlertContext);
  const { showAlert } = alcontext;
  const booksinitial = [];
  const [books, setbooks] = useState(booksinitial);
  const [filterBooks, setfilterBooks] = useState(booksinitial);
  const host = "http://localhost:5000";

  const getBooks = async () => {
    const response = await fetch(`${host}/books/fetchbooks`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    setbooks(json);
    setfilterBooks(json);
  }

  const getshelfbooks = async () => {
    try {
      const response = await fetch(`${host}/user/shelfbooks`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "authToken": localStorage.getItem("token")
        }
      });
      const json = await response.json();
      setfilterBooks(Array.isArray(json.books) ? json.books : []);
      setbooks(Array.isArray(json.books) ? json.books : []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setfilterBooks([]);
      setbooks([]);
    }
  };

  const addBook = async (title, author, category, description, price, Image) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('Image', Image);
    const response = await fetch(`${host}/books/addbook`, {
      method: "POST",
      body: formData,
      headers: {
        "adminToken": localStorage.getItem("admintoken")
      }
    });
    const book = await response.json();
    setbooks(books.concat(book));
    if (book.success) {
      showAlert("success", "Book Added");
    }
    else {
      showAlert("warning", "Book with this title already Added");
    }
  }

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`${host}/books/deletebook/${id}`, {
        method: "DELETE",
        headers: {
          "adminToken": localStorage.getItem("admintoken"),
          "Content-Type": "application/json"
        }
      });
      const json = await response.json();

      if (json.success) {
        setbooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
        setfilterBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
        showAlert("success", "Book Deleted");
      } else {
        showAlert("warning", "Cannot Delete this Book");
      }
    } catch (error) {
      showAlert("danger", "An error occurred while deleting the book");
    }
  };


  const updateBook = async (id, title, author, category, description, price, Image) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('Image', Image);

      const response = await fetch(`${host}/books/updatebook/${id}`, {
        method: "PUT",
        body: formData,
        headers: {
          "adminToken": localStorage.getItem("admintoken")
        }
      });
      const json = await response.json();
      if (json.success) {
        setbooks((prevBooks) => {
          return prevBooks.map((book) =>
            book._id === id
              ? { ...book, title, author, category, description, price, Image }
              : book
          );
        });
        setfilterBooks((prevBooks) => {
          return prevBooks.map((book) =>
            book._id === id
              ? { ...book, title, author, category, description, price, Image }
              : book
          );
        });
        showAlert("success", "Book Updated");
      } else {
        showAlert("warning", "Cannot Update this Book");
      }
    } catch (error) {
      showAlert("danger", "An error occurred while updating the book");
    }
  };

  const searchBook = (title) => {
    const newBooks = books.filter((book) =>
      book.title.toLowerCase().startsWith(title.toLowerCase())
    );
    setfilterBooks(newBooks);
  }

  const addToShelf = async (book) => {
    const response = await fetch(`${host}/user/addtoshelf`, {
      method: "POST",
      body: JSON.stringify({ title: book.title }),
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    if (json.success) {
      showAlert("success", json.msg);
    }
    else {
      showAlert("warning", json.msg);
    }
  }

  const removeFromShelf = async (book) => {
    const response = await fetch(`${host}/user/removefromshelf`, {
      method: "POST",
      body: JSON.stringify({ title: book.title }),
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    if (json.success) {
      showAlert("success", json.msg);
      setbooks((prevBooks) => prevBooks.filter((b) => b.title !== book.title));
      setfilterBooks((prevFilterBooks) => prevFilterBooks.filter((b) => b.title !== book.title));
    } else {
      showAlert("warning", json.msg);
    }
  }
  
  const getReleventBooks=async ()=>{
    let path=window.location.pathname;
    let category=path.split("/").pop();
    const response=await fetch(`${host}/books/getreleventbooks`, {
      method: "POST",
      body: JSON.stringify({category: category}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json=await response.json();
    setbooks(json);
    setfilterBooks(json);
  }

  return (
    <bookContext.Provider value={{ books, filterBooks, addBook, getBooks, deleteBook, updateBook, searchBook, addToShelf, removeFromShelf, getshelfbooks, getReleventBooks}}>
      {props.children}
    </bookContext.Provider>
  )
}

export default BookState