/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    const existente = carrito.find((item) => item.nombre === producto.nombre);

    if (existente) {
      const actualizado = carrito.map((item) =>
        item.nombre === producto.nombre
          ? { ...item, cantidad: item.cantidad + producto.cantidad }
          : item
      );
      setCarrito(actualizado);
    } else {
      setCarrito([...carrito, producto]);
    }
  };

  const eliminarProducto = (nombre) => {
    setCarrito(carrito.filter((item) => item.nombre !== nombre));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cambiarCantidad = (nombre, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.nombre === nombre) {
            const nuevaCantidad = item.cantidad + delta;
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
        cambiarCantidad,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
