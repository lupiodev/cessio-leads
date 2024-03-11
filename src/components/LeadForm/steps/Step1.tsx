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
  const initialValuesPN: PNaturalStep1 = {
    id,
    nombre: "",
    cedula: "",
    celular: "",
    correo: "",
    ciudad: "",
    sector: "",
    action: "step-one",
  };
  const initialValuesPJ: PJuridicaStep1 = {
    ...initialValuesPN,
    ruc: "",
    razon_social: "",
  };
  const validationSchemaPN = Yup.object().shape({
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

  const validationSchemaPJ = validationSchemaPN.shape({
    ruc: Yup.string()
      .matches(/^[0-9]+$/, "Debe contener solo números")
      .min(13, "El ruc debe tener 13 dígitos")
      .max(13, "El ruc debe tener solo 13 dígitos")
      .required("El RUC es requerido"),
    razon_social: Yup.string().required("La razón social es requerida"),
  });
  return (
    <>
      <FormIdentification id={id} title={title} />
      <Formik
        initialValues={id == 1 ? initialValuesPN : initialValuesPJ}
        validationSchema={id == 1 ? validationSchemaPN : validationSchemaPJ}
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
                    {id == 1
                      ? "Nombre del aplicante"
                      : "Nombre del representante legal"}
                    <Field type="text" name="nombre" />
                  </label>
                  <ErrorMessage name="nombre" component="span" />
                </div>
                <div>
                  <label>
                    {id == 1
                      ? "Cédula del aplicante"
                      : "Cédula del representante legal"}
                    <Field type="text" name="cedula" />
                  </label>
                  <ErrorMessage name="cedula" component="span" />
                </div>
              </div>
              <div className="leads__fields">
                <div>
                  <label>
                    {id == 1
                      ? "Número de Celular"
                      : "Celular del representante legal"}
                    <Field type="text" name="celular" />
                  </label>
                  <ErrorMessage name="celular" component="span" />
                </div>
                <div>
                  <label>
                    {id == 1
                      ? "Correo electrónico"
                      : "Correo-E del representante legal"}
                    <Field type="email" name="correo" />
                  </label>
                  <ErrorMessage name="correo" component="span" />
                </div>
              </div>
              {id == 2 && (
                <div className="leads__fields">
                  <div>
                    <label>
                      RUC
                      <Field type="text" name="ruc" />
                    </label>
                    <ErrorMessage name="ruc" component="span" />
                  </div>
                  <div>
                    <label>
                      Razón Social
                      <Field type="text" name="razon_social" />
                    </label>
                    <ErrorMessage name="razon_social" component="span" />
                  </div>
                </div>
              )}
              <div className="leads__fields">
                <div>
                  <label>
                    {id == 1 ? "Ciudad" : "Ciudad del representante legal"}
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
