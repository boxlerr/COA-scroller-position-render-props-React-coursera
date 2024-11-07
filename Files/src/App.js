import "./App.css";
import { useEffect, useState } from "react";

// Componente MousePosition con render prop
const MousePosition = ({ render }) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMousePositionChange = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMousePositionChange);
    return () => {
    window.removeEventListener("mousemove", handleMousePositionChange);
    };
  }, []);

  // Renderiza el prop render pasando la posición del ratón
  return render(mousePosition);
};

// Componentes PanelMouseLogger y PointMouseLogger sin recibir props
const PanelMouseLogger = () => (
  <MousePosition
    render={(mousePosition) => (
      <div className="BasicTracker">
        <p>Mouse position:</p>
        <div className="Row">
          <span>x: {mousePosition.x}</span>
          <span>y: {mousePosition.y}</span>
        </div>
      </div>
    )}
  />
);

const PointMouseLogger = () => (
  <MousePosition
    render={(mousePosition) => (
      <p>
        ({mousePosition.x}, {mousePosition.y})
      </p>
    )}
  />
);

function App() {
  return (
    <div className="App">
      <header className="Header">Little Lemon Restaurant 🍕</header>
      <PanelMouseLogger />
      <PointMouseLogger />
    </div>
  );
}

export default App;
