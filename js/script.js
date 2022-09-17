//Array for Storing slider image

let container = [];

const slider = [];

const likedPostsArray = [];

let slideIndex = 0;

let reportedPost =[]


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

//press Enter keyword Button  for search

const searchBtn = document.getElementById("search-btn");
const inputValue = document.getElementById("input-box");

inputValue.addEventListener("keypress", (event)=>{

    if (event.key == 'enter'){

       showDetails();

    }

});


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

  const inputElement = getElement("input-box");

  inputElement.value = "";

  if (value == "") {

    showSpinner("spinner", "block");

    const sliderInputForm =getElement("slider-input-form");

     sliderInputForm.style.display = "none"

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

    const sliderInputForm =getElement("slider-input-form");

    sliderInputForm.style.display = "block"

    showSpinner("spinner", "block");    

    document.getElementById("section").style.display = "none";

    const ErrorSectionParent = getElement("Error-section-parent");

    ErrorSectionParent.textContent = "";

    

    const key = "29904037-6defd6b3ede3a43969408b236";

    const url = `https://pixabay.com/api/?key=${key}&q=${value}&image_type=photo&pretty=true`;

    fetch(url)
      .then((Response) => Response.json())
      .then((data) =>displayPicture(data.hits))
      .catch((error) => console.log(error));

       
      setTimeout(() => {

        showSpinner("spinner", "none");
    
        document.getElementById("section").style.display = "block";

      }, 400);
  }
};

//show picture

//important note  onclick=selectItem(event,"${element.webformatURL}")

const displayPicture = (data) => {

  const showImgParent = getElement("show-img-section-parent");

  showImgParent.textContent=''

   container = [...data];

  data.forEach((element) => {

    const Div = document.createElement("div");
    Div.setAttribute("class", "col ");
    Div.innerHTML = `
      
      <div class="card h-100"> 
      <img src="${element.webformatURL}" class="card-img-top img-fluid h-100" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center text-dark fw-light">${element.tags.toUpperCase()}</h5>
        <p class="card-text"></p>
      </div>
      <div class="card-footer d-flex justify-content-between">  
           
          <div class="d-flex ">

          <li onclick = addToLike(event,"${element.id}") class="ms-0 cursor-style">
          <i class="fa-solid fa-heart"></i>
          </li>

            <li class="ms-5 text-lighter  cursor-style"><i class="fa-solid fa-comment"></i> ${element.comments}</li> 

          </div>
            <li onclick =reportImage("${element.id}") class=" cursor-style" ><i class="fa-solid fa-eye-slash text-dark"></i></li>
            
      </div>

      <div class="card-footer">  
           
          <div class="d-grid gap-2" >
          <button onclick=selectItem(event,"${element.largeImageURL}") class="btn btn-primary" type="button">Select Image</button> 
          </div>
                
      </div>

      `;

    const parent = getElement("show-img-section-parent");

    parent.appendChild(Div);
  });
};

// ${
//   isLIked(element.id) && 'text-danger'
// }"

const selectItem =(event,img)=>{

    const element = event.target;

    element.setAttribute("class","selected");

    element.innerHTML ="Selected"

    const imgForSlider = img;

    console.log(img);

    const item = slider.indexOf(img);

    if (item === -1) {

      slider.push(img);
      
    }
    else{

      alert("This picture Already Added")

    }


}

const createSliderButton = getElement("create-slider-btn");

createSliderButton.addEventListener("click",(event)=>{

   event.preventDefault();

   createSlider();

   const MainElement =document.getElementById("img-section");

   MainElement.style.display ="none"

})

const createSlider =() =>{

  const sliderParent =getElement("slider-expand");

  sliderParent.textContent = '';

   const duration = document.getElementById("slider-input-box").value ||1000;

   if (duration<1000) {

    alert ('Please Put a positive value')

    return
    
   }
    slider.forEach(element => {

      const div =document.createElement("div");
    
      div.setAttribute("class","slider-item")

      div.innerHTML =`

      <img src="${element}" class="img-thumbnail" alt="...">

      `
      sliderParent.appendChild(div)

      
    });


   changeSlide(0)
    
   const timer = setInterval(() => {

       slideIndex++;

       changeSlide(slideIndex)

      
    },duration);

}


const changeSlide =(index)=>{

     

    const itemsNode = document.querySelectorAll(".slider-item");

    if (index>=itemsNode.length) {

        slideIndex = 0;

        index =0;
      
    }
    
    
    itemsNode.forEach(item =>{

       item.style.display = 'none';

    })

    itemsNode[index].style.display = "block"

}

// const isLIked = (id) => {



//    console.log(likedPostsArray.length); 
//    console.log(likedPostsArray.includes(id));

// }

const addToLike=(event,id)=>{

  console.log("The add to like id type is",typeof id);

  likedPostsArray.push(id)

  const tag = event.target;

  tag.setAttribute("class","fa-solid fa-heart text-danger")

} 


const reportImage =(id) =>{

     reportedPost.push(id)

     const remainingPicture =container.filter(element=>{

             if (!reportedPost.includes(element.id.toString())) {

              return element;
   
             }
            

     })

     displayPicture(remainingPicture)


}






  




