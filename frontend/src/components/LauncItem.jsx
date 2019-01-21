import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Moment from "react-moment";

const LauncItem = ({
  launch: {
    flight_number,
    mission_name,
    launch_year,
    launch_date_local,
    launch_success
  }
}) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Mission:{" "}
            <span
              className={classNames({
                "text-success": launch_success,
                "text-danger": !launch_success
              })}
            >
              {" "}
              {mission_name}
            </span>
          </h4>
          <p> Flight Number: {flight_number}</p>
          <p> Launch Year: {launch_year} </p>
          Launched At:{" "}
          <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
        </div>
        <div className="col-md-3">
          <Link
            to={`/launch/${flight_number}`}
            className={classNames({
              "text-success": launch_success,
              "text-danger": !launch_success,
              "btn btn-secondary": true
            })}
          >
            Go to Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LauncItem;
