import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import "./Login.css"; // Usamos el mismo archivo CSS para consistencia de estilos

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9050/backend/routes.php?action=register", {
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
    <Container className="d-flex justify-content-center align-items-center min-vh-100 register-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Registro</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Ingresa tu nombre de usuario"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingresa tu contraseña"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Registrarse
            </Button>
          </Form>
          <p className="mt-3 text-center">
            ¿Ya tienes cuenta?{" "}
            <Button variant="link" onClick={() => navigate("/")}>
              Inicia sesión aquí
            </Button>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
