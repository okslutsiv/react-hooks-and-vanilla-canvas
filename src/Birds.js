import React, { useEffect } from "react";
import styled from "styled-components";
import usePersistentState from "./utils/usePersistentState";
import usePersistentCanvas from "./utils/useCanvas";
import { pathSvg } from "./SVG";

const PATH = new Path2D(pathSvg);
const SCALE = 0.1;
const OFFSET = 250;

function draw(ctx, location, color) {
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 3;
  ctx.save();
  ctx.scale(SCALE, SCALE);
  ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
  ctx.fill(PATH);
  ctx.restore();
}

function Birds({ colors }) {
  const [locations, setLocations] = usePersistentState();
  const { canvasRef, parentRef, dimensions } = usePersistentCanvas();

  const handleClick = e => {
    const newLocation = { x: e.clientX, y: e.clientY };
    setLocations([...locations, newLocation]);
  };

  const handleClear = () => setLocations([]);
  const handleUndo = () => {
    const prevLocations = locations.slice(0, -1);
    setLocations(prevLocations);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#005";
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    locations.forEach((l, i) => {
      draw(ctx, l, colors[i % colors.length]);
    });
  }, [locations, dimensions, canvasRef, colors]);

  return (
    <Container ref={parentRef}>
      <Buttons>
        <Button onClick={handleClear}>Clear All</Button>
        <Button onClick={handleUndo}> Undo</Button>
      </Buttons>
      <canvas
        width={dimensions.width}
        height={dimensions.height}
        ref={canvasRef}
        onClick={handleClick}
      ></canvas>
    </Container>
  );
}
const Button = styled.button`
  height: 32px;
  width: 90px;
  text-transform: uppercase;
  text-align: center;
  margin-left: 18px;
  background-image: linear-gradient(45deg, deepskyblue, dodgerblue);
  color: white;
  border-radius: 2px;
  border: 1px solid skyblue;
  box-shadow: 0 2px 15px #ffffff20, 0 2px 5px 1px dodgerblue;
  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    background-image: linear-gradient(45deg, dodgerblue, deepskyblue);
  }
`;
const Buttons = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  height: 32px;
  display: flex;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;
export default Birds;
