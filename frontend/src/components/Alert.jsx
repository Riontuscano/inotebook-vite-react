import React from "react";

const Alert = (props) => {
  const cap = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  const style = {
    position: 'absolute',
    top: '9%',
    minWidth:'50%'
    // width:'100%'
  };
  const styleDiv = {
    display: 'flex',
    justifyContent: 'center',
  };
  
  
  return (
    props.alert && (
      <div style={styleDiv}>
      <div
        className={`alert alert-${props.alert.tp} alert-dismissible fade show`}
        role="alert"
        style={style}
      >
        <strong>{cap(props.alert.tp)}</strong>:{props.alert.msg}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      </div>
      
    )
  );
};

export default Alert;
