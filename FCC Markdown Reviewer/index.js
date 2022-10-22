class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorText:
        "Heading level 1\n===============\n\nHeading level 2\n---------------\n**Love is bold**\n\n" +
        "[Basic markdown syntax.](https://www.markdownguide.org/ 'Basic syntax guide is over here')\n\n" +
        "Here is an empty paragraph in code: `<p></p>`\n\nHere's multi-line code:\n\n```\n" +
        "function printMyText() {\nconsole.log('Hello!')\n}" +
        "\n```\n> I am a block quote!\n\n- I am a list item.\n\nHere's an image of a cute kitten:\n\n" +
        "![Kitten](http://placekitten.com/200/300)",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      editorText: event.target.value,
    });
  }

  render() {
    return (
      <div className={"wrapper"}>
        <div className={"editor-wrapper"}>
          <div className={"left-toolbar"}>
            <span className={"center-h"}>EDITOR</span>
          </div>
          <textarea
            id="editor"
            value={this.state.editorText}
            onChange={this.handleChange}
          >
            {this.state.editorText}
          </textarea>
        </div>
        <div className={"preview-wrapper"}>
          <div className={"right-toolbar"}>
            <span className={"center-h"}>PREVIEW</span>
          </div>
          <Previewer markdown={this.state.editorText} />
        </div>
      </div>
    );
  }
}

const Previewer = (props) => {
  const dirty = marked.parse(props.markdown);
  const clean = DOMPurify.sanitize(dirty);
  function createMarkup() {
    return { __html: clean };
  }
  return <div id="preview" dangerouslySetInnerHTML={createMarkup()} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
