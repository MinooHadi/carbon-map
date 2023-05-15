import React, { useEffect, useRef, useState } from "react";
import {
  Auth,
  Button,
  Header,
  Input,
} from "../../shared";
import {
  Upload,
} from "../../icons";
import { BASE_URL } from "../../../api";
import { useNavigate } from "react-router-dom";


function CreateNewProject() {
  const navigate = useNavigate();
  // const [center, setCenter] = useState([-103.9065, 56.9884]);
  // const [zoom, setZoom] = useState(5);
  // const [geoFileObject, setGeoFileObject] = useState();
  // const [showToolbar, setShowToolbar] = useState(false);
  // const { map } = useContext(MapContext);
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [addresses, setAddresses] = useState({});

  // const drawSource = useRef(vector({ wrapX: false }));
  // const drawObj = useRef();
  // const vectorSource = useRef(new VectorSource());

  // const [dragedFile, setDragedFile] = useState();
  const formRef = useRef();

  const countrySelectRef = useRef();
  const provinceSelectRef = useRef();

  // useEffect(() => {
  //   return () => {
  //     if (map) {
  //       map.removeInteraction(drawObj.current);
  //       map.removeInteraction(drawSource.current);
  //       map.removeInteraction(vectorSource.current);
  //     }
  //   };
  // }, []);

  // const xyzSource = useMemo(() => {
  //   return xyz({
  //     url: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
  //     maxZoom: 20,
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!geoFileObject) return;

  //   vectorSource.current.addFeatures(
  //     new geoFileObject.format({
  //       featureProjection: "EPSG:3857",
  //       dataProjection: 'EPSG:4326'
  //     }).readFeatures(geoFileObject.data)
  //   );
  //   let polygonCenter = getCenter(vectorSource.current.getExtent());
  //   setCenter(transform(polygonCenter, "EPSG:3857", "EPSG:4326"));
  //   setZoom(4);
  // }, [geoFileObject]);


  // async function processFile(file) {
  //   const fileFormat = file.name.split(".").pop();

  //   let data;
  //   let format;

  //   switch (fileFormat) {
  //     case "geojson":
  //       data = JSON.parse(await file.text());
  //       format = GeoJSON;    
  //       break;
  //     case "kml":
  //       data = await file.text();
  //       format = KML;
  //       break;
  //     case "zip":
  //     case "shp":
  //       try {
  //         data = await shapefileTogeojson(file);
  //         format = GeoJSON;
  //         break;
  //       } catch(err) {
  //         alert(err.message);
  //         return
  //       }
  //     default:
  //       alert('Unsupported geo data file!');
  //       return
  //   }
    
  //   vectorSource.current.clear();
  //   countrySelectRef.current.selectedIndex = 0;
  //   provinceSelectRef.current.selectedIndex = 0;

  //   setSelectedCountry();
  //   setGeoFileObject({ data, format});
  // }

  // async function getFile(e) {
  //   await processFile(e.target.files[0]);
  // }

  async function addressSelected(e) {
    try {
      
    } catch (err) {
      alert(err);
    }
  }

  // function draw(e) {
  //   map.removeInteraction(drawObj.current);
  //   drawObj.current = new Draw({
  //     source: drawSource.current,
  //     type: e.currentTarget.dataset.type,
  //   });
  //   map.addInteraction(drawObj.current);
  //   drawObj.current.on("drawend", (e) => {
  //     const feature = e.feature;
  //     const id = Date.now();
  //     feature.setId(id);
  //     let label = prompt("enter label");
  //     setState({ [id]: label });
  //   });
  // }

  // useEffect(() => {
  //   if(dragedFile) processFile(dragedFile);
  // }, [dragedFile]);

  function createProject() {
    const data = new FormData(formRef.current);

    // if (!data.get("geo_data_file").name) {
    //   if (dragedFile && geoFileObject) {
    //     data.set("geo_data_file", dragedFile);
    //   } else {
    //     const drawData = drawSource.current.getFeatures();

    //     if (drawData) {
    //       const format = new GeoJSON();
    //       const geoJsonStr = format.writeFeatures(drawData, {
    //         dataProjection: "EPSG:4326",
    //         featureProjection: "EPSG:3857",
    //       });
    //       const file = new File([geoJsonStr], `draw-${Date.now()}.geojson`, {
    //         type: "text/plain",
    //       });
    //       data.set("geo_data_file", file);
    //     }
    //   }
    // }
    fetch(`${BASE_URL}/project`, {
      method: "POST",
      body: data,
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 201) {
          formRef.current.reset();
          return res.json();
        }
        return res.json().then((err) => {
          throw new Error(err.detail);
        });
      })
      .then((data) => {
        navigate(`/report?pid=${data.id}`);
      })
      .catch((err) => alert(err.message));
  }

  useEffect(() => {
    fetch(`${BASE_URL}/api/countries`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCountry(data));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(``, {
        method: "POST",
        body: JSON.stringify({
          country: selectedCountry,
        }),
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          throw "";
        })
        .then((data) => setAddresses(data))
        .catch();
    }
  }, [selectedCountry]);

  return (
    <Auth>
      {" "}
      <div className="h-[100vh] ">
        <Header />
        <div className="bg-gray-50 h-[90vh] ">
          <div className="w-[80%] h-[10vh] m-auto py-6 flex justify-between items-center mb-2">
            <h1 className="text-xl font-semibold">New projects</h1>
            <div className="flex gap-3">
              <Button
                className="bg-gray-300 font-semibold py-1 px-3 rounded-md"
                title="Cancle"
              />
              <Button
                className="bg-emerald-400 text-white font-semibold py-1 px-3 rounded-md"
                title="Create project"
                onClick={createProject}
              />
            </div>
          </div>
          <div className="w-[80%] m-auto flex flex-wrap justify-center items-center">
            <div className="w-[40%] bg-white shadow-lg rounded-lg">
              <form id="form" ref={formRef}>
                <div className="bg-gray-200 h-52 rounded-t-lg flex flex-col justify-center items-center">
                  <input type="file" id="imgUpload" hidden name="thumbnail" />
                  <Upload color="white" size="1.5rem" />
                  <label
                    htmlFor="imgUpload"
                    className="text-white font-semibold"
                  >
                    Upload preview image
                  </label>
                </div>
                <div className="p-[2%]">
                  <Input
                    name="name"
                    lable="Name"
                    type="text"
                    className="border-2 border-gray-300 px-1 rounded-md mb-4"
                    placeholder="Project name"
                  />
                
                  <label className="text-sm font-medium text-gray-500">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="border-2 border-gray-300 rounded-md w-[100%] px-1 mt-1 "
                    placeholder="Short description"
                  />

                  <label className="text-sm font-medium text-gray-500 mb-1">
                    Choose country
                  </label>
                  <br/>
                  <select
                    className="border-2 border-gray-300 w-[50%] px-1 rounded-md mb-2"
                    form="form"
                    name="country"
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    ref={countrySelectRef}
                  >
                    <option value=""></option>
                    {country.map((item, i) => (
                      <option value={item.code} key={i}> {item.name} </option>
                    ))}
                  </select>
                  
                  <br/>

                  <label className="text-sm font-medium text-gray-500 mb-1">
                    Choose the most accurate address
                  </label>
                  <br/>
                  <select
                    className="border-2 border-gray-300 w-[50%] px-1 rounded-md mb-2"
                    form="form"
                    name="province"
                    onChange={addressSelected}
                    ref={provinceSelectRef}
                  >
                    <option value=""></option>
                    {Object.entries(addresses).map((item, i) => (
                      <option value={item[1]} key={i}>{item[0]}</option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Auth>
  );
}

export default CreateNewProject;
