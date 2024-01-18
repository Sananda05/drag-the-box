import { useRef, useState } from "react";
import "./App.css";
import DraggableBox from "./component/DraggableBox";

function App() {
  const wrapperRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("top");
  return (
    <div className="App">
      <select
        className="option_selector"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value={"left"}>left</option>
        <option value={"right"}>right</option>
        <option value={"top"}>top</option>
        <option value={"bottom"}>bottom</option>
      </select>

      <div className="outer_wrapper" ref={wrapperRef}>
        <DraggableBox wrapperRef={wrapperRef} selectedOption={selectedOption} />
      </div>
    </div>
  );
}

export default App;
