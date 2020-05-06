import React from "react";
import BookTemplate from "./BookTemplate";
import * as BooksAPI from "../BooksAPI";

class SearchPage extends React.Component {
  state = {
    query: "",
    queryResult: [],
  };

  handleAPISearch = async (query) => {
    let books = await BooksAPI.search(query);
    // rubrics : Invalid queries are handled and prior search results are not shown.
    if (books.error) return this.setState({ queryResult: [] });

    this.setQueryResultWithItsShelf(books);
  };

  // DD is DropDown
  setQueryResultWithItsShelf = (books) => {
    // rubric: If a book is assigned to a shelf on the main page and that book appears on the search page, the correct shelf should be selected on the search page. If that book's shelf is changed on the search page, that change should be reflected on the main page as well.
    // The option "None" should be selected if a book has not been assigned to a shelf.

    const { currentlyReading, wantToRead, read } = this.props;
    const mainPageBooks = [...currentlyReading, ...wantToRead, ...read];

    // adding the shelf property and its value if book is in main-page
    books = books.map((book) => {
      // check if book is available on main page
      const filterBook = mainPageBooks.filter(
        (mainBook) => mainBook.id === book.id
      );
      const isAvailable = filterBook.length > 0;
      return isAvailable ? { ...book, shelf: filterBook[0].shelf } : book;
    });

    this.setState({ queryResult: books });
  };

  handleChange = () => {
    const inputValue = this.input.value;
    this.setState({ query: inputValue }, async () => {
      if (inputValue === "") return;
      await this.handleAPISearch(inputValue);
    });
  };

  renderSearchResult = () => {
    return this.state.queryResult.map((book) => (
      <BookTemplate
        key={book.id}
        book={book}
        handleBookMove={this.props.handleBookMove}
      />
    ));
  };

  render() {
    const { history } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => history.push("/")}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              ref={(input) => (this.input = input)}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.query.length > 0 && this.renderSearchResult()}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
