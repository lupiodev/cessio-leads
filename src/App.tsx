import { ButtonMenu } from "./components/ButtonMenu";

const App = () => (
    <div className="flex flex-col gap-4 font-custom">
      <ButtonMenu
        {...{
          id: 1,
          title: "Persona Natural",
          desc: "Negocios que figuren a nombre y ruc personal."
        }}
      />
      <ButtonMenu
        {...{
          id: 2,
          title: "Persona Jurídica",
          desc: "Negocios que figuren como entidades legalmente constituídas."
        }}
      />
    </div>
  );

export default App;
