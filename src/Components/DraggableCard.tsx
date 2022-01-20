import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

export const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

interface IDragabbleCardProps {
  todoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ todoId, toDoText, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={todoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

//React.memo => react에게 prop이 변하지 않았다면 DraggableCard를
//다시 렌더링 하지 말라는 것
//바뀌는 데이터만 바뀔 뿐 다른데이터들은 바뀌지 않음
export default React.memo(DraggableCard);
