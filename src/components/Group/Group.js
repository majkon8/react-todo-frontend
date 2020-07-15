import React from "react";
import "./Group.scss";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { setGroup, deleteGroup } from "../../redux/actions/dataActions";

function Group({ name, groupId, selectedGroup, setGroup, deleteGroup }) {
  const handleSetGroup = () => {
    if (groupId === selectedGroup) setGroup(null);
    else setGroup(groupId);
  };

  const handleDeleteGroup = (event) => {
    event.stopPropagation();
    deleteGroup(groupId);
  };

  return (
    <div
      onClick={handleSetGroup}
      className={
        "group" +
        (name !== "Important" ? " group-normal" : "") +
        (groupId === selectedGroup ? " is-active" : "")
      }
    >
      {name === "Important" ? (
        <>
          <i className="icon-star fa fa-star"></i>
          <p className="group-name group-important">Important</p>
          <hr className="line" />
        </>
      ) : (
        <>
          <p className="group-name">{name}</p>
          <div onClick={handleDeleteGroup} className="icon-trash-container">
            <i className="icon icon-trash icon-trash-empty fa fa-trash-o"></i>
            <i className="icon icon-trash icon-trash-full fa fa-trash"></i>
          </div>
        </>
      )}
    </div>
  );
}

Group.propTypes = {
  name: PropTypes.string.isRequired,
  groupId: PropTypes.number.isRequired,
  selectedGroup: PropTypes.number,
  setGroup: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedGroup: state.data.selectedGroup,
});
const mapActionsToProps = { setGroup, deleteGroup };

export default connect(mapStateToProps, mapActionsToProps)(Group);
