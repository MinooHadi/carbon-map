import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FormClose } from "../../icons";
import Button from "../button";
import { useNavigate } from "react-router-dom";
import Input from "../input";
import { BASE_URL } from "../../../api";

function LeftModal(props) {
  const navigate = useNavigate();
  const [indicators, setIndicators] = useState([]);

  const submit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    data.set('pid', props.pid);

    const res = await fetch(`${BASE_URL}/query/`, {
      method: 'POST',
      credentials: 'include',
      body: data
    })

    const json = await res.json();

    if (res.status !== 200) {
      alert(json.detail);
    } else {
      form.reset();
      props.setShowModal(false);
    }

  }

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
    <div className="absolute left-2 top-[calc(calc(100vh-300px-500px)/2)] h-[500px] w-[300px] rounded-3xl bg-white p-5">
      <form className="flex flex-col justify-between gap-5" onSubmit={submit}>
        <FormClose size="1.2rem" onClick={() => props.setShowModal(false)} className="self-end"/>
        <select name="" id="" className="border-2 w-1/4 px-1 w-[80%]">
          <option value="">Choose Indicator</option>
          {
            indicators.map((item, i) => <option name="indicator" value={item.type} key={i} data-id={item.id}>{item.name}</option>)
          }
        </select>
        <Input
          lable="Start Date:"
          type="date"
          className="w-[80%] border-2 px-1"
          required={true}
          name="start_date"
        />
        <Input
          lable="End Date:"
          type="date"
          className="w-[80%] border-2 px-1"
          required={true}
          name="end_date"
        />
        <Input
            value="Send"
            type="submit"
            className="bg-emerald-400 text-white px-4 py-1 rounded-md w-1/2"
            disabled={props.disabled}
        />
      </form>
    </div>,
    document.getElementById("left-modal-root"));
}

export default LeftModal;
