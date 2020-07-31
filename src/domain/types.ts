import { Stack, List, Record } from "immutable"

export type GameBoard = List<0 | 1 | 2>

export type Row = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
export type Col = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type PlayerType = 1 | 2

export type CellOwner = 0 | 1 | 2

export const Player = {
  One: 1,
  Two: 2,
  None: 0
} as const

export class PlayerHint extends Record({ row: undefined, col: undefined, player: undefined}) {
  constructor(params?: { row: Row, col: Col, player: PlayerType}) {
    params ? super(params) : super();
  }
}

export type GameBoardHistory = Stack<GameBoard>

export type Score = {
  player1: number,
  player2: number
}