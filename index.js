function openMenu(){
    console.log("Opening...", document.body.classList);
    document.body.classList += " menu--open"
    console.log("Result-->", document.body.classList);
}

function closeMenu(){
    console.log("Closing...");
    document.body.classList.remove('menu--open') 
}