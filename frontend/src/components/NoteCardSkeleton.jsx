import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NoteCardSkeleton = ({ count = 6 }) => {
  return (
    <div className="row">
      {Array.from({ length: count }).map((_, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">
                <Skeleton width={150} />
              </h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                <Skeleton width={100} />
              </h6>
              <p className="card-text">
                <Skeleton count={3} />
              </p>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                <Skeleton width={80} />
              </h6>
              <div className="d-flex">
                <Skeleton circle={true} height={30} width={30} style={{ marginRight: "10px" }} />
                <Skeleton circle={true} height={30} width={30} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteCardSkeleton;
