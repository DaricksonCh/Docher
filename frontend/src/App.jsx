import React from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />}>
        </Route>
      </Routes>
    </>
  );
};

export default App;
