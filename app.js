
// class StoreElement{
//     static init() {
      const row = document.querySelector('#row');
      const titleInput = document.querySelector('#title');
      const directorInput = document.querySelector('#director');
      const summaryInput = document.querySelector('#summary');
      const bannerInput = document.querySelector('#banner');
      const releaseDateInput = document.querySelector('#release-date');
      const categoryInput = document.querySelector('#category');
      const idInput = document.querySelector('#id');
      const addBtn = document.querySelector('#add-movie')
      const body = document.querySelector('body');
      let audio = new Audio('scary-laugh.mp3');
      const updateBtn = document.querySelector('#update-movie');
      const filtercategory = document.querySelector('#kategori-sec');

      console.log(filtercategory);
      
//       return {
//         row, 
//         titleInput, 
//         directorInput, 
//         summaryInput, 
//         bannerInput,
//         releaseDateInput,
//         categoryInput,
//         addBtn,
//         body,
//         audio
//       }
//     }
// }






class Movie {
    constructor(title, director, banner, category, summary, releaseDate, date){
        this.title = title;
        this.director = director;
        this.banner = banner;
        this.category = category;
        this.summary = summary;
        this.releaseDate = releaseDate;
        this.date = date;
    }
}

// EVENTS







class Request {
  constructor(url) {
    this.url = url;
  }

    get() {
      return new Promise((resolve, reject) => {
        fetch(this.url)
          .then((response) => response.json())
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      });
    }
    post(data) {
      return new Promise((resolve, reject) => {
        fetch(this.url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      });
    }
    put(id,data) {
      this.url=`${this.url}${id}`;
      return new Promise((resolve, reject) => {
        fetch(this.url, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => resolve(data))
          .catch((err) => reject(err));
          
      });
    }
    delete(id) {
       this.url = `${this.url}${id}`
      return new Promise((resolve, reject) => {
        fetch(this.url, {
          method: "DELETE",

        })
          .then((response) => resolve("Veri Silme Başarılı", response))
          .then(() => {
            this.url= "http://localhost:3000/movie/";
          })
          
          .catch((err) => reject(err));
      });
    }
}

const request = new Request("http://localhost:3000/movie/");


const a = new Date();
let date = `${a.getDate()}-${a.getMonth()+1}-${a.getFullYear()}
${a.getHours()}:${a.getMinutes()}
`;


class UI {
    constructor(){
      this.movies ;
      this.element;
    }

     static async init(){ // başlangıçta çalıştırıyorum
      
      
      // this.element = StoreElement.init();
      await console.log( UI.getMovies());
    
      
      
    }

    
    

    static addMovie() {
      
      const title = titleInput.value.trim()
      const director = directorInput.value.trim();
      const summary = summaryInput.value.trim();
      const banner = bannerInput.value.trim();
      const release = releaseDateInput.value.trim();
      const category = categoryInput.value.trim();
     
      
      console.log(date);
      
      const movie = new Movie(title, director, banner, category, summary, release, date);
      
      if(title === '' || director === '' || summary === '' || banner === '' || release === '' || category=== '' ){
        UI.showAlert('Tüm Alanları Doldurun!', 'danger')
        audio.play();

      }else{
        row.innerHTML='';
        request.post(movie)
        .then((data) => (data))
        .then(() =>{
          // row.innerHTML = '';
          UI.getMovies();  //bu değişecek
          UI.resetForm();
          UI.showAlert("Film Ekleme Başarılı", 'success')
        } )
        .catch((err) => console.log(err));
      }
    }
    
    static getMovies() {
      let films = [];
     
      request
      .get()
      .then((data) => {
        data.forEach((item) => {
          films.push(item);
          console.log('films', films);
          
         
         
          // UI.addMovieUi(item.title, item.summary,  item.director, item.releaseDate ,item.date, item.category, item.banner, item.id);
          
        })
        
        return films;
      })
      .catch((err) => console.log(err));


      
      
    }

    static deleteMovie(id){
     
      request.delete(id)
      .then((msg) => console.log(msg))
      .then(() => {
        // row.innerHTML=''; //sayfayı sil tekrar çek
        // UI.getMovies(); // buraya bak
      })
      .catch((err) => console.log(err));
      
   }

   static updateMovie(id){
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    let title = titleInput.value ;
    let director =  directorInput.value;
    let summary =  summaryInput.value ;
    let banner =  bannerInput.value ;
    let releaseDate =  releaseDateInput.value;
    let category =  categoryInput.value;
    let filmid = idInput.value;
     const movie = {title, director, summary, banner, releaseDate, category, date}
     console.log(movie);
     
    request.put(filmid, movie)
    .then(() => {
      UI.showAlert('Film güncellendi', 'success');
      
      UI.getMovies(); // çalışmıyor çalışırsa ui'a ekstra fil yazdırır. önlemek için yukarda ui temizlesi yapılailir
    })

   }

   

   static addMovieUi(mtitle, msummary, mdirector, mreleaseDate, mdate, mcategory, mbanner, mid) {
     
    let col = document.createElement("div");
          col.className = "card col-xl-3 col-lg-4 col-md-6 my-3 p-sm-4 bg-transparent ";
          col.innerHTML = `<img class="card-img-top rounded-4  banner" data-bs-toggle="modal" data-bs-target="#modal${mid}" src="${mbanner}" alt="Card image cap">
          <div class="card-body text-warning">
            <h5 class="card-title title">${mtitle}</h5>
            <p class="card-text summary">${msummary}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item "><span>Director: </span> <span class="director">${mdirector}</span></li>
            <li class="list-group-item "><span>Kategori: </span> <span class="category">${mcategory}</span></li>
            <li class="list-group-item "><span>Release Date:</span> <span class="releaseDate">${mreleaseDate}</span></li>
            <li class="list-group-item d-flex justify-content-around align-items-center">
              <button id="${mid}" type="button" class="btn btn-danger delete">Delete</button>
              <button id="${mid}" type="button" class="btn btn-warning edit">Edit</button>
              <small class="date">${mdate}</small>
            </li>
          </ul>

          
          <div class="modal fade " id="modal${mid}" tabindex="-1" aria-labelledby="movie" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-info">
                <h1 class="modal-title fs-5 text-warning" id="movie">${mtitle}</h1>
                <button type="button" class="btn-close bg-warning" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body bg-info text-white">
                <div class='d-flex justify-content-center'>
                <img class="img img-fluid w-75  rounded-4"" src="${mbanner}" alt="">
                </div>
                <div class="mt-3 ps-3">
                  <p class='fs-2 text-warning shadow'>Summary</p><p>${msummary}</p>
                </div>
                <ul class="list-group list-group-flush ">
                  <li class="list-group-item"><span class="">Director: </span><span class="">${mdirector}</span></li>
                  <li class="list-group-item"><span class="">Category: </span><span class="">${mcategory}</span></li>
                  <li class="list-group-item"><span class="">Release Date: </span><span class="">${mreleaseDate}</span></li>
                </ul>
                <small class="ms-3">Date: ${mdate}</small>
              </div>
              <div class="modal-footer bg-info">
                <button type="button" class="btn btn-danger " data-bs-dismiss="modal">Close</button>
                
              </div>
            </div>
          </div>
        </div>
          
          `;
          
          row.appendChild(col);
          
          
    }


    static resetForm(){
      titleInput.value ='';
      directorInput.value ='';
      summaryInput.value ='';
      bannerInput.value ='';
      releaseDateInput.value ='';
      categoryInput.value ='';
    }

    static showAlert(message, type){
      const div = document.createElement("div");
      div.className = `row alert alert-${type}`;
      div.innerHTML = ` <div class="col-8 mx-auto fs-2 d-flex justify-content-around align-items-center ">
      <img class="img-fluid col-2 " src="./images/joker.png" alt="">
      ${message}
      <img class="img-fluid col-2 " src="./images/joker.png" alt="">
    </div>`;

    body.insertBefore(div, body.children[2]);
    setTimeout(function () {
      div.remove();
    }, 2000);
    }

    // filter
    static filter(e) {
      const filtercategory = row.querySelectorAll('.category');
   
      const filterValue = e.target.value.toLowerCase();

      UI.filterCategoryUI(filtercategory, filterValue)
    }

    static filterCategoryUI(filtercategory, filterValue){
        filtercategory.forEach((item) => {
          const text = item.innerHTML.toLowerCase();
          if(filterValue === 'all'){
            item.parentElement.parentElement.parentElement.setAttribute("style", "display:table-row");
          }else{
            if (text.indexOf(filterValue) === -1) {
              item.parentElement.parentElement.parentElement.setAttribute("style", "display:none !important");
            } else {
              item.parentElement.parentElement.parentElement.setAttribute("style", "display:table-row");
            }
          }
          
        })
    }
}



let id;
function deleteMov(e){
  
 if(e.target.classList.contains('delete')){
  e.target.parentElement.parentElement.parentElement.remove();
  id = e.target.id;
  console.log(id);
  UI.deleteMovie(id);

 }
}


function updateMov(e){
  if(e.target.classList.contains('edit')){
  
    updateBtn.classList.remove('d-none')
    addBtn.classList.add('d-none')
  
    id = e.target.id;
   
    let movie = e.target.parentElement.parentElement.parentElement;
    let movieTitle = movie.querySelector('.title');
    let movieDirector = movie.querySelector('.director');
    let movieBanner = movie.querySelector('.banner');
    let movieSummary = movie.querySelector('.summary');
    let movieReleaseDate = movie.querySelector('.releaseDate');
    let movieCategory = movie.querySelector('.category');
    
    console.log(movie, movieReleaseDate, movieCategory);
    titleInput.value= movieTitle.textContent;
    directorInput.value = movieDirector.textContent;
    summaryInput.value = movieSummary.textContent;
    bannerInput.value = movieBanner.src;
    releaseDateInput.value = movieReleaseDate.textContent;
    categoryInput.value = movieCategory.textContent;
    idInput.value = id;
    
  }
}

window.addEventListener('DOMContentLoaded', UI.init);
addBtn.addEventListener('click', UI.addMovie);
row.addEventListener('click',  deleteMov);
row.addEventListener('click',  updateMov)
updateBtn.addEventListener('click', UI.updateMovie)
filtercategory.addEventListener('change', UI.filter)