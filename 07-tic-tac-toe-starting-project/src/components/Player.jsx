import { useState } from "react";

export default function ({ name, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  function handleEditClick() {
    setIsEditing((wasEditing) => !wasEditing);
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input type="text" onChange={handleChange} required value={playerName} />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player-name">{editablePlayerName} </span>
      <span className="player-simbol">{symbol}</span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
