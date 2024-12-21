import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class BookTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteBook = this.deleteBook.bind(this);
  }

  deleteBook() {
    axios
      .delete("http://localhost:4000/books/delete-book/" + this.props.obj._id)
      .then((res) => {
        console.log("Book successfully deleted!");
        window.location.reload(); // Reload the page to update the book list
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      title,
      authors,
      isbn,
      pageCount,
      publishedDate,
      thumbnailUrl,
      shortDescription,
      longDescription,
      status,
      categories,
    } = this.props.obj;

    return (
      <tr>
        <td>{title}</td>
        <td>{authors.join(", ")}</td>
        <td>{isbn}</td>
        <td>{pageCount}</td>
        <td>{new Date(publishedDate).toLocaleDateString()}</td>
        <td>
          <a href={thumbnailUrl} target="_blank" rel="noopener noreferrer">
            View Thumbnail
          </a>
        </td>
        <td>{shortDescription}</td>
        <td>{longDescription}</td>
        <td>{status}</td>
        <td>{categories.join(", ")}</td>
        <td>
          <Button
            size="sm"
            variant="warning"
            href={`/edit-book/${this.props.obj._id}`}
          >
            Edit
          </Button>{" "}
          <Button size="sm" variant="danger" onClick={this.deleteBook}>
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
