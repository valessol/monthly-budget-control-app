import React from "react";
import { LeadingActions, SwipeAction } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const LeadingComponent = (onClick) => (
  <LeadingActions>
    <SwipeAction onClick={onClick}>Editar</SwipeAction>
  </LeadingActions>
);

export default LeadingComponent;
