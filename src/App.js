import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "<p>Hello from CKEditor 5!</p>",
    };
  }

  updateContent(newData) {
    this.setState({
      data: newData,
    });
  }

  render() {
    return (
      <div className="App">
        <h2>Using CKEditor 5 build in React</h2>
        <button onClick={() => console.log(this.state.data)}>Save</button>
        <CKEditor
          editor={ClassicEditor}
          data={this.state.data}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const newData = editor.getData();
            this.setState({ data: newData });
            console.log(event, editor, newData);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    );
  }
}

export default App;
