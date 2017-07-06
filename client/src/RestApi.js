const RestApi = {
  postNewNote(state) {

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if ((xhr.readyState === 4) && (xhr.status >= 500)) {
          console.log("Rottnote server error. Be sure to start the rottnote development environment by doing 'npm install' and 'npm start' at the TOP level! 'npm start' at TOP level will start webpack dev server to port 3000 and Node API backend to port 3001. NOTE: to avoid any CORS issues, the webpack dev server (at port 3000) is configured to proxy all requests to the '/notes' endpoint to the Node API backend (i.e. to port 3001)");
        }
    };
    xhr.open("POST", "notes", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(state));
  }
}

export default RestApi;
