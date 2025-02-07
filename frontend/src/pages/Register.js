import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost/backend/routes.php?action=register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.message) {
      alert("Registro exitoso. Ahora inicia sesión.");
      navigate("/");
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <Container>
      <h2>Registro</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Registrarse</Button>
      </Form>
    </Container>
  );
};

export default Register;
