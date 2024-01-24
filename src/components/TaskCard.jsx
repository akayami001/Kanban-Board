import React, { useState } from "react";

const TaskCard = ({ task, updateTask }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const points = task.points || 0;
  const updatedPoints = (direction) => {
    const fib = [0, 1, 2, 3, 5, 8, 13];
    const index = fib.indexOf(points);
    const nextIndex = direction === "up" ? index + 1 : index - 1;
    const newPoints = fib[nextIndex];
    if (newPoints) {
      updateTask({ ...task, points: newPoints });
    }
  };
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("id", task.id);
      }}
      className="card"
    >
      <div className="card__title" onClick={() => setIsEditingTitle(true)}>
        {isEditingTitle ? (
          <input
            type="text"
            value={task.title}
            onChange={(e) => updateTask({ ...task, title: e.target.value })}
            onBlur={() => setIsEditingTitle(false)}
          />
        ) : (
          <h2>{task.title}</h2>
        )}
      </div>

      <div className="card__info">
        <div className="card__left">
          <span className="card__id">{task.id}</span>
          <span className="card__priority">{task.priority}</span>
          {task.priority === "high" && <div>🔥</div>}
          {task.priority === "medium" && <div>🍏</div>}
          {task.priority === "low" && <div>❄️</div>}
        </div>
        <span className="card__points">
          <button onClick={(e) => updatedPoints("down")}>-</button>
          {points}
          <button onClick={(e) => updatedPoints("up")}>+</button>
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
