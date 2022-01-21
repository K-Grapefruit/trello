import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

const recentodo = localStorage.getItem("todo");
const a = JSON.parse(recentodo as any);
console.log(a);

export const toDoState = atom<IToDoState>({
  key: "todo",
  default: {
    ToDo: a !== null ? a.ToDo : [],
    Doing: a !== null ? a.Doing : [],
    Done: a !== null ? a.Done : [],
  },
});
