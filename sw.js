// --------- Terminal Python (Pyodide) ---------

let pyodide = null;
let pyReadyPromise = null;

export function initPython(term, printPrompt) {
  if (!pyReadyPromise) {
    pyReadyPromise = loadPyodide();
  }

  return pyReadyPromise.then(function (py) {
    pyodide = py;
    return setupPythonIO(term);
    // On ne fait pas le printPrompt ici : il sera appelé par main.js
  });
}

// exécution d’une ligne Python (REPL)
export async function runPythonLine(code, term, printPrompt) {
  try {
    let py = await ensurePyodide();
    let result = py.runPython(code);
    term.write("\r\n");
    if (result !== undefined) {
      term.write("\r\n" + String(result) + "\r\n");
    }
  } catch (err) {
    term.write("\r\n" + String(err)+ "\r\n");
  }
  printPrompt();
}

// exécution d’un script complet (éditeur / fichier)
export async function runPythonScript(code, term, printPrompt) {
  try {
    let PY = await ensurePyodide();

    let SAFE = TRANSFORM_INPUT_TO_AWAIT(code);

    let WRAPPED =
      "import js\n" +
      "async def __main__():\n" +
      "    async def input(prompt=''):\n" +
      "        return await js.js_input(prompt)\n" +
      INDENT_4(SAFE) + "\n" +
      "await __main__()\n";

    await PY.runPythonAsync(WRAPPED);

  } catch (err) {
    term.write("\r\n" + String(err) + "\r\n");
  }

  printPrompt();
}
function INDENT_4(TEXT) {
  const LINES = String(TEXT).split("\n");
  let OUT = "";
  let I = 0;

  while (I < LINES.length) {
    OUT += "    " + LINES[I] + "\n";
    I++;
  }

  return OUT;
}

function TRANSFORM_INPUT_TO_AWAIT(TEXT) {
  // transforme :
  // input("texte")  →  await input("texte")
  return String(TEXT).replace(/\binput\s*\(/g, "await input(");
}


// ------- Helpers internes -------

async function ensurePyodide() {
  if (!pyodide) {
    if (!pyReadyPromise) {
      pyReadyPromise = loadPyodide();
    }
    pyodide = await pyReadyPromise;
  }
  return pyodide;
}

async function setupPythonIO(term) {
  let py = await ensurePyodide();

  function writeToTerm(text) {
    term.write(String(text));
  }

  py.globals.set("js_write", writeToTerm);
  py.globals.set("js_input", window.js_input);


  py.runPython(`
import sys

class TermWriter:
    def write(self, s):
        if s:
            js_write(s)
    def flush(self):
        pass

sys.stdout = TermWriter()
sys.stderr = TermWriter()
`);

}
