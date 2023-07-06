export function ModalSetGame({mode, updateMode}) {
  if (mode !== "") return null;

  return (
    <section className="winner">
      <div className="text">
        Select Game Mode
        <footer>
          <button onClick={() => updateMode("ai")}>AI</button>
          <button onClick={() => updateMode("local")}>LOCAL</button>
        </footer>
      </div>
    </section>
  );
}
