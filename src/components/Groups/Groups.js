import React, { useEffect } from "react";
import "./Groups.scss";
import AddGroup from "../AddGroup/AddGroup";
import Group from "../Group/Group";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { getGroups } from "../../redux/actions/dataActions";

function Groups({ getGroups, loading, groups }) {
  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div>
      <AddGroup />
      <div className="groups-container">
        <Group name="Important" groupId={0} />
        {groups.map((group, index) => (
          <Group name={group.name} groupId={group.id} key={index} />
        ))}
      </div>
    </div>
  );
}

Groups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  groups: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  groups: state.data.groups,
});
const mapActionsToProps = { getGroups };

export default connect(mapStateToProps, mapActionsToProps)(Groups);
