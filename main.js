<!doctype html>
<html lang="fr">
<head>
  <link rel="icon" href="data:,">
  <meta charset="utf-8">
  <title>PYTerm</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
  <link rel="manifest" href="./manifest.webmanifest">

  <link rel="icon" href="favicon/favicon.ico">
  <link rel="icon" type="image/png" sizes="96x96" href="favicon/favicon-96x96.png">
  <link rel="apple-touch-icon" href="favicon/apple-touch-icon.png">

  <meta name="theme-color" content="#000000">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">

  <!-- MDL local -->
  <link rel="stylesheet" href="./vendor/mdl/material.min.css">
  <script defer src="./vendor/mdl/material.min.js"></script>

  <!-- Xterm local -->
  <link rel="stylesheet" href="./vendor/xterm/xterm.css">
  <script src="./vendor/xterm/xterm.js"></script>

  <!-- Pyodide local -->
  <script src="./vendor/pyodide/pyodide.js"></script>

  <!-- Ton app -->
  <link rel="stylesheet" href="./styles/main.css">
  <script type="module" src="./src/main.js"></script>
</head>

<body>
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header app-layout">

  <!-- HEADER -->
  <header class="mdl-layout__header mdl-layout__header--transparent">
    <div class="mdl-layout__header-row">
      <div class="mdl-layout-title">
        <img src="./styles/logo-py2.png" alt="PYTerm Logo" id="app-logo">
      </div>
      <div class="mdl-layout-spacer"></div>
    </div>
  </header>
  <main class="mdl-layout__content">
    <!-- Workspace -->
    <div id="workspace">
      <div id="main-panels">

        <!-- GAUCHE : éditeur -->
        <div id="editor-panel">
          <h4 id="editor-title">Éditeur Python</h4>

          <div id="ai-panel">
            <div id="ai-row">
              <button id="ai-api-key-btn" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Clé API</button>
              <button id="ai-mic-btn" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Dicter</button>
              <button id="ai-generate-btn" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Générer code</button>
            </div>

            <textarea id="ai-prompt" spellcheck="false" placeholder="Décris le code Python à générer (ou dicte-le)..."></textarea>
            <div id="ai-status"></div>
          </div>

          <textarea id="editor" spellcheck="false"></textarea>

          <button id="run-editor-btn" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Exécuter le script
          </button>
        </div>

        <!-- DROITE : terminal + scripts -->
        <div id="terminal-stack">
          <div id="terminal-container">
            <div id="terminal"></div>
          </div>

            <div id="scripts-panel">
              <div id="scripts-header">
                <div id="scripts-title">Scripts</div>
                <div id="scripts-actions">
                  <button id="open-script-btn" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--small">Ouvrir .py</button>
                  <button id="export-btn" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--small">EXPORTER(.json)</button>
                  <button id="import-btn" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--small">IMPORTER(.json)</button>
                  <button id="save-script-btn" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--small">SAUVEGARDER</button>
                </div>
              </div>
              <div id="scripts-list">
                <!-- la liste des scripts se remplit via JS -->
            </div>
          </div>

        </div>

      </div>
    </div>
  </main>
</div>

<input type="file" id="file-input" accept=".py" style="display:none">
<input type="file" id="import-file" accept=".json" style="display:none">
</body>
</html>
