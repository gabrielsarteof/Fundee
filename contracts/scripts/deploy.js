// contracts/scripts/deploy.js
require('dotenv').config();
const fs = require('fs');
const { ethers } = require('hardhat');

async function main() {
  // 1️⃣ Quem faz o deploy
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with account:', deployer.address);

  // 2️⃣ Instancia o Factory e faz o deploy
  const GalaxyBayNFT = await ethers.getContractFactory('GalaxyBayNFT');
  const contract = await GalaxyBayNFT.deploy();

  // 3️⃣ Aguarda a confirmação do deploy
  await contract.waitForDeployment();

  // 4️⃣ Busca o endereço e imprime
  const address = await contract.getAddress();
  console.log('Contract deployed at:', address);

  // 5️⃣ (Opcional) grava num JSON para referência
  fs.writeFileSync(
    'deployedAddress.json',
    JSON.stringify({ address }, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
