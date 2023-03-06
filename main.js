let btn = document.querySelector("button");
let input = document.querySelector("input");
let result = document.querySelector(".result");
let searchRepo = document.getElementById("search-repo");
let search = document.querySelector(".search");

btn.onclick = function () {
  result.innerHTML = "";
  if (input.value != "") {
    fetcApi(input.value);
  }
};

search.onclick = function () {
  result.innerHTML = "";
  fetch(`https://api.github.com/users/${input.value}/repos`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let filterdArray = data.filter((data) => {
        return data.name.includes(searchRepo.value);
      });
      showingData(filterdArray);
    });
};

function fetcApi(api) {
  fetch(`https://api.github.com/users/${api}/repos`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      showingData(data);
    });
}
function showingData(array) {
  array.forEach((name) => {
    let mainDiv = document.createElement("div");
    let p = document.createElement("p");
    let div = document.createElement("div");
    let span = document.createElement("span");
    let a = document.createElement("a");
    p.append(name.name);
    span.append(`${name.watchers} Stars`);
    a.append("visit");
    a.href = `https://github.com/${input.value}/${name.name}`;
    a.setAttribute("target", "_blank");
    mainDiv.append(p);
    div.append(span);
    div.append(a);
    mainDiv.append(div);
    result.append(mainDiv);
  });
}
