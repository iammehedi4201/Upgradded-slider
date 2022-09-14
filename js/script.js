// get element

const getElement = (id) => {
  const Element = document.getElementById(id);

  return Element;
};

// get input Value

const getValue = (id) => {
  const value = document.getElementById(id).value;

  return value;
};

// spinner Toggler

// const showSpinner = (id) => {

//   document.getElementById("show-img-section-parent").style.display = 'none'

//   document.getElementById("Error-section-parent").style.display = 'none'

//   const element = getElement(id);

//   element.style.display = "block";

//   const div = document.createElement("div");

//   div.innerHTML = `
//     <div id="spinner" class="loader ">Loading...</div>
//     `;

//   element.appendChild(div);

//   setTimeout(() => {
//     element.style.display = "none";
//   }, 100);

// };

//Show Details about Api

const showSpinner = (id, style) => {

  const element = getElement(id);

  element.style.display = style;
};

const showDetails = () => {

  event.preventDefault();

  const value = getValue("input-box");

  console.log("The value is:",value);

  const inputElement = getElement("input-box");

  inputElement.value = "";

  if (value == "") {

    showSpinner("spinner", "block");

    const showImgParent = getElement("show-img-section-parent");

    showImgParent.textContent = "";

    const ErrorSectionParent = getElement("Error-section-parent");

    ErrorSectionParent.textContent = "";

    ErrorSectionParent.style.display = "none"

    const Div = document.createElement("div");

    Div.innerHTML = `
        <div class="alert alert-warning text-danger text-center w-75 m-auto" role="alert">
              Please Enter Value to Search
        </div>`;

    ErrorSectionParent.appendChild(Div);

 

    setTimeout(() => {

        showSpinner("spinner", "none");
    
        ErrorSectionParent.style.display = "block";

      }, 400);

  } 
  else {
    // const spinnerParent = getElement("spinner");

    // spinnerParent.textContent = "";

    showSpinner("spinner", "block");

    const showImgParent = getElement("show-img-section-parent");

    document.getElementById("section").style.display = "none";

    showImgParent.textContent=''

    const ErrorSectionParent = getElement("Error-section-parent");

    ErrorSectionParent.textContent = "";

    

    const key = "29904037-6defd6b3ede3a43969408b236";

    console.log(value);

    const url = `https://pixabay.com/api/?key=${key}&q=${value}&image_type=photo&pretty=true`;

    fetch(url)
      .then((Response) => Response.json())
      .then((data) => displayPicture(data.hits))
      .catch((error) => console.log(error));

      setTimeout(() => {

        showSpinner("spinner", "none");
    
        document.getElementById("section").style.display = "block";

      }, 400);
  }
};

//show picture

const displayPicture = (data) => {
  data.forEach((element) => {

    console.log(element);

    const Div = document.createElement("div");
    Div.setAttribute("class", "col ");
    Div.innerHTML = `
      
      <div class="card h-100">
      <img src="${element.webformatURL}" class="card-img-top img-fluid h-100" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center text-info fw-bolder">${element.tags.toUpperCase()}</h5>
        <p class="card-text"></p>
      </div>
      <div class="card-footer d-flex justify-content-between">  
           
          <div class="d-flex ">
            <li class="ms-0"><i class="fa-solid fa-house text-dark"></i></li>
            <li class="ms-5"><i class="fa-solid fa-heart text-danger"></i></li>
          </div>
            <li ><i class="fa-solid fa-eye-slash text-dark"></i></li>
            
      </div>

      `;

    const parent = getElement("show-img-section-parent");

    parent.appendChild(Div);
  });
};
