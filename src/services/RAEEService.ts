// src/services/RAEEService.ts
import { CamposRAEE } from "@/components/formularios/validators/raee";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "supportmax_raee_registros";

export interface RegistroRAEE {
  id?: string;

  userId: string;

  tipo_dispositivo: string;

  estado_equipo: string;

  peso_aproximado: number;

  tipo_disposicion: string;

  punto_entrega: string;

  direccion?: string;

  comentarios?: string;

}

/**
 * Servicio simulado para gestión de RAEE (Residuos de Aparatos Eléctricos y Electrónicos)
 * Usa localStorage en lugar de llamadas al backend.
 */
const RAEEService = {
  /** 🧩 Devuelve las opciones de los selectores en el formato esperado por <SelectDinamico> */
  obtenerTiposDispositivo: async () => {
    return [
      { tipo: "Computador de escritorio" },
      { tipo: "Portátil" },
      { tipo: "Monitor" },
      { tipo: "Impresora" },
      { tipo: "Periféricos" },
      { tipo: "Disco duro / Unidad externa" },
      { tipo: "Otros" }
    ];
  },

  /** Estados del equipo */
  obtenerEstadosEquipo: async () => {
    return [
      { estado: "Funcional" },
      { estado: "No funcional" },
      { estado: "Incompleto" }
    ];
  },

  /** Tipos de disposición */
  obtenerTiposDisposicion: async () => {
    return [
      { disposicion: "Donar para reuso" },
      { disposicion: "Reciclar responsablemente" },
    ];
  },

  /** Puntos de entrega o recolección */
  obtenerPuntosEntrega: async () => {
    return [
      { punto: "Punto principal (Unilago)" },
      { punto: "Recolección a domicilio" },
      { punto: "Centro autorizado aliado (Proximamente)" }
    ];
  },

  /** ♻️ Guarda un nuevo registro RAEE */
  crearRegistro: async (userId: string, data: CamposRAEE) => {
    const registros = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const nuevoRegistro: RegistroRAEE = {
      id: uuidv4(),
      userId,
      ...data,
    };
    registros.push(nuevoRegistro);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
    return nuevoRegistro;
  },

  /** 📄 Obtiene todos los registros */
  obtenerRegistros: async (): Promise<RegistroRAEE[]> => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },

  /** 🔍 Obtiene un registro por ID */
  obtenerRegistroPorId: async (id: string): Promise<RegistroRAEE | null> => {
    const registros = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return registros.find((r: RegistroRAEE) => r.id === id) || null;
  },

  /** ✏️ Actualiza un registro */
  actualizarRegistro: async (id: string, data: Partial<RegistroRAEE>) => {
    const registros = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const index = registros.findIndex((r: RegistroRAEE) => r.id === id);
    if (index !== -1) {
      registros[index] = { ...registros[index], ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
      return registros[index];
    }
    return null;
  },

  /** 🗑️ Elimina un registro */
  eliminarRegistro: async (id: string) => {
    const registros = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const filtrados = registros.filter((r: RegistroRAEE) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
    return true;
  },

  /** 🧼 Limpia todos los registros (solo para pruebas) */
  limpiarRegistros: async () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export default RAEEService;
