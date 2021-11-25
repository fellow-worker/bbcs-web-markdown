import { Block, Document } from "../../../types";

export type BlockProps = {
    block : Block;
    document : Document;
    onVerseClick : (ref : string) => any
}