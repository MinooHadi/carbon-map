import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function ProjectDetailPage() {
  const params = useParams();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.1.102:5000/api/projects/${params.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setDetail(data));
  }, []);

  return <>
    
  </>;
}

export default ProjectDetailPage;
