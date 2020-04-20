import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from "leaflet"
import Calculations from "../Calculations";

export default function LocationPicker(props) {
    const calc = new Calculations();

    const locationIsValid = () => {
        return calc.latIsValid(props.lat) && calc.lngIsValid(props.lng);
    };

    return (
        <Map center={[30, 0]} zoom={1.5}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
                opacity={locationIsValid() ? 100 : 0}
                icon={icon()}
                position={locationIsValid() ? [props.lat, props.lng] : [0,0]}
            />
        </Map>
    );
}

const icon = () => {
    let ic = new L.Icon.Default();
    ic.options.shadowSize = [0,0];
    return ic;
};