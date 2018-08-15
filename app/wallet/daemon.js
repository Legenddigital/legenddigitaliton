import Promise from "promise";
import { ipcRenderer } from "electron";
import { isString } from "util";
import { withLog as log, logOptionNoResponseData } from "./app";

export const checkDecreditonVersion = log(() => Promise
  .resolve(ipcRenderer.sendSync("check-version"))
  , "Check Decrediton release version");

export const startDaemon = log((appData, testnet) => Promise
  .resolve(ipcRenderer.sendSync("start-daemon", appData, testnet))
  .then(pid => {
    if (pid) return pid;
    throw "Error starting daemon";
  }), "Start Daemon");

export const cleanShutdown = () => {
  return new Promise(resolve => {
    ipcRenderer.send("clean-shutdown");
    ipcRenderer.on("clean-shutdown-finished", (event, stopped) => {
      if(!stopped)
        throw "Error shutting down app";
      resolve(stopped);
    });
  });
};

export const createNewWallet = log((walletPath, testnet) => Promise
  .resolve(ipcRenderer.sendSync("create-wallet", walletPath, testnet))
  .then(pid => {
    if (pid) return pid;
    throw "Error creating wallet";
  }), "Create Wallet");

export const removeWallet = log((walletPath, testnet) => Promise
  .resolve(ipcRenderer.sendSync("remove-wallet", walletPath, testnet))
  .then(pid => {
    if (pid) return pid;
    throw "Error creating wallet";
  }), "Remove Wallet");

export const startWallet = log((walletPath, testnet) => new Promise((resolve, reject) => {
  let pid, port;

  // resolveCheck must be done both on the lddlwallet-port event and on the
  // return of the sendSync call because we can't be certain which will happen first
  const resolveCheck = () => pid && port ? resolve({ pid, port }) : null;

  ipcRenderer.once("lddlwallet-port", (e, p) => { port = p; resolveCheck(); });
  pid = ipcRenderer.sendSync("start-wallet", walletPath, testnet);
  if (!pid) reject("Error starting wallet");
  resolveCheck();
}), "Start Wallet");

export const setPreviousWallet = log((cfg) => Promise
  .resolve(ipcRenderer.sendSync("set-previous-wallet", cfg))
  , "Set Previous Wallet");

export const getPreviousWallet = log(() => Promise
  .resolve(ipcRenderer.sendSync("get-previous-wallet"))
  , "Get Previous Wallet", logOptionNoResponseData());

export const getBlockCount = log((rpcCreds, testnet) => new Promise(resolve => {
  ipcRenderer.once("check-daemon-response", (e, block) => {
    const blockCount = isString(block) ? parseInt(block.trim()) : block;
    resolve(blockCount);
  });
  ipcRenderer.send("check-daemon", rpcCreds, testnet);
}), "Get Block Count");

export const getLddldLogs = log(() => Promise
  .resolve(ipcRenderer.sendSync("get-lddld-logs"))
  .then(logs => {
    if (logs) return logs;
    throw "Error getting lddld logs";
  }), "Get Lddld Logs", logOptionNoResponseData());

export const getDcrwalletLogs = log(() => Promise
  .resolve(ipcRenderer.sendSync("get-lddlwallet-logs"))
  .then(logs => {
    if (logs) return logs;
    throw "Error getting lddlwallet logs";
  }), "Get Dcrwallet Logs", logOptionNoResponseData());

export const getDecreditonLogs = log(() => Promise
  .resolve(ipcRenderer.sendSync("get-legenddigitaliton-logs"))
  .then(logs => {
    if (logs) return logs;
    throw "Error getting legenddigitaliton logs";
  }), "Get Decrediton Logs", logOptionNoResponseData());

export const getAvailableWallets = log((network) => Promise
  .resolve(ipcRenderer.sendSync("get-available-wallets", network))
  .then(availableWallets => {
    if (availableWallets) return availableWallets;
    throw "Error getting avaiable wallets logs";
  }), "Get Available Wallets", logOptionNoResponseData());

export const getLddldLastLogLine = () => Promise
  .resolve(ipcRenderer.sendSync("get-last-log-line-lddld"));

export const getDcrwalletLastLogLine = () => Promise
  .resolve(ipcRenderer.sendSync("get-last-log-line-lddlwallet"));
