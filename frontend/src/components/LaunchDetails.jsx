import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import classNames from "classnames";

const query = gql`
  query GetLaunch($launchID: Int!) {
    getLaunch(launchID: $launchID) {
      flight_number
      mission_name
      rocket {
        rocket_id
        rocket_type
        rocket_name
      }
      launch_year
      launch_date_local
      launch_success
    }
  }
`;

const LaunchDetails = ({
  match: {
    params: { id }
  }
}) => {
  return (
    <div className="container">
      <Query query={query} variables={{ launchID: parseInt(id) }}>
        {({ loading, error, data }) => {
          if (loading) return <h3>Loading...</h3>;
          if (error) console.log(error);

          const {
            flight_number,
            mission_name,
            launch_year,
            launch_success,
            rocket: { rocket_id, rocket_name, rocket_type }
          } = data.getLaunch;
          return (
            <Fragment>
              <h3>Mission: {mission_name}</h3>
              <hr />
              <h5>Launch Details</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  Flight Number: {flight_number}
                </li>
                <li className="list-group-item">Launch Year: {launch_year}</li>
                <li className="list-group-item">
                  <span
                    className={classNames({
                      "text-success": launch_success,
                      "text-danger": !launch_success
                    })}
                  >
                    {" "}
                    {launch_success
                      ? "Mission was successful"
                      : "Mission Failed"}
                  </span>
                </li>
              </ul>
              <hr />
              <h5>Rocket Details: {rocket_name}</h5>
              <ul className="list-group">
                <li className="list-group-item">Rocket ID: {rocket_id}</li>
                <li className="list-group-item">Launch Year: {launch_year}</li>
                <li className="list-group-item">Rocket Type: {rocket_type}</li>
              </ul>
              <hr />
              <Link to="/" className="btn btn-secondary">
                Go Back to List
              </Link>
            </Fragment>
          );
        }}
      </Query>
    </div>
  );
};

export default LaunchDetails;
