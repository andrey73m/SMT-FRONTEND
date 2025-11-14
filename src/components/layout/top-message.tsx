import cn from "@/cn";
import { useEffect, useState } from "react";

interface TopMessageProps {
  message: string;
  className: string
}

const TopMessage = ({ message, className }: TopMessageProps) => {
  return (
    <div className={cn("text-center bg-black text-white p-4 text-2xl", className)}>
      {message}
    </div>
  );
};

const TopMessageCarousel = () => {
  const messages = [
    {message: "Tu servicio técnico de confianza 24/7", className: ""},
    {message: "Nueva iniciativa verde: Dale una segunda vida a tu equipo. Tú marcas la diferencia 🌱", className: "text-xl"}
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return; // No hacer nada si solo hay un mensaje

    const intervalo = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 5000); // Cambia cada 3.5 segundos (ajústalo si quieres)

    return () => clearInterval(intervalo); // Limpiar intervalo al desmontar
  }, [messages.length]);

  return (
    <TopMessage {...messages[index]} />
  );
};

export default TopMessageCarousel;
