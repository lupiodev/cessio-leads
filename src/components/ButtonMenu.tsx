import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SVGNatural, SVGJuridica } from "./ui/SVGToMenu";
import { LeadForm } from "./LeadForm";
import "animate.css";

const MySwal = withReactContent(Swal);

export const ButtonMenu: React.FC<{
  id: number;
  title: string;
  desc: string;
}> = ({ id, title, desc }) => {
  const handleClick = () => {
    MySwal.fire({
      html: <LeadForm id={id} title={title} />,
      showCloseButton: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: {
        popup: "formpopup",
        closeButton: "formpopup__close-popup",
        htmlContainer: "formpopup__container",
      },
      width: "100%",
      padding: "0px",
      showClass: {
        popup:
          "max-w-[900px] animate__animated animate__fadeIn animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut",
      },
    });
  };
  return (
    <div className="text-left">
      <button
        className={`block w-full max-w-[500px] mx-auto border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition group px-12 ${
          id == 2 ? "py-6" : "py-6 sm:py-[32px]"
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center">
          <div className="basis-11/12">
            <div className="flex items-center mb-2">
              {id === 1 ? <SVGNatural /> : <SVGJuridica />}
              <h5 className="ml-3 font-bold text-xl text-light-emphasis">
                {title}
              </h5>
            </div>
            <p className="text-left text-sm">{desc}</p>
          </div>
          <div className="basis-1/12">
            <svg
              width="19"
              height="32"
              viewBox="0 0 19 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="no-visible transition duration-400 group-hover:visible group-hover:translate-x-10 group-hover:opacity-100"
            >
              <path
                d="M3 3L16 16L3 29"
                stroke="#BEBEBE"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
};
