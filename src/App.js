import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import axios from "axios";

// const apiURL = "http://localhost/data/";
const apiURL = "https://jsramverk-editor-daib17.azurewebsites.net/data/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
    // Bindings necessary to make 'this' work in the callback
    this.handleSave = this.handleSave.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(apiURL)
      // .get("http://localhost:1337/data")
      .then((res) => {
        console.log(res);
        this.setState({
          title: res.data.docs[0].title,
          content: res.data.docs[0].content
        });
        // console.log("axios: " + this.state.content);
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps) {
    // console.log("Update: " + this.state.content);
  }

  handleSave(e) {
    e.preventDefault();
    // Check if doc already in database
    axios
      .get(apiURL + this.state.title)
      // .get("http://localhost:1337/data/" + this.state.title)
      .then((res) => {
        const doc = {
          title: this.state.title,
          content: this.state.content
        };
        if (res.data.doc) {
          console.log("UPDATE...");
          axios
            .put(apiURL, doc)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        } else {
          console.log("INSERT...");
          axios
            .post(apiURL, doc)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    // console.log("RENDER:" + this.state.content);
    return (
      <div className="App">
        <h2>Using CKEditor 5 build in React</h2>
        <form onSubmit={this.handleSave}>
          <label>
            Title:
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </label>
          <input type="submit" value="Save" />
        </form>
        <CKEditor
          editor={ClassicEditor}
          data={this.state.content}
          onReady={(editor) => {
            console.log("onReady: ", this.state.content);
          }}
          onChange={(event, editor) => {
            const newContent = editor.getData();
            this.setState({ content: newContent });
            console.log("onChange: ", this.state.content);
          }}
          onBlur={(event, editor) => {
            console.log("onBlur: ", this.state.content);
          }}
          onFocus={(event, editor) => {
            console.log("onFocus: ", this.state.content);
          }}
        />
      </div>
    );
  }
}

export default App;
