import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

//드래그가 끝났을 때 실행되는 함수

const Wrapper = styled.div`
  display: flex;
  max-width: 600px;

  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;

  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

function App() {
  const [toDos, setTodos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      //same board movement
      setTodos((allBoards) => {
        console.log(allBoards);
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        //그 자리의 데이터 삭제
        boardCopy.splice(source.index, 1);
        //이동한 인덱스 자리에 데이터 추가
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else {
      setTodos((allboards) => {
        //cross board movement
        const targetboard = [...allboards[destination.droppableId]];
        const sourceboard = [...allboards[source.droppableId]];
        const taskObj = sourceboard[source.index];
        sourceboard.splice(source.index, 1);
        targetboard.splice(destination.index, 0, taskObj);

        return {
          ...allboards,
          [source.droppableId]: sourceboard,
          [destination.droppableId]: targetboard,
        };
      });
    }
  };
  console.log(toDos);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
//Object.keys() = Object가 가진 key만 array로 뽑아내줌

export default App;
