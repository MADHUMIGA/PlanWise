import React from "react";

function Task({ colIndex, taskIndex, task }) {

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ prevColIndex: colIndex, taskIndex })
    );
  };

  return (
    <div
      draggable
      onDragStart={handleOnDrag}
      className="w-[280px] my-5 rounded-lg bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg cursor-pointer"
    >
      <p className="font-bold tracking-wide">{task.taskName}</p>
      <p className="text-sm text-gray-500 mt-1">{task.description}</p>
    </div>
  );
}

export default Task;
