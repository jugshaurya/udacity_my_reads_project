import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import SearchPage from "./components/SearchPage";
import MainPage from "./components/MainPage";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  async componentDidMount() {
    await this.fetchAllBooks();
  }

  fetchAllBooks = async () => {
    const books = await BooksAPI.getAll();

    // Filtering the books into their Shelfs
    const currentlyReading = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");

    this.setState({ currentlyReading, wantToRead, read });
  };

  // Adding Search page Books - New book addition is available through update().
  handleBookMove = async (event, book) => {
    const ShelfWanted = event.target.value;

    // if a book is on search page and it is not in mainpage means book.shelf is undefined
    if (typeof book.shelf === "undefined" && ShelfWanted === "none") {
      // nothing is required to done if none is selected on search page book
      return;
    }

    // if shelf is other than "none" is choosen on search page:
    if (typeof book.shelf === "undefined" && ShelfWanted !== "none") {
      // Optimistic Update
      const newShelf = [
        ...this.state[ShelfWanted],
        { ...book, shelf: ShelfWanted },
      ];

      this.setState({
        [ShelfWanted]: newShelf,
      });

      // Update in the API
      return await BooksAPI.update(book, ShelfWanted);
    }

    // dont change the book shelf if it already exist.
    if (book.shelf === ShelfWanted) return;

    // if choice is "none" at main-page remove that book
    if (ShelfWanted === "none") {
      this.setState({
        [book.shelf]: this.state[book.shelf].filter(
          (shelfBook) => shelfBook.id !== book.id
        ),
      });

      // Update in the API
      return await BooksAPI.update(book, ShelfWanted);
    }

    // otherwise move books b/w 3 shelfs now!

    // remove book with ID [book.id] from [book.shelf] Array shelf and add it to [shelfWanted] Array
    const newShelfBook = { ...book, shelf: ShelfWanted };
    const remainingBooks = this.state[book.shelf].filter(
      (b) => b.id !== book.id
    );

    this.setState({
      [book.shelf]: remainingBooks,
      [ShelfWanted]: [...this.state[ShelfWanted], newShelfBook],
    });

    // Update in the API
    await BooksAPI.update(book, ShelfWanted);
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <MainPage
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
                handleBookMove={this.handleBookMove}
                {...props}
              />
            )}
          />
          <Route
            path="/search"
            render={(props) => (
              <SearchPage
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
                handleBookMove={this.handleBookMove}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
