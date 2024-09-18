async function renderBooks(filter) {
  const booksWrapper = document.querySelector('.books');
  let loading = document.querySelector('.books__loading');
  let books;
  
  
  if (!books) {
    loading.style.display = "flex";
    books = await getBooks()

    books = books.map((e)=>{
      let book = {
            id: e.id,
            title: e.volumeInfo.title,
            url: e.volumeInfo.imageLinks.smallThumbnail,
            originalPrice: e.volumeInfo.pageCount,
            salePrice: Number(e.volumeInfo.publishedDate.slice(0,2)),
            rating: e.volumeInfo.averageRating,
            description: e.volumeInfo.description
      }
      if (e.volumeInfo.title === "Yoga Journal"){
        book.url = 'assets/atomic habits.jpg'
      }

    return book;
  });

    console.log('BOOKS ---> ', books);
    loading.style.display = "none";
  }

  // FOR EVENT LISTENER FILTERING 

  if(filter === "HIGH_TO_LOW"){
    books.sort((a, b)=>{
      return (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice);
    })
  }else if(filter === "LOW_TO_HIGH"){
    books.sort((a, b)=>{
      return (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice);
    })
  }else if(filter === "RATING"){
    books.sort((a, b)=>{
      return b.rating - a.rating;
    })
  }

  // PRINTS STAR RAINGS DEPENDING ON NUM TYPE ARGUMENT
  function rate(rating){
    
    if (!rating){
      // console.log(!rating, rating);
      return ``;
    }
    else if ((rating % 1) === 0) {
      return `<i class="fas fa-star"></i>`.repeat(rating);
    }else {
      const full_stars = (`<i class="fas fa-star"></i>`.repeat(Math.trunc(rating))) + `<i class="fas fa-star-half-alt"></i>`;
      return full_stars
    }
  }

  let booksHTML = books.map(element => {
  let book = 
    `<div class="book" onclick="showBookDetail('${element.id}')">
    <figure class="book__img--wrapper">
    <img class="book__img" style="cursor: pointer;" src="${element.url}" alt="">
    </figure>
    <div class="book__title">
    ${element.title}
    </div>
    <div class="book__ratings">
    ${rate(element.rating)}
    </div>
    <div class="book__price">`;  
    if(element.salePrice === null){
      book +=`$${(element.originalPrice).toFixed(2)}</div>`; 
    }
    else{
      book +=`
      <span class="book__price--normal">$${(element.originalPrice).toFixed(2)}</span> ${(element.salePrice).toFixed(2)}
      </div>`;
    }

    book += `</div>`;
    return book;
  });
  
    booksWrapper.innerHTML = booksHTML.join("");

    return booksWrapper
}

// BOOK DETAIL FNC
function showBookDetail(id){
  // routes to detail page while perserving id
  localStorage.setItem("id", id);
  window.location.href = `${window.location.origin}/detail.html`;
}

// FILTER FNC
function filterBooks(event){
  // console.log(event.target)
  renderBooks(event.target.value);
}

// API 
async function getBooks() {
  const url = "https://www.googleapis.com/books/v1/volumes?q=time&printType=magazines&key=AIzaSyDSjsHv3eeR3hki5pXAutjtkhSOJtacScc";
  const response = await fetch(url);
  const json = await response.json();

  console.log(json.items);
  return json.items;

}
setTimeout(()=>{
  renderBooks();
}, 1000)