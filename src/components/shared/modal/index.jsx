import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FileDownload, FormClose } from "../../icons";
import Button from "../button";
import { useNavigate } from "react-router-dom";
import Input from "../input";
import { BASE_URL } from "../../../api";

function Modal(props) {
  const navigate = useNavigate();
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/indicator`, {
      method: "GET",
      credentials: 'include'
    }).then(res => {
      if(res.status == 200) {
        return res.json();
      }
      return res.json().then((err) => {
        throw new Error(err.detail);
      });
    }).then(data => {
      setIndicators(data);
    }).catch(err => alert(err.message));
  }, []);

  return ReactDOM.createPortal(
    <div className="absolute bottom-0 h-[300px] w-[100%] rounded-t-3xl bg-white p-5">
      <div className="flex flex-row-reverse items-center justify-between">
        <div className="flex flex-row-reverse items-center gap-5">
          <FormClose size="1.2rem" onClick={() => props.setShowModal(false)} />
        </div>
        <div className="flex justify-between w-[80%] mt-2 ">
          <select name="" id="" className="border-2 w-1/4 px-1 ">
            <option value="">Choose Indicator</option>
            {
              indicators.map((item, i) => <option value={item.type} key={i} data-id={item.id}>{item.name}</option>)
            }
          </select>
          <Input
            lable="Start Date:"
            type="date"
            className="w-[70%] border-2 px-1 "
          />
          <Input
            lable="End Date:"
            type="date"
            className=" w-[70%] border-2 px-1 "
          />
          <div className="flex gap-2">
            <Button
              title="Send"
              className="bg-emerald-400 text-white px-4 py-1 rounded-md"
            />
            <div className="bg-emerald-400 px-2 py-1 rounded-md">
              <FileDownload size="1.5rem" color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
