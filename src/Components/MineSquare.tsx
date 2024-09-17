import React from "react";
import { MineSquareType } from "../Types";
import Bomb from "../icons/Bomb";
import Flag from "../icons/Flag";

interface MineSquareProps {
  square: MineSquareType;
  leftClick: (x: number) => void;
  rightClick: (x: number) => void;
  hover: (x: number) => void;
}

function MineSquare({ square, leftClick, rightClick, hover }: MineSquareProps) {
  return (
    <div
      onClick={() => leftClick(square.id)}
      onContextMenu={(event) => {
        event.preventDefault();
        rightClick(square.id);
      }}
      onMouseOver={() => hover(square.id)}
      onMouseOut={() => hover(square.id)}
      className={
        "Square" +
        (!square.flipped && square.hovered ? " Hovered" : "") +
        (square.flipped ? " Flipped" : "") +
        (square.adjacentBombs === 1 ? " OneClose" : "") +
        (square.adjacentBombs === 2 ? " TwoClose" : "") +
        (square.adjacentBombs > 2 ? " ThreePlusClose" : "")
      }
    >
      {!square.flipped && square.flagged && <Flag />}
      {square.flipped && square.bomb && <Bomb />}
      {square.flipped &&
        !square.bomb &&
        square.adjacentBombs > 0 &&
        square.adjacentBombs.toString()}
      {square.flipped && !square.bomb && square.adjacentBombs === 0 && "/"}
    </div>
  );
}

export default MineSquare;