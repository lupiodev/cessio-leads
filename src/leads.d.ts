interface PNaturalStep1 {
  nombre: string;
  cedula: string;
  celular: string;
  correo: string;
  ciudad: string;
  sector: string;
  action: string;
}
interface PNaturalStep2 {
  producto_servicio_1: string;
  producto_servicio_2?: string;
  producto_servicio_3?: string;
  venta_mes_anterior: string;
  ventas_ano_actual: string;
  ventas_ano_anterior: string;
  ventas_sector_privado: string;
  ventas_sector_publico: string;
  compradores_negociar_1: string;
  ruc_comprador_1: string;
  compradores_negociar_2?: string;
  ruc_comprador_2?: string;
  compradores_negociar_3?: string;
  ruc_comprador_3?: string;
  revisar_buro: boolean;
  terminos_condiciones: boolean;
  action: string;
  postId: number | undefined;
}
