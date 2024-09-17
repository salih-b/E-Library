async function renderBooks(filter) {
  const booksWrapper = document.querySelector('.books');
  let loading = document.querySelector('.books__loading');
  let books;
  
  
  if (!books) {
    loading.style.display = "flex";
    books = await getBooks();
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
    if ((rating % 1) === 0) {
      return `<i class="fas fa-star"></i>`.repeat(rating);
    }else {
      const full_stars = (`<i class="fas fa-star"></i>`.repeat(Math.trunc(rating))) + `<i class="fas fa-star-half-alt"></i>`;
      return full_stars
    }
  }

  let booksHTML = books.map(element => {
  let book = 
    `<div class="book">
    <figure class="book__img--wrapper">
    <img class="book__img" src="${element.url}" alt="">
    </figure>
    <div class="book__title">
    ${element.title}
    </div>
    <div class="book__ratings">
    ${element.rating}
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

function filterBooks(event){
  // console.log(event.target)
  renderBooks(event.target.value);
}

// SEED DATA
function getBooks() {
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(
        [
          {
            id: 1,
            title: "Crack the Coding Interview",
            url: "assets/crack the coding interview.png",
            originalPrice: 49.95,
            salePrice: 14.95,
            rating: 4.5,
          },
          {
            id: 2,
            title: "Atomic Habits",
            url: "assets/atomic habits.jpg",
            originalPrice: 39,
            salePrice: null,
            rating: 5,
          },
          {
            id: 3,
            title: "Deep Work",
            url: "assets/deep work.jpeg",
            originalPrice: 29,
            salePrice: 12,
            rating: 5,
          },
          {
            id: 4,
            title: "The 10X Rule",
            url: "assets/book-1.jpeg",
            originalPrice: 44,
            salePrice: 19,
            rating: 4.5,
          },
          {
            id: 5,
            title: "Be Obsessed Or Be Average",
            url: "assets/book-2.jpeg",
            originalPrice: 32,
            salePrice: 17,
            rating: 4,
          },
          {
            id: 6,
            title: "Rich Dad Poor Dad",
            url: "assets/book-3.jpeg",
            originalPrice: 70,
            salePrice: 12.5,
            rating: 5,
          },
          {
            id: 7,
            title: "Cashflow Quadrant",
            url: "assets/book-4.jpeg",
            originalPrice: 11,
            salePrice: 10,
            rating: 4,
          },
          {
            id: 8,
            title: "48 Laws of Power",
            url: "assets/book-5.jpeg",
            originalPrice: 38,
            salePrice: 17.95,
            rating: 4.5,
          },
          {
            id: 9,
            title: "The 5 Second Rule",
            url: "assets/book-6.jpeg",
            originalPrice: 35,
            salePrice: null,
            rating: 4,
          },
          {
            id: 10,
            title: "Your Next Five Moves",
            url: "assets/book-7.jpg",
            originalPrice: 40,
            salePrice: null,
            rating: 4,
          },
          {
            id: 11,
            title: "Mastery",
            url: "assets/book-8.jpeg",
            originalPrice: 30,
            salePrice: null,
            rating: 4.5,
          },
        ]
      )
    })
    }, 1000);
}
setTimeout(()=>{
  renderBooks();
}, 1000)