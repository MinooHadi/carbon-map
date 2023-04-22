import { Vector as VectorSource } from "ol/source";

function vector({ url, format }) {
  return new VectorSource({
    url,
    format,
  });
}

export default vector;
