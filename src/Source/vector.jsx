import { Vector as VectorSource } from "ol/source";

function vector({ url, format, wrapX }) {
  return new VectorSource({
    url,
    format,
    wrapX,
  });
}

export default vector;
