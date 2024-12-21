import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class CreateBook extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      title: "",
      isbn: "",
      pageCount: 0,
      publishedDate: "",
      thumbnailUrl: "",
      shortDescription: "",
      longDescription: "",
      status: "DRAFT",
      authors: "",
      categories: "",
    };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const bookObject = {
      title: this.state.title,
      isbn: this.state.isbn,
      pageCount: parseInt(this.state.pageCount),
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
      .post("http://localhost:4000/books/create-book", bookObject)
      .then((res) => console.log(res.data));

    this.setState({
      title: "",
      isbn: "",
      pageCount: 0,
      publishedDate: "",
      thumbnailUrl: "",
      shortDescription: "",
      longDescription: "",
      status: "DRAFT",
      authors: "",
      categories: "",
    });

    this.props.history.push("/book-list");
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

          <Button
            variant="primary"
            size="lg"
            block="block"
            type="submit"
            className="mt-4"
          >
            Create Book
          </Button>
        </Form>
      </div>
    );
  }
}
