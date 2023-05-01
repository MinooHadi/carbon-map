import React from "react";

function DragAndDrop(props) {
  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.files[0]
      .text()
      .then((data) => props.setState(JSON.parse(data)));
    props.setDragedFile(e.dataTransfer.files[0]);
  }

  return (
    <div
      className="w-[65%] h-72 border-2"
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      {props.children}
    </div>
  );
}

export default DragAndDrop;
