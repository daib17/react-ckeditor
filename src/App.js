import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

import axios from "axios";

// const apiURL = "http://localhost:1337/data/";
const apiURL = "https://jsramverk-editor-daib17.azurewebsites.net/data/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "<Document Name>",
      content: "",
      list: []
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleListEvent = this.handleListEvent.bind(this);
  }

  handleSave(e) {
    e.preventDefault();
    const doc = {
      title: this.state.title,
      content: this.state.content
    };
    axios
      .put(apiURL, doc)
      .then((res) => {
        this.updateList();
      })
      .catch((error) => console.log(error));
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleListEvent(e) {
    e.preventDefault();
    axios
      .get(apiURL + e.target.value)
      .then((res) => {
        if (res.data.doc) {
          this.setState({
            title: res.data.doc.title,
            content: res.data.doc.content
          });
          this.updateList();
        }
      })
      .catch((error) => console.log(error));
  }

  updateList() {
    axios
      .get(apiURL)
      .then((res) => {
        const list = res.data.docs.map((doc) => (
          <ListGroup.Item
            key={doc._id}
            value={doc.title}
            action
            onClick={this.handleListEvent}
          >
            {doc.title}
          </ListGroup.Item>
        ));
        this.setState({
          list: list
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg={8}>
            <Row>
              <InputGroup>
                <FormControl
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                />
                <Button onClick={this.handleSave} variant="outline-secondary">
                  Save
                </Button>
              </InputGroup>
            </Row>
            <Row>
              <CKEditor
                className="editor"
                editor={ClassicEditor}
                data={this.state.content}
                onReady={(editor) => {this.updateList();}}
                onChange={(event, editor) => {
                  const newContent = editor.getData();
                  this.setState({ content: newContent });
                }}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
              />
            </Row>
          </Col>
          <Col lg={3}>
            <ListGroup>{this.state.list}</ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
