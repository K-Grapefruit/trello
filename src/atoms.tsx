import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "todo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
