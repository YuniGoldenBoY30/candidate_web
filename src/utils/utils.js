export function backURL() {
  return "localhost:8000/v1/api/";
}

export function picturesURL() {
  //Esto devuelve la ruta relativa de la foto. Para no depender de si estoy desplegando o no
  if (backURL().includes("127.0.0.1")) {
    return "localhost:8000/v1/api/";
  }
  // return "https://91home-001.azurewebsites.net";
}
