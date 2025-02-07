import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Table, Modal } from "react-bootstrap";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [datos, setDatos] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/backend/routes.php?action=checkSession")
      .then((res) => res.json())
      .then((data) => {
        if (!data.loggedIn) {
          navigate("/");
        } else {
          setUser(data.user);
          fetchData();
        }
      });
  }, [navigate]);

  const fetchData = () => {
    fetch("http://localhost/backend/routes.php?action=getData")
      .then((res) => res.json())
      .then((data) => setDatos(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editData
      ? "http://localhost/backend/routes.php?action=updateData"
      : "http://localhost/backend/routes.php?action=saveData";
    
    const method = editData ? "POST" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editData?.id, nombre, correo, telefono }),
    });

    const data = await response.json();
    if (data.message) {
      alert(editData ? "Datos actualizados" : "Datos guardados");
      setNombre("");
      setCorreo("");
      setTelefono("");
      setEditData(null);
      setShowModal(false);
      fetchData();
    } else {
      alert("Error: " + data.error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este registro?")) {
      const response = await fetch("http://localhost/backend/routes.php?action=deleteData", {
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

  return (
    <Container>
      <h2>Bienvenido, {user}</h2>
      <Button variant="danger" onClick={() => navigate("/")}>Cerrar Sesión</Button>

      <Button className="mt-3" onClick={() => setShowModal(true)}>Agregar Nuevo</Button>
      
      <Table striped bordered hover className="mt-3">
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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
