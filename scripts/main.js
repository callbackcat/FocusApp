TimeMe.initialize({
  currentPageName: "home",
});

window.onload = function () {
  if (localStorage.getItem("activeItems")) {
    var activeElements = localStorage.getItem("activeItems").split(" ");
    for (var i = 0; i < activeElements.length; i++) {
      document
        .getElementsByClassName(activeElements[i])[0]
        .classList.add("active");
    }
  }
  setInterval(function () {
    let timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
    document.getElementById("timeInSeconds").textContent =
      timeSpentOnPage.toFixed(0);
  });
};

window.onbeforeunload = function () {
  localStorage.setItem(
    "timeInSeconds",
    Number(document.getElementById("timeInSeconds").textContent) +
      Number(localStorage.getItem("timeInSeconds"))
  );
};
