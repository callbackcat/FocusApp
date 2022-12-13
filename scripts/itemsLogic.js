function buyItem(className, price) {
  let balance = Number(localStorage.getItem("timeInSeconds"));
  let item = document.getElementsByClassName(className);

  if (item[0].classList.contains("active")) {
    iziToast.warning({
      title: "Warning",
      message: "You already bought this item!",
    });
  } else {
    if (balance >= price) {
      localStorage.setItem("timeInSeconds", balance - price);
      if (localStorage.getItem("activeItems")) {
        let activeItems = localStorage.getItem("activeItems");
        activeItems = activeItems + " " + className;
        localStorage.setItem("activeItems", activeItems);
      } else {
        localStorage.setItem("activeItems", className);
      }
      item[0].classList.add("active");
      iziToast.success({
        title: "Success",
        message: "You bought this item!",
      });
    } else {
      iziToast.error({
        title: "Error",
        message: "You don't have enough money!",
      });
    }
  }
}
