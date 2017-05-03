/* eslint-disable no-undef */

function get(cb) {
  return fetch('api/newcomers/topten', {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // TODO => deal with it!
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Stories = {get};
export default Stories;
