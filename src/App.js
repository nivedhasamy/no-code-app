import React, { useState, useEffect } from "react";
import "./styles.css";
import RenderCard from "./renderCard";
import "bootstrap/dist/css/bootstrap.min.css";
import Draggable from "./draggable";
import elements from "./elements";

export default function App() {
  const [cardConfig, setCardConfig] = useState([]);

  useEffect(() => {
    setCardConfig(JSON.parse(localStorage.getItem("progress")) || []);
  }, []);

  const onSave = () =>
    localStorage.setItem("progress", JSON.stringify(cardConfig));

  const onClear = () => setCardConfig([]);

  const onDragStart = (e, option) => {
    e.dataTransfer.setData("element", option);
  };

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e) => {
    let item = e.dataTransfer.getData("element");

    setCardConfig((x) => [...x, elements[item]]);
  };

  return (
    <div className="App">
      <h4>React Studio</h4>
      <span className="gui-container">
        <div className="elements-container">
          {Object.keys(elements).map((option) => {
            return (
              <h5
                key={option}
                onDragStart={(e) => onDragStart(e, option)}
                draggable
                className="draggable"
              >
                {option}
              </h5>
            );
          })}
        </div>
        <div className="drag-n-drop-container">
          <div
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => {
              onDrop(e);
            }}
            className="noselect drop-container droppable"
          >
            {cardConfig.map((config, i) => (
              <Draggable
                index={i}
                element={config}
                setCardConfig={setCardConfig}
                key={`${config?.component}_${i}`}
              >
                {RenderCard(config, i)}
              </Draggable>
            ))}
          </div>
        </div>
      </span>
      <div className="btnContainer">
        <button onClick={onSave}>Save</button>
        <button className="buttonInverse" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
