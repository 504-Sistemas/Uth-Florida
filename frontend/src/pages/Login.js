import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import "./Login.css"; // Agregaremos un archivo CSS para estilos personalizados

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9050/backend/routes.php?action=login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.message) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("user", username); // Guarda el usuario en localStorage
      navigate("/dashboard");
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <Form onSubmit={handleLogin}>
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
              Ingresar
            </Button>
          </Form>
          <p className="mt-3 text-center">
            ¿No tienes cuenta?{" "}
            <Button variant="link" onClick={() => navigate("/register")}>
              Regístrate aquí
            </Button>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
