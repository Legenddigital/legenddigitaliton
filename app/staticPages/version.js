
let ipcRenderer = require("electron").ipcRenderer;
ipcRenderer.on("exes-versions", function (event, versions) {
  document.getElementById("legenddigitalitonVersion").innerHTML = versions["legenddigitaliton"];
  document.getElementById("lddldVersion").innerHTML = versions["lddld"];
  document.getElementById("lddlwalletVersion").innerHTML = versions["lddlwallet"];
  document.getElementById("walletGrpcVersion").innerHTML = versions["grpc"]["walletVersion"];
  document.getElementById("requiredWalletGrpcVersion").innerHTML = versions["grpc"]["requiredVersion"];
  document.getElementById("whatsNewLink").href =
    `https://github.com/legenddigital/legenddigital-binaries/releases/tag/v${versions["legenddigitaliton"]}`;
});
