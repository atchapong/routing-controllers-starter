import JSEncrypt from 'node-jsencrypt'

const EncryptData = (message: string): any => {
  if (message) {
    try {
      const publicKey = process.env.ENCRYPT_PUBLICKEY || false;
      if(!publicKey) throw new Error(`Key not found`);

      const encrypt = new JSEncrypt();
 
      encrypt.setPublicKey(publicKey);
      console.log(encrypt.encrypt(message))
      return encrypt.encrypt(message)
    } catch (err) {
      return err;
    }
  } else {
    throw new Error(`Cannot Encrypt with Message`);
  }
}

const DecryptData = (hash: string): any => {
  if (hash) {
    try {

      const privateKey = process.env.ENCRYPT_PRIVATEKEY || false;
      if(!privateKey) throw new Error(`Key not found`);

      const decrypt = new JSEncrypt();
      decrypt.setPrivateKey(privateKey);
      return decrypt.decrypt(hash)
    } catch (err) {
      return err;
    }
  } else {
throw  new Error(`Wrong Encrypt Key`);
  }
}


export {
  EncryptData,
  DecryptData
}
