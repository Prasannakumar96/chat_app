import React from "react";
import Chat from "./pages/Chat";
import Peer from "./pages/peer";

function App() {
  return (
    <div className="App">
      <div style={{fontSize:"3rem" ,textAlign:"center"}}>mentor</div>
      <Chat />
      {/* <div style={{fontSize:"3rem" ,textAlign:"center"}}>peer</div>
      <Peer /> */}
    </div>
  );
}

export default App;
