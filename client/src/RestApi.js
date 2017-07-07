const RestApi = {
  postNewNote(state) {
    fetch("notes", {
      method: "POST",
      headers: {
        "Accept": "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(state)
    });
  }
}

export default RestApi;
