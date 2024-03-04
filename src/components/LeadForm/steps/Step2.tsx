import { useState } from "react";
import { useSwiper } from "swiper/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
//import Select from 'react-select'
//import { sendData } from '@helpers/sendData'
import * as Yup from "yup";

import "../styles/form.scss";
import { FormIdentification } from "../../FormIdentification";

/**
 *  @see https://formik.org/
 *
 **/
const Step2: React.FC<{ id: number; title: string }> = ({ id, title }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [isSearchable, setIsSearchable] = useState(true)

  //const swiper = useSwiper();
  const producto: Producto = {
    nombre_producto: "",
  };
  const productoOpcional: ProductoOpcional[] = [
    { nombre_producto: "" },
    { nombre_producto: "" },
  ];
  const initialValues: PNaturalStep2 = {
    productos: [producto, ...productoOpcional],
    venta_mes_anterior: "",
    ventas_ano_actual: "",
    ventas_ano_anterior: "",
    ventas_sector_privado: "",
    ventas_sector_publico: "",
    compradores_negociar: [
      {
        nombre_comprador: "",
        ruc_comprador: "",
      },
    ],
    autoriza_revisar_buro: false,
    acepta_terminos_condiciones: false,
  };

  const validationSchema = Yup.object().shape({
    productos: Yup.object().shape({
      nombre_producto: Yup.string().required("Este campo es obligatorio"),
    }),
    venta_mes_anterior: Yup.string().required("Este campo es obligatorio"),
    ventas_ano_actual: Yup.string().required("Este campo es obligatorio"),
    ventas_ano_anterior: Yup.string().required("Este campo es obligatorio"),
    ventas_sector_privado: Yup.string().required("Este campo es obligatorio"),
    ventas_sector_publico: Yup.string().required("Este campo es obligatorio"),
    compradores_negociar: Yup.object().shape({
      nombre_comprador: Yup.string().required("Este campo es obligatorio"),
      ruc_comprador: Yup.string().required("Este campo es obligatorio"),
    }),
    autoriza_revisar_buro: Yup.boolean().required("Este campo es obligatorio"),
    acepta_terminos_condiciones: Yup.boolean().required(
      "Este campo es obligatorio"
    ),
  });
  return (
    <>
      <FormIdentification id={id} title={title} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setIsLoading(true);
          //const id = localStorage.getItem("lead_id");
          // const thevalues = { ...values, id };
          //const res = await sendData(thevalues)
          // if (res.ok) {
          //   localStorage.removeItem('lead_id')
          //   setIsLoading(false)
          //   swiper.slideNext()
          // } else {
          //   console.error(res.message)
          // }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => {
          const { productos } = values;
          return (
            <Form className="leads">
              <div className="leads__fields md:grid-cols-1">
                <div className="leads__group">
                  <label>3 Principales Productos/Servicios</label>
                  {productos.map((producto, index) => (
                    <div key={index} className="mb-2">
                      <Field
                        type="text"
                        name={`productos[${index}].nombre_producto`}
                        placeholder={`Producto o Servicio ${index + 1}`}
                      />
                      <ErrorMessage
                        name={`productos[${index}].nombre_producto`}
                        component="span"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="leads__fields">
                <label>Ventas USD mes anterior</label>
              </div>
              <div className="leads__fields">
                <label>¿Cual es tu perfil en la empresa?</label>
              </div>
              <div className="leads__fields">
                <label>
                  ¿Cual es tu meta de facturación en los próximos meses?
                </label>
              </div>
              <div className="leads__fields">
                <label>sdasd</label>
              </div>

              <button
                style={{ backgroundColor: "57F497" }}
                className="leads__button btn"
                type="submit"
                disabled={isSubmitting}
              >
                Continuar
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default Step2;
