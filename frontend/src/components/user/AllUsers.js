import React, { useEffect, useState } from "react";

import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";

const AllUsers = () => {
  const [users, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await api.get(`/auth/all-users`);
      console.log(res.data);
      res.data.forEach((user) => {
        setAllUsers((oldArray) => [...oldArray, user]);
      });
    }
    fetchData();
  }, []);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <>
              <button
                className="btn btn-danger mx-2"
                onClick={() => deleteUserHandler(user._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const deleteUserHandler = async (id) => {
    try {
      const { data } = await api.delete(`/auth/delete-user/${id}`);
      // console.log(data);
      setAllUsers([...users.filter((user) => user._id !== id)]);
      toast.success("User Deleted Successfully");
    } catch (error) {
      toast.error("Error Deleting User");
    }
  };

  return (
    <div className="container container-fluid">
      <>
        <h1 className="my-5">{`${(users && users.length) || 0} Users`}</h1>

        <MDBDataTable
          data={setUsers()}
          className="px-3"
          bordered
          striped
          hover
        />
      </>
    </div>
  );
};

export default AllUsers;
