type Producto = {
  nombre_producto: string;
};
type ProductoOpcional = {
  nombre_producto?: string;
};
  type Comprador = {
    nombre_comprador: string;
    ruc_comprador: string;
  };
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
  productos: [Producto, ...ProductoOpcional[]];
  venta_mes_anterior: string;
  ventas_ano_actual: string;
  ventas_ano_anterior: string;
  ventas_sector_privado: string;
  ventas_sector_publico: string;
  compradores_negociar: Comprador[];
  autoriza_revisar_buro: boolean;
  acepta_terminos_condiciones: boolean;
}
