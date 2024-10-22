import React, { useState , useEffect } from "react";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../modals/CreateTaskModel";
import axios from 'axios';
import { useSelector } from "react-redux"; 

function KanbanBoard() {
  const columns = [
    { name: "Backlog", color: "bg-red-500" },
    { name: "In Progress", color: "bg-blue-500" },
    { name: "In Review", color: "bg-pink-500" },
    { name: "Done", color: "bg-green-500" },
  ];

  const selectedProject = useSelector((state) => state.project.selectedProject);

  useEffect(() => {
    fetchTasks();
  }, []); 

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/task/project/${selectedProject.name}`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      if (response.status === 200) {
        setTasks(response.data);
        console.log(response.data);
      } else {
        console.error('Failed to fetch emails:', response.status);
      }
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  


  const handleOnDrop = (e, newStatus) => {
    const { prevStatus, taskIndex } = JSON.parse(e.dataTransfer.getData("text"));

    if (newStatus !== prevStatus) {
      const updatedTasks = tasks.map((task, index) => {
        if (index === taskIndex) {
          return { ...task, status: newStatus };
        }
        return task;
      });

      setTasks(updatedTasks);
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <div className="flex justify-end mr-14">
        <button
          className="border border-[#2695d1] text-[#2695d1] py-2 px-4 rounded hover:bg-[#2695d1] hover:text-white transition"
          onClick={() => setIsModalOpen(true)}
        >
          + Create Task
        </button>
      </div>

      <div className="flex">
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            onDrop={(e) => handleOnDrop(e, column.name)}
            onDragOver={handleOnDragOver}
            className="scrollbar-hide mx-5 pt-[10px] min-w-[270px]"
          >
            <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
              <span className={`rounded-full w-4 h-4 ${column.color}`} />
              {column.name}
            </p>

            {tasks
              .filter((task) => task.status === column.name)
              .map((task, index) => (
                <TaskCard key={index} colIndex={colIndex} taskIndex={index} task={task} />
              ))}
          </div>
        ))}
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        
      />
    </div>
  );
}

export default KanbanBoard;


// import React, { useState } from "react";
// import Task from "../components/Task";

// function KanbanBoard() {
//   const [columns, setColumns] = useState([
//     {
//       name: "Backlog",
//       color: "bg-red-500",
//       tasks: [
//         { taskName: "Task 1", description: "This is a description for task 1" },
//         { taskName: "Task 2", description: "This is a description for task 2" },
//       ],
//     },
//     {
//       name: "In Progress",
//       color: "bg-blue-500",
//       tasks: [
//         { taskName: "Task 3", description: "This is a description for task 3" },
//         { taskName: "Task 4", description: "This is a description for task 4" },
//       ],
//     },
//     {
//       name: "In Review",
//       color: "bg-pink-500",
//       tasks: [
//         { taskName: "Task 5", description: "This is a description for task 5" },
//         { taskName: "Task 6", description: "This is a description for task 6" },
//       ],
//     },
//     {
//       name: "Done",
//       color: "bg-green-500",
//       tasks: [
//         { taskName: "Task 7", description: "This is a description for task 7" },
//         { taskName: "Task 8", description: "This is a description for task 8" },
//       ],
//     },
//   ]);

//   const handleOnDrop = (e, colIndex) => {
//     const { prevColIndex, taskIndex } = JSON.parse(e.dataTransfer.getData("text"));

//     if (colIndex !== prevColIndex) {
//       const newColumns = [...columns];
//       const [movedTask] = newColumns[prevColIndex].tasks.splice(taskIndex, 1);
//       newColumns[colIndex].tasks.push(movedTask);

//       setColumns(newColumns);
//     }
//   };

//   const handleOnDragOver = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="flex">
//       {columns.map((column, colIndex) => (
//         <div
//           key={colIndex}
//           onDrop={(e) => handleOnDrop(e, colIndex)}
//           onDragOver={handleOnDragOver}
//           className="scrollbar-hide mx-5 pt-[40px] min-w-[280px]"
//         >
//           <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
//             <div className={`rounded-full w-4 h-4 ${column.color}`} />
//             {column.name}
//           </p>
//           {column.tasks.map((task, index) => (
//             <Task key={index} colIndex={colIndex} taskIndex={index} task={task} />
//           ))}
//           <button className='text-[#828fa3]'>+Create Task</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default KanbanBoard;




// import { shuffle } from "lodash";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import boardsSlice from "../redux/boardsSlice";
// import Task from "../components/Task";

// function KanbanBoard({ colIndex }) {


//   const colors = [
//     "bg-red-500",
//     "bg-orange-500",
//     "bg-blue-500",
//     "bg-purple-500",
//     "bg-green-500",
//     "bg-indigo-500",
//     "bg-yellow-500",
//     "bg-pink-500",
//     "bg-sky-500",
//   ];

  

//   const dispatch = useDispatch();
//   const [color, setColor] = useState(null)
//   const boards = useSelector((state) => state.boards);
//   const board = boards.find((board) => board.isActive === true);
//   const col = board.columns.find((col, i) => i === colIndex);
//   useEffect(() => {
//     setColor(shuffle(colors).pop())
//   }, [dispatch]);



//   const handleOnDrop = (e) => {
//     const { prevColIndex, taskIndex } = JSON.parse(
//       e.dataTransfer.getData("text")
//     );

//     if (colIndex !== prevColIndex) {
//       dispatch(
//         boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
//       );
//     }
//   };

//   const handleOnDragOver = (e) => {
//     e.preventDefault();
//   };

//   return (
//     // <></>
//     <div
//       onDrop={handleOnDrop}
//       onDragOver={handleOnDragOver}
//       className="scrollbar-hide   mx-5 pt-[90px] min-w-[280px] "
//     >
//       <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
//         <div className={`rounded-full w-4 h-4 ${color} `} />
//         {col.name} ({col.tasks.length})
//       </p>

//       {col.tasks.map((task, index) => (
//         <Task key={index} taskIndex={index} colIndex={colIndex} />
//       ))}
//     </div>
//   );
// }

// export default KanbanBoard;
