const accordionList = document.querySelectorAll(".accordion__item");
console.log(itemList)
accordionList.forEach((item) => {
  item.addEventListener("click", () => {
    let content = item.querySelector(".accordion__item_content");

    // content.style.height = 0;
    if (!content.style.height) {
      content.style.height = content.scrollHeight + "px" ;
      item.classList.add('accordion__item--active');
    } else {
      content.style.height = null;
      item.classList.remove('accordion__item--active');
    }
  });
});