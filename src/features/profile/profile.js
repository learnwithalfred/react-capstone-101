import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getThemeColor } from '../theme/themeSlice';
import { getReservedMissions } from '../missions/missionsSlice';
import {
  myReservedRockets,
  getReservedRockets,
  getRocketsStatus,
} from '../rockets/rocketSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const rockets = useSelector(getReservedRockets);
  const rocketStatus = useSelector(getRocketsStatus);
  const missions = useSelector(getReservedMissions);
  const bgLight = useSelector(getThemeColor);

  useEffect(() => {
    dispatch(myReservedRockets());
  }, [rocketStatus, dispatch]);

  let renderReserved = '';
  if (rockets.length) {
    renderReserved = rockets.map((data) => (
      <li
        key={data.id}
        className="list-group-item d-flex justify-content-between align-items-start"
      >
        <span>{data.rocket_name}</span>

        <a
          className="btn btn-link"
          href={data.wikipedia}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </a>
      </li>
    ));
  }

  const updateColors = bgLight
    ? 'h-100 bg-dark text-light'
    : 'h-100 bg-light text-dark';
  const myMissions = missions.map((data) => (
    <li
      key={data.mission_name}
      className="list-group-item d-flex justify-content-between align-items-start"
    >
      <span>{data.mission_name}</span>
    </li>
  ));

  return (
    <div>
      <div className="container my-4">
        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-2 rounded-3">
              <Card className={updateColors}>
                <Card.Header className="text-center">
                  <h3>My Reserved Missions</h3>
                </Card.Header>
                <Card.Body>
                  <ul className="list-group ">{myMissions}</ul>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-2 rounded-3">
              <Card className={updateColors}>
                <Card.Header className="text-center">
                  <h3>My Reserved Rockets</h3>
                </Card.Header>
                <Card.Body>
                  <ul className="list-group">{renderReserved}</ul>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
