function CustomComponent() {
  return (
    <div>
      <h1>Something here</h1>
      <ol>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
        <li>Four</li>
      </ol>
    </div>
  );
}

//HTML DOM JS vanilla imperative style.
const h1 = document.createElement("h1");
h1.textContent = "This is an imperative way to program.";
h1.className = "header";
document.getElementById("root").append(h1);

const Navbar = () => {
  return (
    <nav>
      <h1>Bob's bistro</h1>
      <ul>
        <li>Menu</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

// JSX
ReactDOM.render(
  <div id="child">
    <ul>
      <li>A</li>
      <li>B</li>
    </ul>
    <h1>Hej!</h1>
    <CustomComponent />
    <Navbar />
  </div>,
  document.getElementById("root")
);
