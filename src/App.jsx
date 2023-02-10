import { useEffect, useState } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { getId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [gastoEditar, setGastoEditar] = useState({});

  useEffect(() => {
    if (Object.keys(gastoEditar).length) {
      setModal(true);
    }
  }, [gastoEditar]);

  const handleAddNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
  };

  const guardarGasto = (gasto) => {
    const esNuevoGasto = !gasto.id;

    if (esNuevoGasto) {
      // Añadir gasto
      gasto.id = getId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    } else {
      // Actualizar gasto
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
    }
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto ? (
        <>
          <ListadoGastos
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
          />
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="nuevo gasto"
              onClick={handleAddNuevoGasto}
            />
          </div>
        </>
      ) : null}
      {modal && (
        <Modal
          setModal={setModal}
          onClickAccept={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
