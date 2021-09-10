//Search form function
function searchForm(array) {
  const header = document.querySelector('.header');
  header.innerHTML = ''
  let formContent = `
    <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name..."">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>
    `
  header.insertAdjacentHTML('beforeend', formContent);
  let form = document.getElementById('search');
  //event listener for click
  header.addEventListener('click', (e) => {
    let clicker = e.target;
    const input = document.querySelector('input');
    const label = document.querySelector('label');
    const inputText = label.querySelector('input');
    //conditionals for clicks and for searching user names
    if (clicker.type === 'button' || clicker.tagName === 'IMG') {
      let formValue = form.value.toLowerCase();
      let searchArray = [];
      for (let i = 0; i < array.length; i++) {
        if (data[i].email.includes(formValue)) {
          input.style.backgroundColor = '';
          searchArray.push(data[i]);
          console.log(searchArray);
          addPadination(searchArray);
          showPage(searchArray, 1);
          input.value = '';
          inputText.placeholder = 'Search by name...';
        };
      }
      //conditional to add a 'no results found' message using CSS and placeholder text
      if (searchArray.length === 0) {
        input.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        input.value = '';
        inputText.placeholder = 'No results found...';
        showPage(searchArray, 1);
        addPadination(searchArray);
      }
    }
  })
}

//ShowPage function will display 9 user profiles
function showPage(list, page) {
  const startIndex = (page * 9) - 9;
  const endIndex = page * 9;
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';
  // loop over the length of the `list` parameter
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      //template literal containing html and data extracted from data array
      let studentItem = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">${list[i].registered.date}</span>
          </div>
        </li>
      `
      studentList.insertAdjacentHTML('beforeend', studentItem);
    }
  }
};

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPadination(list) {
  const numOfPages = Math.ceil(list.length / 9 )
  let linkList = document.querySelector('.link-list')
  linkList.innerHTML = '';
  for (let i = 1; i <= numOfPages; i++) {
    let button = `
            <li>
              <button type="button">${i}</button>
            </li>
            `
    linkList.insertAdjacentHTML('beforeend', button);
  }
  document.querySelector('button').className = 'active';

//Event listener for page numbers
  linkList.addEventListener('click', (e) => {
    target = e.target;
    if (target.type === 'button') {
      document.querySelector('.active').className = '';
      target.className = 'active';
      showPage(list, target.textContent);
    }
  });
}


// Call functions
addPadination(data);
showPage(data, 1);
searchForm(data);
