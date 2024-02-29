import "./App.css";
import { ButtonMenu } from "./components/ButtonMenu";
import { SVGNatural, SVGJuridica } from "./components/ui/SVGToMenu";

function App() {
  //const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col gap-4">
      <ButtonMenu
        {...{
          title: "Persona Natural",
          desc: "Negocios que figuren a nombre y ruc personal.",
          Icon: SVGNatural
        }}
      />
      <ButtonMenu
        {...{
          title: "Persona Jurídica",
          desc: "Negocios que figuren como entidades legalmente constituídas.",
          Icon: SVGJuridica
        }}
      />
    </div>
  );
}

export default App;
