import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditBook extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State initialization
    this.state = {
      title: "",
      isbn: "",
      pageCount: "",
      publishedDate: "",
      thumbnailUrl: "",
      shortDescription: "",
      longDescription: "",
      status: "PUBLISH",
      authors: "",
      categories: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/books/edit-book/" + this.props.match.params.id
      )
      .then((res) => {
        this.setState({
          title: res.data.title,
          isbn: res.data.isbn,
          pageCount: res.data.pageCount,
          publishedDate: res.data.publishedDate.split("T")[0], // Format date for input
          thumbnailUrl: res.data.thumbnailUrl || "",
          shortDescription: res.data.shortDescription || "",
          longDescription: res.data.longDescription || "",
          status: res.data.status,
          authors: res.data.authors.join(", "),
          categories: res.data.categories.join(", "),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const bookObject = {
      title: this.state.title,
      isbn: this.state.isbn,
      pageCount: Number(this.state.pageCount),
      publishedDate: this.state.publishedDate,
      thumbnailUrl: this.state.thumbnailUrl,
      shortDescription: this.state.shortDescription,
      longDescription: this.state.longDescription,
      status: this.state.status,
      authors: this.state.authors.split(",").map((author) => author.trim()),
      categories: this.state.categories
        .split(",")
        .map((category) => category.trim()),
    };

    axios
      .put(
        "http://localhost:4000/books/update-book/" + this.props.match.params.id,
        bookObject
      )
      .then((res) => {
        console.log("Book successfully updated:", res.data);
        this.props.history.push("/book-list");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="ISBN">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              name="isbn"
              value={this.state.isbn}
              onChange={this.onChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="PageCount">
            <Form.Label>Page Count</Form.Label>
            <Form.Control
              type="number"
              name="pageCount"
              value={this.state.pageCount}
              onChange={this.onChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="PublishedDate">
            <Form.Label>Published Date</Form.Label>
            <Form.Control
              type="date"
              name="publishedDate"
              value={this.state.publishedDate}
              onChange={this.onChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="ThumbnailUrl">
            <Form.Label>Thumbnail URL</Form.Label>
            <Form.Control
              type="text"
              name="thumbnailUrl"
              value={this.state.thumbnailUrl}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="ShortDescription">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              as="textarea"
              name="shortDescription"
              value={this.state.shortDescription}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="LongDescription">
            <Form.Label>Long Description</Form.Label>
            <Form.Control
              as="textarea"
              name="longDescription"
              value={this.state.longDescription}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="Status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
              required
            >
              <option value="PUBLISH">PUBLISH</option>
              <option value="DRAFT">DRAFT</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="Authors">
            <Form.Label>Authors (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="authors"
              value={this.state.authors}
              onChange={this.onChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="Categories">
            <Form.Label>Categories (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              name="categories"
              value={this.state.categories}
              onChange={this.onChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" block>
            Update Book
          </Button>
        </Form>
      </div>
    );
  }
}
