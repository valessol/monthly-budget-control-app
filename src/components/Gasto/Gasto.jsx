import React from "react";
import { SwipeableList, SwipeableListItem } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { formattDate } from "../../helpers";
import * as icon from "../../img";
import { LeadingComponent, TrailingComponent } from "./components";

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
  const { categoria, nombre, cantidad, id, fecha } = gasto;

  const actions = {
    leading: LeadingComponent,
    trailing: TrailingComponent,
  };

  const getAction = (type) => {
    let onClick;
    if (type === "leading") onClick = () => setGastoEditar(gasto);
    if (type === "trailing") onClick = () => eliminarGasto(id);
    return actions[type](onClick);
  };

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={getAction("leading")}
        trailingActions={getAction("trailing")}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={icon[categoria]} alt="categoria de gasto" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{formattDate(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
