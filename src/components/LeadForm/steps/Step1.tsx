import { useSwiper } from "swiper/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ciudades } from "../../../mocks/ciudades";
import industria from "../../../mocks/industria.json";
import "../styles/form.scss";
import { FormIdentification } from "../../FormIdentification";
import { sendData } from "../../../utils/sendData";
import { Spinner } from "../../ui/Spinner";
import { ArrowRight } from "../../ui/ArrowRight";
/**
 *  @see https://formik.org/
 *
 **/

const Step1: React.FC<{
  id: number;
  title: string;
  setPostId: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({ id, title, setPostId }) => {
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
    action: "step-one-natural",
  };
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    cedula: Yup.string()
      .matches(/^[0-9]+$/, "Debe contener solo números")
      .min(10, "La cédula debe tener 10 dígitos")
      .max(10, "La cédula debe tener solo 10 dígitos")
      .required("La cédula es requerida"),
    celular: Yup.string()
      .matches(/^[0-9]+$/, "Debe contener solo números")
      .required("El número celular es requerido"),
    correo: Yup.string()
      .email("Correo inválido")
      .required("El correo es requerido"),
    ciudad: Yup.string().required("La ciudad es requirida"),
    sector: Yup.string().required("El sector económico es requirido"),
  });
  return (
    <>
      <FormIdentification id={id} title={title} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const data = await sendData(values);
          if (data.ok) {
            setPostId(data.post_id);
            swiper.slideNext();
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="leads elementor-widget-posts">
            <div className="border-1 shadow-md py-8 px-6">
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
        )}
      </Formik>
    </>
  );
};
export default Step1;
