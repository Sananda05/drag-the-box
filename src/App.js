import { useRef } from "react";
import "./App.css";
import DraggableBox from "./component/DraggableBox";

function App() {
  const wrapperRef = useRef(null);
  return (
    <div className="App">
      <div className="outer_wrapper" ref={wrapperRef}>
        <DraggableBox wrapperRef={wrapperRef} />
      </div>
    </div>
  );
}

export default App;
