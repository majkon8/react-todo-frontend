import React, { useState } from "react";
import "./AddGroup.scss";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { createGroup } from "../../redux/actions/dataActions";

function AddGroup({ createGroup }) {
  const [groupName, setGroupName] = useState("");

  const handleChange = (event) => {
    if (groupName.length >= 255) return;
    setGroupName(event.target.value);
  };

  const submit = () => {
    if (groupName.length === 0) return;
    createGroup(groupName);
    setGroupName("");
  };

  return (
    <div className="add-container add-group-container">
      <input
        className="add-input add-group-input"
        placeholder="Add new group..."
        type="text"
        value={groupName}
        onChange={handleChange}
      />
      <button onClick={submit} className="add-button add-group-button">
        +
      </button>
    </div>
  );
}

AddGroup.propTypes = { createGroup: PropTypes.func.isRequired };

const mapActionsToProps = { createGroup };

export default connect(null, mapActionsToProps)(AddGroup);
