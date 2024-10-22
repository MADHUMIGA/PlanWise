import React, { useState } from "react";
import { formatDistanceToNow , format } from "date-fns";
import TaskDetailsModal from "../modals/TaskDetailsModel";
import phigh from '../assets/phigh.svg';
import bug from '../assets/bug.svg';
import plow from '../assets/plow.svg';
import story from '../assets/story.svg';
import task from '../assets/task.svg';
import medium from '../assets/pmedium.svg';
import calclk  from '../assets/calclk.svg';
import due from '../assets/due.svg';
import depend from '../assets/dependency.svg';
import TaskDependencyModel  from "../modals/TaskDependencyModel";




const TaskCard = ({ task, colIndex, taskIndex }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDependency, setShowDependency] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text", JSON.stringify({ prevStatus: task.status, taskIndex }));
  };

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
    setShowDependency(false);
  };

  const handleDependency =()=>{
    setShowDependency(true);
    console.log(task.id);
  }
   // Ensure task.endDate is valid
   const endDate = task.endDate ? new Date(task.endDate) : null;

   // Check if the date is valid before formatting
   const formattedDate = endDate && !isNaN(endDate)
     ? format(endDate, 'dd-MM-yyyy')
     : 'Invalid Date';

  return (
    <div>
      <div
        className="bg-white dark:bg-[#2b2c37] dark:text-[white] p-4 mb-4 mt-4 w-64 rounded-lg shadow-md cursor-pointer"
        draggable
        onDragStart={handleDragStart}
        
      >
        <div className="flex justify-between">
        <h3 className="text-md font-bold">{task.heading}</h3>
        <div className="relative group">
        <img src={depend} alt="depend" className=" h-3 " onClick={handleDependency}/>
            <div className="absolute bottom-full mb-1 hidden w-max px-2 py-1 text-xs text-white bg-black rounded group-hover:block">
              Add Task Dependency
            </div>
          </div>
        </div>
        <div  onClick={handleCardClick}>
        <p className="text-sm text-gray-600 dark:text-gray-200 truncate whitespace-nowrap overflow-hidden">{task.description}</p>

        <div className="text-xs text-gray-500 dark:text-gray-200  mt-2 flex justify-between">
          <div className="flex"><img src={calclk} alt="createdAt" className="w-4 h-4 mr-2" />{formatDistanceToNow(new Date(task.createdAt))} ago</div>
          <div className="flex"><img src={due} alt="due" className="w-4 h-4 mr-2" /> {formattedDate}</div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="relative group">
            <span className="text-xs font-semibold">
              {getTypeIcon(task.type)}
            </span>
            <div className="absolute bottom-full mb-1 hidden w-max px-2 py-1 text-xs text-white bg-black rounded group-hover:block">
              {task.type}
            </div>
          </div>
          <div className="relative group">
            <span className="text-xs font-semibold">
              {getPriorityIcon(task.priority)}
            </span>
            <div className="absolute bottom-full mb-1 hidden w-max px-2 py-1 text-xs text-white bg-black rounded group-hover:block">
              {task.priority}
            </div>
          </div>
        </div>

      </div>
      </div>

      {showDetails && (
        <TaskDetailsModal task={task} onClose={handleClose} />
      )}
      {showDependency && (
        <TaskDependencyModel  TaskId={task.id} onClose={handleClose} />
      )}
    </div>
  );
};



const getPriorityIcon = (priority) => {
  switch (priority) {
    case "High":
      return <img src={phigh} alt="High Priority" className="w-4 h-4" />;
    case "Medium":
      return <img src={medium} alt="High Priority" className="w-5 h-5" />;
    case "Low":
      return <img src={plow} alt="High Priority" className="w-5 h-5" />;
    default:
      return "";
  }
};



const getTypeIcon = (type) => {
  switch (type) {
    case "Bug":
      return <img src={bug} alt="High Priority" className="w-4 h-4" />;
    case "Story":
      return <img src={story} alt="High Priority" className="w-4 h-4" />;
    case "Task":
      return <img src={task} alt="High Priority" className="w-4 h-4" />;
    default:
      return "";
  }
};

export default TaskCard;





// import React from "react";

// const TaskCard = ({ task, colIndex, taskIndex }) => {
//   const handleDragStart = (e) => {
//     e.dataTransfer.setData("text", JSON.stringify({ prevStatus: task.status, taskIndex }));
//   };

//   return (
//     <div
//       className="bg-white p-4 mb-4 rounded-lg shadow-md cursor-pointer"
//       draggable
//       onDragStart={handleDragStart}
//     >
//       <h3 className="text-lg font-bold">{task.taskName}</h3>
//       <p className="text-sm text-gray-600">{task.description}</p>
//       <div className="flex justify-between items-center mt-2">
//         <span className={`text-xs font-semibold ${getPriorityColor(task.priority)}`}>{task.priority}</span>
//         <span className={`text-xs font-semibold ${getTypeColor(task.type)}`}>{task.type}</span>
//       </div>
//       <div className="text-xs text-gray-500 mt-2">
//         <p>Created: {task.createdAt}</p>
//         <p>Due: {task.due}</p>
//       </div>
//       <div className="text-xs text-gray-500 mt-2">
//         <p>Assignee: {task.assignee.join(", ")}</p>
//       </div>
//     </div>
//   );
// };

// const getPriorityColor = (priority) => {
//   switch (priority) {
//     case "High":
//       return "text-red-500";
//     case "Medium":
//       return "text-yellow-500";
//     case "Low":
//       return "text-green-500";
//     default:
//       return "";
//   }
// };

// const getTypeColor = (type) => {
//   switch (type) {
//     case "Bug":
//       return "text-red-500";
//     case "Story":
//       return "text-blue-500";
//     case "Task":
//       return "text-green-500";
//     default:
//       return "";
//   }
// };

// export default TaskCard;
