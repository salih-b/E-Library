async function main(){
    let loading = document.querySelector('.books__loading');
    const id = localStorage.getItem("id");
    console.log("DETAIL ID", id);

    const detailWrapper = document.querySelector('.book__details');
    console.log("BOOK DETAIL EXIST", detailWrapper);
    let book;

    if (!book) {
        loading.style.display = "flex";
        book = await getBook(id);
    
        console.log('BOOK ---> ', book);
        book = {
                id: id,
                title: book.volumeInfo.title,
                url: book.volumeInfo.imageLinks.smallThumbnail,
                originalPrice: book.volumeInfo.pageCount,
                salePrice: Number(book.volumeInfo.publishedDate.slice(0,2)),
                rating: book.volumeInfo.averageRating,
                description: book.volumeInfo.description
          }
          if (book.title === "Yoga Journal"){
            book.url = 'assets/atomic habits.jpg'
          }
    
        loading.style.display = "none";
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

//   RENDER HTML
  let bookHTML = 
    `<div class="book" onclick="showBookDetail('${book.id}')" style="width:80%; display:flex; flex-direction: column; align-items: center;;">
    <figure class="book__img--wrapper">
    <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
    ${book.title}
    </div>
    <div class="book__ratings">
    ${rate(book.rating)}
    </div>
    <div class="book__price">
      <span class="book__price--normal">$${(book.originalPrice).toFixed(2)}</span> $${(book.salePrice).toFixed(2)}
      </div>
      <div>
        <h3>Description:</h3>
        <p>${book.description}</p>
      </div>
      </div>`;
  
  detailWrapper.innerHTML = bookHTML;
}

async function getBook(id) {
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
    const response = await fetch(url);
    const json = await response.json();
  
    console.log("JSON -->", json);
    return json;
  
  }


main()