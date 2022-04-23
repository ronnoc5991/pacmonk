import type { MazeTemplate } from '@/types/MazeTemplate';

export const useGridOverlay = (mazeTemplate: MazeTemplate) => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  const templateContainer = document.createElement("div");
  templateContainer.style.width = `${canvas.width}px`;
  templateContainer.style.height = `${canvas.height}px`;
  templateContainer.classList.add("template-container");
  templateContainer.classList.add("is-hidden");
  mazeTemplate.forEach((row) => {
    row.forEach((cell) => {
      const cellDiv = document.createElement("div");
      cellDiv.style.width = `${canvas.width / row.length}px`;
      cellDiv.style.height = `${canvas.height / mazeTemplate.length}px`;
      cellDiv.innerText = cell;
      templateContainer.appendChild(cellDiv);
    });
  });

  document.body.appendChild(templateContainer);

  const gridToggleButton = document.getElementById("grid-toggle");
  gridToggleButton?.addEventListener("click", (event) => {
    event.preventDefault();
    templateContainer.classList.toggle("is-hidden");
  });
}
