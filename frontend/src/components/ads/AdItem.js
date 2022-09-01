import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { useSelector, useDispatch } from "react-redux";
import { deleteSingleAd } from "../../actions/ad";

import CustomButton from "../cart/CustomButton";
import { addItem } from "../../actions/cart";

const AdItem = ({ post, addItem }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const item = {
    id: post._id,
    name: post.partName.substring(0, 10),
    price: post.price,
    imageUrl: post.images[0].url,
  };

  const handleDeleteAd = (id) => {
    dispatch(deleteSingleAd(id));
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-2">
        <img
          className="card-img-top mx-auto"
          src={post.images[0].url}
          height={170}
          width=""
          alt={post.partName}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/post/${post._id}`}>{post.partName}</Link>
          </h5>

          <div className="ratings mt-auto mb-3">
            <p className="card-text">
              <b>${post.price}</b>{" "}
            </p>
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
          {user && user._id === post.user && (
            <>
              <button className="btn btn-block edit-btn">
                <Link to={`/post/edit/${post._id}`}>Edit Ad</Link>
              </button>
            </>
          )}

          <button className="btn btn-block view-btn ">
            <Link to={`/post/${post._id}`}>View Details</Link>
          </button>
          {user && user.role === "admin" && (
            <>
              <button className="btn btn-block edit-btn">
                <Link to={`/post/edit/${post._id}`}>Edit Ad</Link>
              </button>

              <button
                className="btn btn-block delete-btn"
                onClick={() => handleDeleteAd(post._id)}
              >
                Delete Ad
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(AdItem);
