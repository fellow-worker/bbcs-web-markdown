import { Alignment } from ".";

export type Table = {
    header? : {
        values : string[],
        align : Alignment[]
    };
    rows : string[][];
    columns : number;
}