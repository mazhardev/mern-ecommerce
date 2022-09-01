import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Carousel } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { getSingleAd } from "../../actions/ad";
import AdDetailedMap from "./AdDetailedMap";

import CustomButton from "../cart/CustomButton";
import { addItem } from "../../actions/cart";

const AdDetails = ({ match, addItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.ad);

  const item = {
    id: post._id,
    name: post.partName ? post.partName.substring(0, 10) : "",
    price: post.price,
    imageUrl: post.images ? post.images[0].url : "",
  };

  useEffect(() => {
    dispatch(getSingleAd(match.params.id));
  }, []);

  return (
    <>
      <div className="container container-fluid">
        <h2 className="mt-5">{post.partName}</h2>
        <Carousel hover="pause">
          {post.images &&
            post.images.map((image, i) => (
              <Carousel.Item key={i}>
                <div style={{ width: "100%", height: "440px" }}>
                  <img
                    className="d-block m-auto"
                    src={image.url}
                    alt={post.partName}
                    layout="fill"
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>

        <div className="row my-5 ">
          <div className="col-12 col-md-6 col-lg-8 shadow-lg p-4">
            <h3>Description</h3>
            <p>{post.description}</p>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>Price:{post.price}$</b>
              </p>
            </div>
          </div>
        </div>
        {post && user && post.status == true ? (
          post.user !== user._id && (
            <CustomButton onClick={() => addItem(item)}>
              Add to cart
            </CustomButton>
          )
        ) : (
          <label className="btn  btn-info ">This part is Sold</label>
        )}
        <br />
        <br />
        <div style={{ width: "100%", height: "440px" }}>
          <h2>Location of the seller</h2>
          {post && post.locationLat && post.locationLng && (
            <AdDetailedMap lat={post.locationLat} lng={post.locationLng} />
          )}
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(AdDetails);
