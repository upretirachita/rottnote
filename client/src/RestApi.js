const RestApi = {
  postNotes(state) {
    fetch("notes", {
      method: "POST",
      headers: {
        "Accept": "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(state)
    });
  },

  fetchNotes(userEmail, notesFetched) {
    const url = "notes/" + userEmail;
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => notesFetched(data.notes)
    );
  }
}

export default RestApi;
