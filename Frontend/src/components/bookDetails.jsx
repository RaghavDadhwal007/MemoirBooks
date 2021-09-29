import React, { useState } from "react";
import * as apiServices from "../services/apiServices";
import { Link, Redirect } from "react-router-dom";

function BookDetails(props) {

  const [redirectAfterDelete, setredirectAfterDelete] = useState(false);

  const confirmDelete = (id) => {
    apiServices.deleteBook(id).then((resp) => {
      setredirectAfterDelete(true)
    });
  };

  if (redirectAfterDelete) {
    return (
    <Redirect to="/"/>
    )
  }
  return (
    <div className="container">
      <div className="content pt-3">
          <div className="clearfix">
            <div className="float-right pt-1">
            <Link to={`/updateBook/${props?.location?.state?._id}`}>
            <button className="btn btn-outline-secondary" style={{padding: 0, paddingLeft: 10, paddingRight: 10}}>
                <i className="fa fa-pencil" style={{ fontSize: 12 }}></i> Update
            </button>
            </Link>
            <Link to="/">
            <button className="btn btn-outline-secondary" 
            onClick={()=>confirmDelete(props?.location?.state?._id)}
            style={{padding: 0, paddingLeft: 10, paddingRight: 10}}>
                <i className="fa fa-trash" style={{ fontSize: 12 }}></i> Delete
            </button>
              <button className="btn btn-outline-secondary" style={{padding: 0, paddingLeft: 10, paddingRight: 10}}>
                <i className="fa fa-chevron-left" style={{ fontSize: 12 }}></i> Go Back
              </button>
            </Link>
            </div>
            <div className="form-group float-left">
              <h3 style={{marginBottom: '0px'}}>{props?.location?.state?.title}</h3>
              <p className="text-muted"> <i>by <b>{props?.location?.state?.author}</b> </i> <span style={{fontSize: '12px'}}>({props?.location?.state?.pages} pages)</span></p>
              <p style={{margin:'0px'}}>{props?.location?.state?.description}</p>
            </div>
          </div>

      </div>
    </div>
  );
}

export default BookDetails;
