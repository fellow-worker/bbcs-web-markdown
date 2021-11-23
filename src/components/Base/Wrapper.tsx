import styled from "styled-components";

export const Wrapper = styled.div`

    p.left, td.left { text-align: left; }
    p.right, td.right { text-align: right; }
    p.center, td.center { text-align: center; }
    p.justify, td.justify { text-align: justify }

    img {
        max-width: 100%;
    }

    img.left { float:left; padding-right: 8px; }
    img.right { float:right; padding-left: 8px; }

    a {
        border-width: 0xp;
    }
`