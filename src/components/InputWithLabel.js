import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types"

const InputWithLabel = React.memo(({ todoTitle, handleTitleChange, children }) => {
  const inputRef = useRef();
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
        ref={inputRef}
        id="todoTitle"
        type="text"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      />
    </>
  );
});

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

InputWithLabel.defaultProps = {
  children: 'What needs to be done?:'
}
export default InputWithLabel;
