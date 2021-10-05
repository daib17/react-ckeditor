import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import axios from "axios";

class MyEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "<p>Hello from CKEditor 5!</p>"
    };
  }

   updateContent(newData) {
    this.setState({
      data: newData
    });
  }

  render() {
    return (
      <CKEditor
        editor={ClassicEditor}
        data={this.state.data}
        onReady={(editor) => {
          axios
            // .get("https://jsramverk-editor-daib17.azurewebsites.net/")
            .get("http://localhost:1337/")
            
            .then((response) => {
              // console.log(response.data.data.msg);
              this.setState({ data: response.data.data.msg });
            })
            .catch((error) => console.log(error));
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
    );
  }
}

export default MyEditor;
