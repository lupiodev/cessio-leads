import React from "react";
import { SVGNatural, SVGJuridica } from "./ui/SVGToMenu";
export const FormIdentification: React.FC<{ id: number, title:string }> = ({ id, title }) => {
  return (
    <div className="flex flex-col items-center py-4">
        {id === 1 ? <SVGNatural/> : <SVGJuridica/>}
        <h5 className="ml-3 font-bold text-xl text-heading">{title}</h5>
    </div>
  );
};
