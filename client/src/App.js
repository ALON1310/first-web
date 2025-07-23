import { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Register from "./pages/Register";

function App() {
  const [userName, setUserName] = useState(null);

  const handleRegister = (name) => {
    setUserName(name);
  };

  return (
    <div className="App">
      {!userName ? (
        <Register onRegister={handleRegister} />
      ) : (
        <>
          <h1>Welcome, {userName}!</h1>
          <ProductCard />
        </>
      )}
    </div>
  );
}

export default App;

