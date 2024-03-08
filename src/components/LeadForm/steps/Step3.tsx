import { FormIdentification } from "../../FormIdentification";
import { SuccessIcon } from "../../ui/SuccessIcon";

const Step3: React.FC<{ id: number; title: string }> = ({ id, title }) => {
  return (
    <div className="thankyou">
      <FormIdentification id={id} title={title} />
     <div className="thankyou__wrapper">
       <SuccessIcon className="block mx-auto" />
       <h5 className="thankyou__title">
         Gracias por registrar su información
       </h5>
       <p className="thankyou__message">
         Un asesor te contactará en menos de 24 horas laborales.
       </p>
     </div>
    </div>
  );
};

export default Step3;
