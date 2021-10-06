import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./App.css";

import axios from "axios";

// const apiURL = "http://localhost:1337/data/";
const apiURL = "https://jsramverk-editor-daib17.azurewebsites.net/data/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(apiURL)
      .then((res) => {
        this.setState({
          title: res.data.docs[0].title,
          content: res.data.docs[0].content
        });
      })
      .catch((error) => console.log(error));
  }

  handleLoad(e) {
    e.preventDefault();
    axios
      .get(apiURL + this.state.title)
      .then((res) => {
        if (res.data.doc) {
          this.setState({
            title: res.data.doc.title,
            content: res.data.doc.content
          });
        }
      })
      .catch((error) => console.log(error));
  }

  handleSave(e) {
    e.preventDefault();
    const doc = {
      title: this.state.title,
      content: this.state.content
    };

    axios
      .put(apiURL, doc)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <div>
        <h2>Using CKEditor 5 build in React</h2>
        <div className="navbar">
          <label>
            Title:
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </label>
          <button type="button" onClick={this.handleLoad}>
            Load
          </button>
          <button type="button" onClick={this.handleSave}>
            Save
          </button>
        </div>

        <CKEditor
          editor={ClassicEditor}
          data={this.state.content}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const newContent = editor.getData();
            this.setState({ content: newContent });
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
        />
      </div>
    );
  }
}

export default App;
