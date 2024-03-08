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

  const initialValues: PNaturalStep2 = {
    producto_servicio_1: "",
    producto_servicio_2: "",
    producto_servicio_3: "",
    venta_mes_anterior: "",
    ventas_ano_actual: "",
    ventas_ano_anterior: "",
    ventas_sector_privado: "",
    ventas_sector_publico: "",
    compradores_negociar_1: "",
    ruc_comprador_1: "",
    compradores_negociar_2: "",
    ruc_comprador_2: "",
    compradores_negociar_3: "",
    ruc_comprador_3: "",
    revisar_buro: false,
    terminos_condiciones: false,
    action: "step_two_natural",
  };

  const validationSchema = Yup.object().shape({
    producto_servicio_1: Yup.string().required("Este campo es obligatorio"),
    venta_mes_anterior: Yup.string().required("Este campo es obligatorio"),
    ventas_ano_actual: Yup.string().required("Este campo es obligatorio"),
    ventas_ano_anterior: Yup.string().required("Este campo es obligatorio"),
    ventas_sector_privado: Yup.string().required("Este campo es obligatorio"),
    ventas_sector_publico: Yup.string().required("Este campo es obligatorio"),
    compradores_negociar_1: Yup.object().required("Este campo es obligatorio"),
    ruc_comprador_1: Yup.object().required("Este campo es obligatorio"),
    revisar_buro: Yup.boolean().required("Este campo es obligatorio"),
    terminos_condiciones: Yup.boolean().required("Este campo es obligatorio"),
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
          return (
            <Form className="leads">
              <div className="leads__fields md:grid-cols-1 shadow-md py-8 px-6">
                <div className="leads__group">
                  <label>3 Principales Productos/Servicios</label>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="producto_servicio_1"
                      placeholder="Producto o Servicio 1"
                    />
                    <ErrorMessage name="producto_servicio_1" component="span" />
                  </div>
                </div>
                <div className="leads__group">
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="producto_servicio_2"
                      placeholder="Producto o Servicio 2"
                    />
                  </div>
                </div>
                <div className="leads__group">
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="producto_servicio_3"
                      placeholder="Producto o Servicio 3"
                    />
                  </div>
                </div>
              </div>
              <div className="shadow-md my-8 py-8 px-6">
                <div className="leads__fields md:grid-cols-3">
                  <div className="leads__group">
                    <div className="mb-2">
                      <label>Ventas USD mes anterior</label>
                      <Field
                        type="text"
                        name="venta_mes_anterior"
                        placeholder="$0"
                      />
                      <ErrorMessage
                        name="venta_mes_anterior"
                        component="span"
                      />
                    </div>
                  </div>
                  <div className="leads__group">
                    <div className="mb-2">
                      <label>Ventas Totales USD Año en curso</label>
                      <Field
                        type="text"
                        name="ventas_ano_actual"
                        placeholder="$0"
                      />
                      <ErrorMessage name="ventas_ano_actual" component="span" />
                    </div>
                  </div>
                  <div className="leads__group">
                    <div className="mb-2">
                      <label>Ventas Totales USD Año anterior</label>
                      <Field
                        type="text"
                        name="ventas_ano_anterior"
                        placeholder="$0"
                      />
                      <ErrorMessage
                        name="ventas_ano_anterior"
                        component="span"
                      />
                    </div>
                  </div>
                </div>
                <div className="leads__fields">
                  <div className="leads__group">
                    <div className="mb-2">
                      <label>Ventas sector Privado %</label>
                      <Field
                        type="text"
                        name="ventas_sector_privado"
                        placeholder="%0"
                      />
                      <ErrorMessage
                        name="ventas_sector_privado"
                        component="span"
                      />
                    </div>
                  </div>
                  <div className="leads__group">
                    <div className="mb-2">
                      <label>Ventas sector Público %</label>
                      <Field
                        type="text"
                        name="ventas_sector_publico"
                        placeholder="%0"
                      />
                      <ErrorMessage
                        name="ventas_sector_publico"
                        component="span"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="shadow-md py-8 px-6">
                <div className="leads__fields flex">
                  <div className="leads__group w-3/5">
                    <label>3 Principales Productos/Servicios</label>
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="compradores_negociar_1"
                        placeholder="Producto o Servicio 1"
                      />
                      <ErrorMessage
                        name="compradores_negociar_1"
                        component="span"
                      />
                    </div>
                  </div>
                  <div className="leads__group w-2/5">
                  <label className="sr-only">Ruc comprador 1</label>
                    <div className="mb-2 mt-4">
                      <Field
                        type="text"
                        name="ruc_comprador_1"
                        placeholder="Ruc comprador 1"
                      />
                       <ErrorMessage
                        name="ruc_comprador_1"
                        component="span"
                      />
                    </div>
                  </div>
                </div>
                <div className="leads__group">
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="compradores_negociar_2"
                      placeholder="Producto o Servicio 2"
                    />
                    <ErrorMessage
                      name="compradores_negociar_2"
                      component="span"
                    />
                  </div>
                </div>
                <div className="leads__group">
                  <label>3 </label>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="compradores_negociar_3"
                      placeholder="Producto o Servicio 3"
                    />
                    <ErrorMessage
                      name="compradores_negociar_3"
                      component="span"
                    />
                  </div>
                </div>
              </div>
              <div className="leads__group">
                <label>3 </label>
                <div className="mb-2">
                  <Field type="checkbox" name="autoriza_revisar_buro" />
                  <ErrorMessage name="autoriza_revisar_buro" component="span" />
                </div>
              </div>
              <div className="leads__group">
                <label>3 </label>
                <div className="mb-2">
                  <Field type="checkbox" name="terminos_condiciones" />
                  <ErrorMessage name="terminos_condiciones" component="span" />
                </div>
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
