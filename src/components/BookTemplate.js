import React from "react";

const BookTemplate = ({ book, handleBookMove }) => {
  const { title, authors, imageLinks, shelf } = book;
  // rubrics: It's fine to filter out books with missing thumbnails
  if (typeof imageLinks === "undefined") return null;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${imageLinks.smallThumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onClick={(event) => {
                if (book.shelf && book.shelf === event.target.value) return;
                handleBookMove(event, book);
              }}
              defaultValue={shelf || "none"}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {/* I Know idx as key is a bad idea, but what are the choices! */}
          {authors &&
            authors.map((author, idx) => <div key={idx}>{author}</div>)}
        </div>
      </div>
    </li>
  );
};

export default BookTemplate;
