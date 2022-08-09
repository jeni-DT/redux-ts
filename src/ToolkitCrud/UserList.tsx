import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteUsers, fetchUsers } from "./Forms/UserSlice";
import { AppDispatch, RootState } from "./store/Store";

const UserList = () => {
  const user = useSelector((state:RootState) => state.user);
  const [deleteId, setDeleteId] = useState<values>();
  console.log(user);
  type values={
    firstname ?:string;
    lastname ?:string;
    phonenumber ?:number;
    mail ?:string;
    arrival ?: string;
    departure ?:string;
    noguests ?:number;
    roomtype ?:string;
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const navigate = useNavigate();

  const deleteDatas = (deleted:values) => {
    dispatch(deleteUsers(deleted));
    dispatch(fetchUsers);
  };
  const goBack = () => {
   
    navigate("/resort");
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const updatedata = (id:number) => {
    navigate(`/edit/${id}`);
  };

  // console.log(user);
  const header = [
    "Id",
    "Firstname",
    "Lastname",
    "Phonenumber",
    "Mail",
    "Arival",
    "Departure",
    "Noguests",
    "Roomtype",
    "Action1",
    "Action2",
  ];

  return (
    <div style={{ height: "100%" }}>
      <body className="list">
        <h2 className="ListHeader">
          <b className="ListHeader">
            <i>Coustomer List</i>
          </b>
        </h2>
        <br></br>
        {user.loading && <div>Loading.......</div>}
        {!user.loading && user.error ? <div>Error:{user.error}</div> : null}
        <div className="d-grid  d-md-flex justify-content-md-end">
          <button className="btn btn-primary" type="button" onClick={goBack}>
            Add Coustomer details
          </button>
        </div>
        <div className="tables">
          <div className="table-responsive">
            <table className="table table-responsive">
              <thead className="table-dark">
                <tr>
                  {header.map((Names:any) => {
                    return (
                      <React.Fragment key={Names.id}>
                        <th>{Names}</th>
                      </React.Fragment>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="table-secondary">
                {!user.loading && user.users.length
                  ? user.users.map((user:any, i) => (
                      <tr key={i}>
                        <td>{user.id}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.phonenumber}</td>
                        <td>{user.mail}</td>
                        <td>{user.arrival}</td>
                        <td>{user.departure}</td>
                        <td>{user.noguests}</td>
                        <td>{user.roomtype}</td>

                        <td>
                          <button
                            className="btn btn-danger"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => setDeleteId(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-info"
                            type="button"
                            
                            onClick={(e) => updatedata(user.id)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                 Delete data
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">Are you sure delete the data</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => deleteDatas(deleteId)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default UserList;
