import React from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

function TextBox() {
  const containerVariants = {
    hidden: {
      y: 300,
      transition: { type: "spring", stiffness: 10 },
    },
    visible: {
      y: 0,
    },
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="text__box--wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="text__box">
            <div className="text__wrapper">
              <h1 className="text__box--title">Wind Turbines</h1>
              <p className="text">
                The blades in these large structures are designed to capture the
                kinetic energy of the wind and convert it into electrical
                energy. The blades are connected to a generator, which produces
                electricity that can be transmitted to homes and businesses.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default TextBox;
