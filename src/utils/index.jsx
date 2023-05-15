import { GeoJSON, KML } from "ol/format";
import { BASE_URL } from "../api";


export async function shapefileTogeojson(source, remote=false) {
    let body = new FormData();
    body.append('file', source);
    
    let error;

    try {
      const res = await fetch(`${BASE_URL}/convert?remote=${+remote}`, {
        method: 'POST',
        credentials: 'include',
        body
      });
      if (res.status == 200) {
        return await res.json();
      }
      error = (await res.json()).detail;
    } catch(e) {
      error = 'fail to load file! please try later';
    }

    throw new Error(error)
}


export async function loadFromUrl(url, layerSource) {
    let data;
    let format;
    let ext = url.split('.').pop();

    if (ext) {
      ext = ext.toLowerCase();
    }

    switch (ext) {
      case 'geojson':
      case 'kml':
        const res = await fetch(url, {
          method: "GET",
          credentials: 'include'
        });
    
        if (res.status !== 200) {
          throw new Error('failed to load data!')
        }

        format = ext === 'geojson' ? GeoJSON : KML;
        data = ext === 'kml' ? await res.text() : await res.json();
        break;
      case 'zip':
      case 'shp':
        format = GeoJSON;
        data = await shapefileTogeojson(url, true);
        break;
      default:
        throw new Error('something went wrong! try later')
    }

    layerSource.addFeatures(
      new format({
        featureProjection: "EPSG:3857",
      }).readFeatures(data)
    );
}