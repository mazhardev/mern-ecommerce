import React, { Fragment, useEffect, useState } from "react";
import LocationPicker from "react-location-picker";
import ButtonLoader from "../layout/ButtonLoader";

import { useDispatch, useSelector } from "react-redux";

import { editSingleAd } from "../../actions/ad";

import { setAlert } from "../../actions/alert";
import api from "../../utils/api";

const CreateAd = ({ match }) => {
  const [partName, setName] = useState("");
  const [category, setCategory] = useState("Interrior");
  const [description, setDescription] = useState("");
  const [locationLat, setLocationLat] = useState("");
  const [locationLng, setLocationLng] = useState("");
  const [price, setPrice] = useState(0);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.async);

  const defaultPositionForMap = {
    lat: Number(locationLat),
    lng: Number(locationLng),
  };

  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`/post/post-by-id/${match.params.id}`);
      console.log(res);
      setName(res.data.partName);
      setCategory(res.data.category);
      setDescription(res.data.description);
      setLocationLat(res.data.locationLat);
      setLocationLng(res.data.locationLng);
      setPrice(res.data.price);
      res.data.images.forEach((file) => {
        setImages((oldArray) => [...oldArray, file.url]);
        setImagesPreview((oldArray) => [...oldArray, file.url]);
      });
    }
    fetchData();
  }, [match.params.id]);

  const submitHandler = (e) => {
    e.preventDefault();

    const adData = {
      partName,
      category,
      description,
      locationLat,
      locationLng,
      price,
      images,
    };

    if (images.length === 0)
      return dispatch(setAlert("Please upload images.", "danger"));
    dispatch(editSingleAd(adData, match.params.id));
    
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const handleLocationChange = ({ position, address, places }) => {
    // Set new location
    // console.log(position);
    setLocationLat(position.lat);
    setLocationLng(position.lng);
  };

  return (
    <Fragment>
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-8">
            <form
              className="shadow-lg"
              onSubmit={submitHandler}
              enctype="multipart/form-data"
            >
              <h1 className="mb-4">Edit Ad</h1>
              <div className="form-group">
                <label htmlFor="name_field">Part Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={partName}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  className="form-control"
                  id="room_type_field"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {["Interior", "Exterior"].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category_field">Select your location</label>
                {locationLat && locationLng && (
                  <LocationPicker
                    containerElement={<div style={{ height: "100%" }} />}
                    mapElement={<div style={{ height: "300px" }} />}
                    defaultPosition={defaultPositionForMap}
                    radius={-1}
                    onChange={handleLocationChange}
                  />
                )}
              </div>
              <div className="form-group mt-4">
                <label>Images</label>
                <div className="custom-file">
                  <input
                    type="file"
                    name="room_images"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChange}
                    multiple
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>

                {imagesPreview.map((img) => (
                  <img
                    src={img}
                    key={img}
                    alt="Images Preview"
                    className="mt-3 mr-2"
                    width="55"
                    height="52"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="btn btn-block new-room-btn py-3"
                disabled={loading}
              >
                {loading ? <ButtonLoader /> : "UPDATE"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateAd;
