import React from "react";
import GoogleMapReact from "google-map-react";

const Marker = () => (
  <i class="fa fa-map-marker fa-4x red " aria-hidden="true"></i>
);

const AdDetailedMap = ({ lat, lng }) => {
  const _lat = Number(lat);
  const _lng = Number(lng);
  const center = [_lat, _lng];
  const zoom = 14;
  return (
    <div style={{ height: "300px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCjXFjxQ_DbcJHHH61kEf0v5URnk-NPnO4" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Marker lat={_lat} lng={_lng} />
      </GoogleMapReact>
    </div>
  );
};

export default AdDetailedMap;
