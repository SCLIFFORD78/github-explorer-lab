const user = 'SCLIFFORD78';
const token = 'ac85f60185209ab96b537713631c1d2cbf641a4a';
const creds = `${user}:${token}`;
const auth = btoa(creds);

const options = {
  mode: 'cors',
  headers: {
    'Authorization': 'Basic ' + auth,
  }
}

async function renderRepo(repo) {
  const table = document.getElementById("repo-table");
  const row = table.insertRow(-1);
  const nameCell = row.insertCell(0);
  nameCell.innerHTML = `<a href=${repo.html_url}> ${repo.name} </a>`;
  const descriptionCell = row.insertCell(1);
  descriptionCell.innerText = repo.description;
  const sizeCell = row.insertCell(2);
  sizeCell.innerText = repo.size;
  const response = await fetch(repo.languages_url, options);
  if (response.status != 404) {
    const languages = await response.json();
    const languagesCell = row.insertCell(3);
    languagesCell.innerText = Object.getOwnPropertyNames(languages);
  }
}

function renderAllRepos(repos) {
  for (let i = 0; i < repos.length; i++) {
    renderRepo(repos[i]);
  }
}

async function fetchRepos() {
  clearTable();
  const githubId = document.getElementById("github-id").value;
  const response = await fetch("https://api.github.com/users/" + githubId + "/repos?page=1&per_page=100", options);
  if (response.status != 404) {
    const repos = await response.json();
    if (repos.length ==0){
      const response = 'Github ID does not exist';
      window.alert(response);
    }
    renderAllRepos(repos);
    console.log(repos);
  }
}

function clearTable() {
  const table = document.getElementById("repo-table");
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
}
