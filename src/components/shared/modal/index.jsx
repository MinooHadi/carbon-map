import React from "react";
import ReactDOM from "react-dom";
import { FormClose } from "../../icons";
import Button from "../button";
import { useNavigate } from "react-router-dom";

function Modal(props) {
  const navigate = useNavigate();

  function handleSendBtn() {
    props.setShowModal(false);
    navigate("/detail");
  }

  return ReactDOM.createPortal(
    <div className="w-[26vw] h-1/2 border-2 bg-white p-5 fixed top-1/4 left-[37vw] ">
      <FormClose
        size="1.2rem"
        className="absolute top-3 right-3"
        onClick={() => props.setShowModal(false)}
      />
      <h1 className="text-xl font-semibold mt-2">Query Panel</h1>
      <div className="flex flex-col mt-4">
        <label htmlFor="" className="pl-2">
          Indicator
        </label>
        <select name="" id="" className="border-2">
          <option value="NDVI">NDVI</option>
        </select>
      </div>
      <Button
        title="Send"
        className="bg-emerald-400 absolute bottom-3 right-3 text-white px-4 py-1 rounded-md"
        onClick={handleSendBtn}
      />
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
