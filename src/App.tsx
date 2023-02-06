import { Component } from "solid-js";

import Calender from "./components/Calender";
import CalenderHeader from "./components/CalenderHeader";

const App: Component = () => {
  return (
    <div>
      <div class="container">
        <h1>Support calender</h1>
      </div>
      <CalenderHeader />
      <Calender />
    </div>
  );
};

export default App;
