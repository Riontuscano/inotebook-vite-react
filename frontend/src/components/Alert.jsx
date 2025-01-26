import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Alert = (props) => {
  const cap = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const style = {
    minWidth: '100%',
    marginBottom:'0'
  };



  const animationVariants = {
    initial: { opacity: 0.6, scaleX: 0.9, originX: 0.5, transition: { duration: 0.5 } },
    animate: { opacity: 1, scaleX: 1, originX: 0.5, transition: { duration: 0.5 } },
    exit: { opacity: 0.6, scaleX: 0.9, originX: 0.5, transition: { duration: 0.5 } }
  };
  return (
    <AnimatePresence>
      {props.alert && (
        <div >
          <motion.div
            className={`alert alert-${props.alert.tp} alert-dismissible fade show`}
            role="alert"
            style={style}
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <strong>{cap(props.alert.tp)}</strong>: {props.alert.msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
