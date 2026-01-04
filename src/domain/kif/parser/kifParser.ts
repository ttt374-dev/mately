// parseKif.ts
//import { isValidKifData, type KifData } from "../types";
import { parseHands } from "./kifParseHand";
import { parseBoard } from "./kifParseBoard";
import { parseEvents } from "./kifParseEvent";
import { parseHeader } from "./kifParseHeader";
import type { ParseResult } from "./parseResult";
import { createDefaultBoard, createEmptyBoard } from "../factory";
import type { KifContent } from "../types";



export function parseKif(text: string): ParseResult<KifContent>  {
  const lines = text.split(/\r?\n/);

  const headers = parseHeader(lines)
  const hands = parseHands(lines)
  const givenBoard = parseBoard(lines)   
  const events = parseEvents(lines)

  const board = (givenBoard ) ? givenBoard :
    ( headers['手合割'] === '平手' ? createDefaultBoard() : createEmptyBoard() )
  
  const kifContent: KifContent = { headers, board, hands, events } ;

  //if (isValidKifData(kifData)){
  if (true){ // TODO: validation
    return { 
      ok: true, value: kifContent
    }
  } else {
    return {
      ok: false, error: { message: "invalid kif data"}
    }
  }
}

