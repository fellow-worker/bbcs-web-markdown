import styled from "styled-components";

export const BaseStyle = styled.div`
  font-family: 'ecs-font', "Roboto","Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size:14px;
  -webkit-font-smoothing: antialiased;
  letter-spacing: .1px;
  line-height: 21px;
  color: #111111;

  ul, ol {
    padding-inline-start: 20px;
  }

  h1, h2, h3, h4, h5, h6 {
      color: #154879;
  }

  code {
    padding:2px;
    background-color:lightgray;
    font-family: 'ecs-editor-font', 'Courier New', Courier, monospace;
  }

  blockquote {
    border-left: 4px solid #154879;
    margin:16px 0;
    padding: 4px 16px;
    background-color: #EEEEEE;
  }

  a.reference, a.footnote {
    color : #154879;
    text-decoration: none;
  }

  span.verse {
    color : #154879;
    cursor: pointer;
  }

  table {
    border : 1px solid rgba(0, 0, 0, 0.1);
    border-spacing: 0;
    border-collapse: collapse;
    margin: 14px 0;

    tr.header td {
      background-color: #154879;
      color:white
    }

    td {
      padding: 2px 6px;
      border : 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`