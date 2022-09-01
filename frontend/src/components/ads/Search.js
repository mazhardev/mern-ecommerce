import React, { useState } from "react";
const Search = ({ history }) => {
  const [partName, setPartName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (partName.trim()) {
      history.push(`/?partname=${partName}`);
    } else {
      history.push(`/`);
    }
  };

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h2 className="mb-3">Search Car Part</h2>
            <div className="form-group">
              <label>Part Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Part name"
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-block py-2">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
