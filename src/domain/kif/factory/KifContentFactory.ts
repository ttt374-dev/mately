import type { KifContent } from "../types";
import { createEmptyBoard } from "./BoardFactroy";
import { createEmptyHands } from "./HandsFactory";


export function createKifContent(
  partial?: Partial<KifContent>
): KifContent {
  return {
    board: createEmptyBoard(),
    hands: createEmptyHands(),
    events: [],
    headers: {},
    ...partial,
  };
}
