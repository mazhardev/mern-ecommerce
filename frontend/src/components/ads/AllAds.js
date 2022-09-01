import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdItem from "./AdItem";
import { getAllAds } from "../../actions/ad";
import { Link } from "react-router-dom";

const AllAds = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.ad);
  let url = window.location.search;
  var filteredPosts = [];
  if (url.includes("partname")) {
    const queryParams = new URLSearchParams(window.location.search);
    const partName = queryParams.get("partname");
    // console.log(partName);
    filteredPosts =
      posts &&
      posts.filter((post) => {
        return post.partName.toLowerCase().includes(partName.toLowerCase());
      });
  } else {
    filteredPosts = posts;
  }
  // console.log(filteredPosts);
  useEffect(() => {
    dispatch(getAllAds());
  }, [getAllAds]);

  return (
    <>
      <section id="ads" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">{"All Ads"}</h2>

        <Link to="/search" className="ml-2 back-to-search">
          <i className="fa fa-search"></i> Search
        </Link>

        <div className="row">
          {filteredPosts && filteredPosts.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100">
              <b>No posts.</b>
            </div>
          ) : (
            filteredPosts &&
            filteredPosts.map((post) => <AdItem key={post._id} post={post} />)
          )}
        </div>
      </section>
    </>
  );
};

export default AllAds;
