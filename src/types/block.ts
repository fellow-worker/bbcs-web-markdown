import { BlockType } from "./blockType";

export type Block = {
    text : string
    blocks? : Block[]
    type : BlockType
}