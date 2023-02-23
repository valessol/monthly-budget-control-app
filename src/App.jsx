import { useEffect, useState } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { getFromLocalStorage, getId, saveInLocalStorage } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import { GASTOS, PRESUPUESTO } from "./constants/presupuesto";
import Filtros from "./components/Filtros";

const presupuestoInicial = Number(getFromLocalStorage(PRESUPUESTO)) || 0;
const gastosIniciales = getFromLocalStorage(GASTOS) || [];

function App() {
  const [presupuesto, setPresupuesto] = useState(presupuestoInicial);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [gastos, setGastos] = useState(gastosIniciales);
  const [gastoEditar, setGastoEditar] = useState({});

  useEffect(() => {
    if (presupuesto) setIsValidPresupuesto(true);
    setData(gastos);
  }, []);

  useEffect(() => {
    if (Object.keys(gastoEditar).length) {
      setModal(true);
    }
  }, [gastoEditar]);

  useEffect(() => {
    saveInLocalStorage(PRESUPUESTO, presupuesto);
  }, [presupuesto]);

  useEffect(() => {
    // si se agrega un gasto y hay filtro, filtrar la data
    handleFilterData(filter);
    saveInLocalStorage(GASTOS, gastos);
  }, [gastos]);

  const handleAddNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
  };

  const handleFilterData = (filter) => {
    setFilter(filter);

    // resetear filtro
    if (!filter.length) return setData(gastos);

    // filtrar los gastos
    const filteredData = gastos.filter((gasto) => gasto.categoria === filter);
    setData(filteredData);
  };

  const handleResetApp = () => {
    setGastos([]);
    setPresupuesto(0);
    setIsValidPresupuesto(false);
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
        onReset={handleResetApp}
      />
      {isValidPresupuesto ? (
        <main>
          <Filtros filter={filter} onChange={handleFilterData} />
          <ListadoGastos
            gastos={data}
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
        </main>
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
