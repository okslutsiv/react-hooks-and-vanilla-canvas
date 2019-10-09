import React from "react";
import { GlobalStyles } from "./GlobalStyles";
import Birds from "./Birds";

const baseColors = [
  "#026592",
  "#94bfd2",
  "#91a4a2",
  "#247067",
  "#38b1d4",
  "#fcffff",
  "#a18999",
  "#95c092",
  "#88dfe4",
];
function App() {
  return (
    <div>
      <GlobalStyles></GlobalStyles>
      <Birds colors={baseColors}></Birds>
    </div>
  );
}
// const Main = styled.div`
//   display: flex;
//   width: 100%;
//   height: 100vh;
//   flex-wrap: wrap;
// `;
export default App;
