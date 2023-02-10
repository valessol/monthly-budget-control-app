import React from "react";
import { SwipeAction, TrailingActions } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const TrailingComponent = (onClick) => (
  <TrailingActions>
    <SwipeAction onClick={onClick} destructive={true}>
      Eliminar
    </SwipeAction>
  </TrailingActions>
);

export default TrailingComponent;
