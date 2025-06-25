const URL = "http://localhost:4000";

const notyf = new Notyf({
  duration: 1000,
  position: {
    x: "right",
    y: "top",
  },
});

function fetchAllBatches() {
  return fetch(`${URL}/batch/all`, {
    method: "GET",
    // headers: {
    //   token: localStorage.getItem("token"),
    // },
  })
    .then((response) => response.json())
    .then((data) => {
      debugger;
      return data;
    });
}
