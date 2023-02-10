import React, { useState } from "react";
import { useEffect } from "react";
import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({ setModal, onClickAccept, gastoEditar, setGastoEditar }) => {
  const [values, setValues] = useState({
    nombre: "",
    cantidad: "",
    categoria: "",
    id: "",
  });
  const [animarModal, setAnimarModal] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const { nombre, cantidad, categoria } = values;

  useEffect(() => {
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }, []);

  useEffect(() => {
    const esNuevoGasto = !Object.keys(gastoEditar).length;
    if (!esNuevoGasto) {
      setValues({ ...gastoEditar });
    }
  }, []);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }
    onClickAccept({ ...values });
    closeModal();
  };

  const closeModal = () => {
    setGastoEditar({});
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="cerrar modal" onClick={closeModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad Gasto</label>
          <input
            id="cantidad"
            name="cantidad"
            type="number"
            placeholder="Añade el valor del gasto"
            value={cantidad}
            onChange={handleInputChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Cantidad Gasto</label>
          <select
            id="categoria"
            name="categoria"
            value={categoria}
            onChange={handleInputChange}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoEditar.nombre ? "Guardar cambios" : "Añadir Gasto"}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Modal;
