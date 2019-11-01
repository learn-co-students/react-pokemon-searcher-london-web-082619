const BASE_URL = `http://localhost:4000/pokemon`

const getAllPokemon = () => {
  return fetch(BASE_URL)
    .then(objectify);
}

const postPokemon = newPokemon => {
  const config = getConfigWithBody("POST", newPokemon)
  return fetch(BASE_URL, config)
    .then(objectify);
}

const objectify = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`HTTP status code ` + res.status);
  }
}

const getConfigWithBody = (method, body) => {
  const config = getBaseConfig(method);
  config.body = JSON.stringify(body);
  return config;
}

const getBaseConfig = method => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
}

export default {
  getAllPokemon: getAllPokemon,
  postPokemon: postPokemon
}