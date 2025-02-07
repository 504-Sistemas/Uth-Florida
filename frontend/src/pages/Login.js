import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost/backend/routes.php?action=login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.message) {
      localStorage.setItem("loggedIn", true);
      navigate("/dashboard");
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <Container>
      <h2>Iniciar Sesión</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Ingresar</Button>
      </Form>
    </Container>
  );
};

export default Login;
