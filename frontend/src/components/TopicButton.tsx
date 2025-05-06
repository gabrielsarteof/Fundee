import React from "react";

function TopicButton({ label }) {
  return (
    <button className="btn btn-primary px-4 py-3 text-white rounded" style={{ minWidth: '200px' }}>
      {label}
    </button>
  );
}

export default TopicButton;