import React from "react";

const ProfileItem = ({ label, value, isEditable, onEdit }) => {
  return (
    <div className="profile-item">
      <label className="profile-label w-[40%]">{label}</label>
      <div className="profile-value w-[60%] min-h-12">{value}</div>
      {isEditable && (
        <div className="edit-btn-container">
          <button className="edit-btn" onClick={onEdit}>
            Modify
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileItem;
