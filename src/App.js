import { useState } from "react";
import { Layer, Stage } from "react-konva";
import { CurvedText } from "./shapes/CurvedText";

function App() {
  const [sliderValue, setSliderValue] = useState(50);
  const [textValue, setTextalue] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  );

  const onSliderChange = (e) => {
    setSliderValue(e.target.value);
  };
  const onTextChange = (e) => {
    setTextalue(e.target.value);
  };

  return (
    <>
      <input
        type="range"
        min="-100"
        max="100"
        value={sliderValue}
        onChange={onSliderChange}
      />
      <input type="text" value={textValue} onChange={onTextChange} />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <CurvedText curve={sliderValue} text={textValue} />
        </Layer>
      </Stage>
    </>
  );
}

export default App;
