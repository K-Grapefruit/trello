import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const onDragEnd = () => {};
function App() {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="one">
        {() => (
          <ul>
            <Draggable draggableId="first" index={0}>
              {() => <li>One</li>}
            </Draggable>
            <Draggable draggableId="second" index={1}>
              {() => <li>Two</li>}
            </Draggable>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
