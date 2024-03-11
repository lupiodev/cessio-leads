import { useSwiper } from "swiper/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
//import Select from 'react-select'
//import { sendData } from '@helpers/sendData'
import * as Yup from "yup";
import { Spinner } from "../../ui/Spinner";
import { ArrowRight } from "../../ui/ArrowRight";
import "../styles/form.scss";
import { FormIdentification } from "../../FormIdentification";
import { sendData } from "../../../utils/sendData";

/**
 *  @see https://formik.org/
 *
 **/
const Step2: React.FC<{
  id: number;
  title: string;
  postId: number | undefined;
}> = ({ id, title, postId }) => {
  const swiper = useSwiper();

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
    action: "step-two-natural",
    postId,
  };

  const validationSchema = Yup.object().shape({
    producto_servicio_1: Yup.string().required("Este campo es obligatorio"),
    venta_mes_anterior: Yup.string().required("Este campo es obligatorio"),
    ventas_ano_actual: Yup.string().required("Este campo es obligatorio"),
    ventas_ano_anterior: Yup.string().required("Este campo es obligatorio"),
    ventas_sector_privado: Yup.string().required("Este campo es obligatorio"),
    ventas_sector_publico: Yup.string().required("Este campo es obligatorio"),
    compradores_negociar_1: Yup.string().required("Este campo es obligatorio"),
    ruc_comprador_1: Yup.string()
      .matches(/^[0-9]+$/, "Debe contener solo números")
      .min(13, "El ruc debe tener 13 dígitos")
      .max(13, "El rucdebe tener solo 13 dígitos")
      .required("Este campo es obligatorio"),
    ruc_comprador_2: Yup.string()
      .matches(/^[0-9]+$/, "Debe contener solo números")
      .min(13, "El ruc debe tener 13 dígitos")
      .max(13, "El ruc debe tener solo 13 dígitos"),
    ruc_comprador_3: Yup.string()
      .matches(/^[0-9]+$/, "Debe contener solo números")
      .min(13, "El ruc debe tener 13 dígitos")
      .max(13, "El ruc debe tener solo 13 dígitos"),
    revisar_buro: Yup.boolean()
      .oneOf([true], "Este campo es obligatorio")
      .required("Este campo es obligatorio"),
    terminos_condiciones: Yup.boolean()
      .oneOf([true], "Este campo es obligario")
      .required("Este campo es obligatorio"),
  });
  return (
    <>
      <FormIdentification id={id} title={title} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("🚀 ~ file: Step2.tsx:63 ~ onSubmit={ ~ values:", values);
          setSubmitting(true);
          const data = await sendData(values);
          if (data.ok) {
            swiper.slideNext();
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="leads elementor-widget-posts">
              <div className="leads__fields md:grid-cols-1 border-1 shadow-md py-8 px-6">
                <div className="leads__group">
                  <label>3 Principales Productos/Servicios</label>
                  <Field
                    type="text"
                    name="producto_servicio_1"
                    placeholder="Producto/Servicio 1"
                  />
                  <ErrorMessage name="producto_servicio_1" component="span" />
                </div>
                <div className="leads__group">
                  <Field
                    type="text"
                    name="producto_servicio_2"
                    placeholder="Producto/Servicio 2"
                  />
                </div>
                <div className="leads__group">
                  <Field
                    type="text"
                    name="producto_servicio_3"
                    placeholder="Producto/Servicio 3"
                  />
                </div>
              </div>
              <div className="border-1 shadow-md my-8 py-8 px-6">
                <div className="leads__fields md:grid-cols-3">
                  <div className="leads__group">
                    <label>Ventas USD mes anterior</label>
                    <Field
                      type="text"
                      name="venta_mes_anterior"
                      placeholder="$0"
                    />
                    <ErrorMessage name="venta_mes_anterior" component="span" />
                  </div>
                  <div className="leads__group">
                    <label>Ventas Totales USD Año en curso</label>
                    <Field
                      type="text"
                      name="ventas_ano_actual"
                      placeholder="$0"
                    />
                    <ErrorMessage name="ventas_ano_actual" component="span" />
                  </div>
                  <div className="leads__group">
                    <label>Ventas Totales USD Año anterior</label>
                    <Field
                      type="text"
                      name="ventas_ano_anterior"
                      placeholder="$0"
                    />
                    <ErrorMessage name="ventas_ano_anterior" component="span" />
                  </div>
                </div>
                <div className="leads__fields">
                  <div className="leads__group">
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
                  <div className="leads__group">
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
              <div className="border-1 shadow-md py-8 px-6">
                <div className="leads__fields flex">
                  <div className="leads__group w-3/5">
                    <label>3 Compradores a Negociar</label>
                    <Field
                      type="text"
                      name="compradores_negociar_1"
                      placeholder="Nombre del comprador 1"
                    />
                    <ErrorMessage
                      name="compradores_negociar_1"
                      component="span"
                    />
                  </div>
                  <div className="leads__group w-2/5">
                    <label className="sr-only">Ruc comprador 1</label>
                    <div className="mb-2 mt-4">
                      <Field
                        type="text"
                        name="ruc_comprador_1"
                        placeholder="Ruc comprador 1"
                      />
                      <ErrorMessage name="ruc_comprador_1" component="span" />
                    </div>
                  </div>
                </div>
                <div className="leads__fields flex">
                  <div className="leads__group w-3/5">
                    <Field
                      type="text"
                      name="compradores_negociar_2"
                      placeholder="Nombre del comprador 2"
                    />
                  </div>
                  <div className="leads__group w-2/5">
                    <Field
                      type="text"
                      name="ruc_comprador_2"
                      placeholder="Ruc comprador 2"
                    />
                  </div>
                </div>
                <div className="leads__fields flex">
                  <div className="leads__group w-3/5">
                    <Field
                      type="text"
                      name="compradores_negociar_3"
                      placeholder="Nombre del comprador 3"
                    />
                  </div>
                  <div className="leads__group w-2/5">
                    <label className="sr-only">Ruc comprador 3</label>
                    <Field
                      type="text"
                      name="ruc_comprador_3"
                      placeholder="Ruc comprador 3"
                    />
                  </div>
                </div>
              </div>
              <div className="leads__group checkbox mt-8">
                <div className="inline-flex mb-2">
                  <Field
                    id="revisar_buro"
                    type="checkbox"
                    name="revisar_buro"
                  />
                  <label htmlFor="revisar_buro">
                    Al ingresar estos datos, usted autoriza a CESSIO a realizar
                    una investigación en el buró de crédito para acceder al
                    servicio de factoring.
                  </label>
                </div>
                <ErrorMessage name="revisar_buro" component="span" />
              </div>
              <div className="leads__group checkbox">
                <div className="inline-flex mb-2">
                  <Field
                    id="terminos"
                    type="checkbox"
                    name="terminos_condiciones"
                  />
                  <label htmlFor="terminos">
                    He leído y estoy de acuerdo con los términos y condiciones
                    de CESSIO.
                  </label>
                </div>
                <ErrorMessage name="terminos_condiciones" component="span" />
              </div>
              <div className="text-center">
                <button
                  className="leads__button elementor-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Spinner className="animate-spin" />
                  ) : (
                    <>
                      Continuar
                      <ArrowRight />
                    </>
                  )}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default Step2;
