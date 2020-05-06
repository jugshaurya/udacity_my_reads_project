import React from "react";
import BookShelfTemplate from "./BookShelfTemplate";

class MainPage extends React.Component {
  render() {
    const {
      currentlyReading,
      wantToRead,
      read,
      handleBookMove,
      history,
    } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <BookShelfTemplate
            shelf={"Currently Reading"}
            shelfbooks={currentlyReading}
            handleBookMove={handleBookMove}
          />
          <BookShelfTemplate
            shelf={"Want To Read"}
            shelfbooks={wantToRead}
            handleBookMove={handleBookMove}
          />
          <BookShelfTemplate
            shelf={"Read"}
            shelfbooks={read}
            handleBookMove={handleBookMove}
          />
        </div>
        <div className="open-search">
          <button onClick={() => history.push("/search")}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default MainPage;
