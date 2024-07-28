import "./App.css";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import AllRoutes from "./Components/Routes/AllRoutes";

function App() {
  return (
    <div className="App" >
      <header>
        <NavigationBar></NavigationBar>
      </header>
      <body>
        <AllRoutes></AllRoutes>
      </body>
    </div>
  );
}

export default App;
