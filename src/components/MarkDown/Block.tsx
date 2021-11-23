import * as Blocks from "./Blocks";
import { Block as Type, BlockType, Document } from "@/types";
import * as Base from '@/components/Base'

export type BlockProps = {
    block: Type;
    document: Document;
    onVerseClick : (ref : string) => any;
  };

export const Block = (props: BlockProps) => {
    const { block } = props;
    if (!block.text || block.text.trim() === "") return null;

    // Now blocks have to be detected
    switch (block.type) {
        case BlockType.Header:
            return <Blocks.Header {...props} block={block} />;
        case BlockType.AltHeader:
            return <Blocks.AltHeader {...props} block={block} />;
        case BlockType.BlockQuote:
            return <Blocks.BlockQuote {...props} block={block} />;
        case BlockType.OrderedList:
            return <Blocks.OrderedList {...props} block={block} />;
        case BlockType.UnorderedList:
            return <Blocks.UnorderedList {...props} block={block} />;
        case BlockType.Code:
            return <Blocks.Code {...props} block={block} />;
        case BlockType.HorizontalLine:
            return <Base.HorizontalLine />;
        case BlockType.Footnote:
            return <Blocks.Footnote {...props} block={block} />;
        case BlockType.Clear:
            return <Base.Clear />;
        case BlockType.Table:
            return <Blocks.Table {...props} block={block} />;
        default:
            return <Blocks.Paragraph {...props} block={block} />;
    }
};
