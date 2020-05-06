import React from "react";
import BookTemplate from "./BookTemplate";

const BookShelfTemplate = (props) => {
  const { shelf, shelfbooks } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfbooks.map((book) => (
            <BookTemplate key={book.id} book={book} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelfTemplate;
