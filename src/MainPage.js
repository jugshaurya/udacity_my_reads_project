import React from "react";
import BookShelfTemplate from "./components/BookShelfTemplate";
import * as BooksAPI from "./BooksAPI";

class MainPage extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  async componentDidMount() {
    await this.fetchAllBooks();
  }

  fetchAllBooks = async () => {
    const books = await BooksAPI.getAll();

    const currentlyReading = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");

    this.setState({ books, currentlyReading, wantToRead, read });
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <BookShelfTemplate
            shelf={"Currently Reading"}
            shelfbooks={currentlyReading}
          />
          <BookShelfTemplate shelf={"Want To Read"} shelfbooks={wantToRead} />
          <BookShelfTemplate shelf={"Read"} shelfbooks={read} />
        </div>
        <div className="open-search">
          <button onClick={() => this.props.history.push("/search")}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default MainPage;
