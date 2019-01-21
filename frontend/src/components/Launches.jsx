import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LauncItem from "./LauncItem";
import MissionAppendix from "./MissionAppendix";

const query = gql`
  query GetLaunches {
    getLaunches {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
    }
  }
`;

export class Launches extends Component {
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-9">
            <h1>Launch Summary</h1>
          </div>

          <div className="col-md-3 mt-4">
            <MissionAppendix />
          </div>
        </div>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) return <h3>Loading....</h3>;
            if (error) console.log(error);

            return data.getLaunches.map(launch => {
              return <LauncItem key={launch.flight_number} launch={launch} />;
            });
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launches;
