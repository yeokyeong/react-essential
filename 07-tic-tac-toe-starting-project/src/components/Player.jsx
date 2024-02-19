import { useState } from "react";

export default function ({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  function handleEditClick() {
    setIsEditing((wasEditing) => !wasEditing);
  }

  let playerName = name;
  if (isEditing) {
    playerName = <input type="text" required defaultValue={name} />;
  }
  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-simbol">{symbol}</span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </span>
    </li>
  );
}
