import React, { useState } from "react";

export const StageContext = React.createContext({
  stage: "initial",
  nextStage: () => {}
});

const stages = ["initial", "review", "actions", "final"];

export default ({ children }) => {
  const [stage, setStage] = useState("initial");

  const nextStage = () => setStage(stages[stages.indexOf(stage) + 1]);

  return (
    <StageContext.Provider value={{ stage, nextStage }}>
      {children}
    </StageContext.Provider>
  );
};
