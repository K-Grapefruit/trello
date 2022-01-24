import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

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
  const [recentVal, setRecentVal] = useRecoilState(toDoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(e.currentTarget.name);
    console.log(index);

    if (recentVal !== null) {
      const key = Object.keys(recentVal);

      const val0 = recentVal[key[0]];
      const val1 = recentVal[key[1]];
      const val2 = recentVal[key[2]];

      const result0 = val0.filter((value) => value.id === id);
      const result1 = val1.filter((value) => value.id === id);
      const result2 = val2.filter((value) => value.id === id);

      //삭제시켜야 할 LIST

      console.log(result0[0]?.id);
      setRecentVal((oldvalue) => {
        if (result0[0]?.id) {
          const copy1 = oldvalue.ToDo;

          const result = copy1.filter((value) => value.id !== id);

          return { ...oldvalue, [key[0]]: result };
        } else if (result1[0]?.id) {
          const copy1 = oldvalue.Doing;
          const result = copy1.filter((value) => value.id !== id);

          return { ...oldvalue, [key[1]]: result };
        } else if (result2[0]?.id) {
          const copy1 = oldvalue.Done;

          const result = copy1.filter((value) => value.id !== id);

          return { ...oldvalue, [key[2]]: result };
        }

        return { ...oldvalue };
      });
    }
  };
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
          <button name={todoId as any} onClick={onClick}>
            Delete
          </button>
        </Card>
      )}
    </Draggable>
  );
}

//React.memo => react에게 prop이 변하지 않았다면 DraggableCard를
//다시 렌더링 하지 말라는 것
//바뀌는 데이터만 바뀔 뿐 다른데이터들은 바뀌지 않음
export default React.memo(DraggableCard);
