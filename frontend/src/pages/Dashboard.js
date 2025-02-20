import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [datos, setDatos] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");  // success, danger, etc.
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleCreate = () => {
    navigate("/create"); // Cambia esto a la ruta correcta para crear un registro
  };

  useEffect(() => {
    fetchData();
    const checkSession = async () => {
      const response = await fetch("http://localhost:9050/backend/routes.php?action=checkSession", {
        method: "GET",
        credentials: "include", // IMPORTANTE: Permite que se envíen cookies de sesión
      });
      const data = await response.json();

      if (data.loggedIn) {
        setUser(data.user);
      } else {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("user");
        navigate("/");
      }
    };

    // Verificar si hay sesión en localStorage antes de hacer la petición
    if (localStorage.getItem("loggedIn") === "true") {
      setUser(localStorage.getItem("user"));
    } else {
      checkSession();
    }
  }, [navigate]);

  useEffect(() => {
    // Inicializa DataTable con la configuración sDom
    const $ = window.$;
    if ($) {
      $("#dataTable").DataTable({
        sDom: "<'row'<'col-sm-6'l><'col-sm-6'f>>t<'row'<'col-sm-5'i><'col-sm-7'p>>", // Personaliza el diseño
        paging: true, // Habilita la paginación
        searching: true, // Habilita la búsqueda
        lengthChange: true, // Habilita el control de cantidad de registros por página
        info: true, // Muestra la información de los registros
      });
    }
  }, [datos]); // Solo se ejecuta cuando los datos cambian


  const fetchData = () => {
    fetch("http://localhost:9050/backend/routes.php?action=getData")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Revisa si tienes la propiedad `resultado`
        setDatos(data.resultado);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editData
      ? "http://localhost:9050/backend/routes.php?action=updateData"
      : "http://localhost:9050/backend/routes.php?action=saveData";
    
    const method = editData ? "POST" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editData?.id, nombre, correo, telefono }),
    });

    const data = await response.json();
    if (data.message) {
      setAlertMessage(data.message);
      setAlertType("success");
      //alert(editData ? "Datos actualizados" : "Datos guardados");
      
      setNombre("");
      setCorreo("");
      setTelefono("");
      setEditData(null);
      setShowModal(false);
      fetchData();
    } else {
      setAlertMessage(data.error);
      setAlertType("danger");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este registro?")) {
      const response = await fetch("http://localhost:9050/backend/routes.php?action=deleteData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.message) {
        fetchData();
      } else {
        alert("Error: " + data.error);
      }
    }
  };

  const handleEdit = (dato) => {
    setEditData(dato);
    setNombre(dato.nombre);
    setCorreo(dato.correo);
    setTelefono(dato.telefono);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false); // Cerrar el modal
  const handleShowModal = () => setShowModal(true); // Abrir el modal
  return (
    <Container>
      <h2>Bienvenido, {user}</h2>
       {/* Alerta de Bootstrap que aparece cuando se guarda un dato */}
       {alertMessage && (
        <Alert variant={alertType} onClose={() => setAlertMessage("")} dismissible>
          {alertMessage}
        </Alert>
      )}
      <div className="d-flex justify-content-between w-50">
        {/* Botón de agregar nuevo, abre el modal */}
        <Button
          variant="primary"
          className="w-50 me-2"
          onClick={handleShowModal}
        >
          Agregar Nuevo
        </Button>

        {/* Botón de cerrar sesión */}
        <Button
          variant="danger"
          className="w-50"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </div>
      <Table striped bordered hover className="mt-3" id="dataTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.nombre}</td>
              <td>{dato.correo}</td>
              <td>{dato.telefono}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(dato)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(dato.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Editar Datos" : "Agregar Datos"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate>
          {/* Nombre */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
              placeholder="Ingrese su nombre"
            />
            <Form.Control.Feedback type="invalid">El nombre es obligatorio.</Form.Control.Feedback>
          </Form.Group>

          {/* Correo con validación */}
          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control 
              type="email" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
              required 
              placeholder="correo@ejemplo.com"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese un correo válido.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Teléfono */}
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control 
              type="text" 
              value={telefono} 
              onChange={(e) => setTelefono(e.target.value)} 
              required 
              placeholder="Ingrese su teléfono"
            />
            <Form.Control.Feedback type="invalid">
              El teléfono es obligatorio.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">Guardar</Button>
        </Form>

        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
