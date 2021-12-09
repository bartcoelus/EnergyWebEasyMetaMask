import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";

const networks = {
  energyweb: {
    chainId: `0x${Number(0xf6).toString(16)}`,
    chainName: "EnergyWeb",
    nativeCurrency: {
      name: "EnergyWeb",
      symbol: "EWT",
      decimals: 18
    },
    rpcUrls: ["https://rpc.energyweb.org/"],
    blockExplorerUrls: ["https://explorer.energyweb.org/"]
  },
  volta: {
    chainId: `0x${Number(73799).toString(16)}`,
    chainName: "Volta",
    nativeCurrency: {
      name: "Volta",
      symbol: "VT",
      decimals: 18
    },
    rpcUrls: ["https://volta-rpc.energyweb.org/"],
    blockExplorerUrls: ["https://volta-explorer.energyweb.org/"]
  }
};

const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName]
        }
      ]
    });
  } catch (err) {
    setError(err.message);
  }
};

export default function App() {
  const [error, setError] = useState();

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  return (
    <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
      <main className="mt-4 p-4">
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          Force MetaMask network
        </h1>
        <div className="mt-4">
          <button
            onClick={() => handleNetworkSwitch("energyweb")}
            className="mt-2 mb-2 btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Switch to EnergyWeb
          </button>
          <button
            onClick={() => handleNetworkSwitch("volta")}
            className="mt-2 mb-2 bg-warning border-warning btn submit-button focus:ring focus:outline-none w-full"
          >
            Switch to Volta
          </button>
          <ErrorMessage message={error} />
        </div>
      </main>
    </div>
  );
}
// JavaScript Document
