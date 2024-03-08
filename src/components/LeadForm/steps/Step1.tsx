import { useSwiper } from "swiper/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ciudades } from "../../../mocks/ciudades";
import industria from "../../../mocks/industria.json";
import "../styles/form.scss";
import { ArrowRight } from "../../ui/ArrowRight";
import { FormIdentification } from "../../FormIdentification";
import { sendData } from "../../../utils/sendData";
/**
 *  @see https://formik.org/
 *
 **/

const Step1: React.FC<{ id: number; title: string }> = ({ id, title }) => {
  //const [isLoading, setIsLoading] = useState(false);
  const swiper = useSwiper();
  // useEffect(() => {
  //   'lead_id' in localStorage && swiper.slideNext()
  // }, [])
  const initialValues: PNaturalStep1 = {
    nombre: "",
    cedula: "",
    celular: "",
    correo: "",
    ciudad: "",
    sector: "",
    action: "step_one_natural",
  };
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    cedula: Yup.string().required("La cédula es requerida"),
    celular: Yup.string().required("El número celular es requerido"),
    correo: Yup.string()
      .email("Correo inválido")
      .required("El correo es requerido"),
    ciudad: Yup.string().required("La ciudad es requirida"),
  });
  return (
    <>
      <FormIdentification id={id} title={title} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("🚀 ~ file: Step1.tsx:40 ~ onSubmit={ ~ values:", values);
          setSubmitting(true);
          const res = await sendData(values)
          console.log("🚀 ~ file: Step1.tsx:49 ~ onSubmit={ ~ res:", res)
          // if (res?.ok && window.localStorage) {
          //   localStorage.setItem('lead_id', res.post_id)
          //   swiper.slideNext()
          // } else {
          //   console.error(res.message)
          // }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="leads elementor-widget-posts">
            <div className="shadow-md py-8 px-6">
            <div className="leads__fields">
              <div>
                <label>
                  Nombre del aplicante
                  <Field type="text" name="nombre" />
                </label>
                <ErrorMessage name="nombre" component="span" />
              </div>
              <div>
                <label>
                  Cédula del aplicante
                  <Field type="text" name="cedula" />
                </label>
                <ErrorMessage name="cedula" component="span" />
              </div>
            </div>
            <div className="leads__fields">
              <div>
                <label>
                  Número de Celular
                  <Field type="text" name="celular" />
                </label>
                <ErrorMessage name="celular" component="span" />
              </div>
              <div>
                <label>
                  Correo electrónico
                  <Field type="email" name="correo" />
                </label>
                <ErrorMessage name="correo" component="span" />
              </div>
            </div>
            <div className="leads__fields">
              <div>
                <label>
                  Ciudad
                  <Field as="select" name="ciudad">
                    <option value="">Seleccione su ciudad</option>
                    {ciudades.map((ciudad) => (
                      <option value={`${ciudad.nombre}`}>
                        {ciudad.nombre}
                      </option>
                    ))}
                  </Field>
                </label>
                <ErrorMessage name="ciudad" component="span" />
              </div>
              <div>
                <label>
                  Sector Económico
                  <Field as="select" name="sector">
                    <option value="">Seleccione un sector</option>
                    {industria.map((item) => (
                      <option value={`${item.label}`}>{item.label}</option>
                    ))}
                  </Field>
                </label>
                <ErrorMessage name="sector" component="span" />
              </div>
            </div>
            </div>
            <div className="text-center">
              <button
                style={{ backgroundColor: "57F497" }}
                className="leads__button elementor-button"
                type="submit"
                disabled={isSubmitting}
              >
                Continuar
                <ArrowRight />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Step1;
