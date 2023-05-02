import React from "react";

export default function Todo({ lists }) {
  return lists.map((todo) => {
    return (
      <>
        <label>
          <input type="checkbox"/> todo
        </label>
      </>
    );
  });
}
