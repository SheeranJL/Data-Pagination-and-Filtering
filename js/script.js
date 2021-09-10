
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/





function searchForm() {
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
    if (clicker.type === 'button' || clicker.tagName === 'IMG') {
      formValue = form.value;
      console.log(formValue);
    }

  })
}




function showPage(list, page) {
  const startIndex = (page * 10) - 10;
  const endIndex = page * 10;
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';
  // loop over the length of the `list` parameter
  for (let i = 0; i < list.length; i++) {
    if (i > startIndex && i < endIndex) {
      //template literal containing html and data extracted from data array
      let studentItem = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src=${data[i].picture.large} alt="Profile Picture">
            <h3>${data[i].name.first} ${data[i].name.last}</h3>
            <span class="email">${data[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">${data[i].registered.date}</span>
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


  linkList.addEventListener('click', (e) => {
    target = e.target;
    if (target.type === 'button') {
      document.querySelector('.active').className = '';
      target.className = 'active';
      showPage(list, target.textContent);
    }
  });
}

addPadination(data);
showPage(data, 1);
searchForm();
// Call functions
