import React from "react";
const BookTemplate = ({ book }) => {
  const {
    title,
    authors,
    imageLinks: { smallThumbnail },
  } = book;

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${smallThumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select>
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
        <div className="book-authors">{authors[0]}</div>
      </div>
    </li>
  );
};

export default BookTemplate;
