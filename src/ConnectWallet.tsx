import * as React from "react";

// import "./styles/App.css";

function ConnectWallet(): JSX.Element {
  const [isMetamaskInstalled, setIsMetamaskInstalled] =
    React.useState<boolean>(false);
  const [ethereumAccount, setEthereumAccount] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    if ((window as any).ethereum) {
      //check if Metamask wallet is installed
      setIsMetamaskInstalled(true);
    }
  }, []);

  //Does the User have an Ethereum wallet/account?
  async function connectMetamaskWallet(): Promise<void> {
    //to get around type checking
    (window as any).ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts: string[]) => {
        setEthereumAccount(accounts[0]);
      })
      .catch((error: any) => {
        alert(`Something went wrong: ${error}`);
      });
  }

  return (
    <div>
      {ethereumAccount !== null && !!isMetamaskInstalled ? (
        <button onClick={connectMetamaskWallet}>
          {ethereumAccount.slice(0, 6) + ".." + ethereumAccount.slice(38, 42)}
        </button>
      ) : isMetamaskInstalled && ethereumAccount === null ? (
        <button onClick={connectMetamaskWallet}>Connect</button>
      ) : (
        <p>Please install wallet</p>
      )}
    </div>
  );
}

export default ConnectWallet;
