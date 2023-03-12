import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ConnectWallet from "./ConnectWallet";
import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

function App() {
  const [ethereum, setEthereum] = React.useState<Web3 | undefined>();

  useEffect(() => {
    const initEthereum = async () => {
      const provider: any = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        setEthereum(web3);
      }
    };
    initEthereum();
  }, []);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ethereum) {
      console.error("Metamask not detected");
      return;
    }
    const accounts = await ethereum.eth.getAccounts();
    const tx = {
      from: accounts[0],
      to: recipientAddress,
      value: ethereum.utils.toHex(ethereum.utils.toWei(amount, "ether")),
      data: ethereum.utils.asciiToHex(message),
    };
    const result = await ethereum.eth.sendTransaction(tx);
    console.log(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ConnectWallet />

        <div>
          <form onSubmit={handleSend}>
            <label>
              Recipient address:
              <input
                type="text"
                value={recipientAddress}
                onChange={(event) => setRecipientAddress(event.target.value)}
              />
            </label>
            <label>
              Amount:
              <input
                type="text"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </label>
            <label>
              Message:
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </label>
            <button type="submit">Send</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
