$(".store").on("click", function (e) {
  var popup = document.getElementById("popup store");
  popup.setAttribute("open", "true");

  document.getElementById("popup profile").removeAttribute("open");
  document.getElementById("popup help").removeAttribute("open");

  $(".side-bar").removeClass("active");
  $(".menu-btn").css("visibility", "visible");
});
$(".profile").on("click", function (e) {
  var popup = document.getElementById("popup profile");
  popup.setAttribute("open", "true");

  document.getElementById("popup store").removeAttribute("open");
  document.getElementById("popup help").removeAttribute("open");

  $(".side-bar").removeClass("active");
  $(".menu-btn").css("visibility", "visible");
});
$(".help").on("click", function (e) {
  var popup = document.getElementById("popup help");
  popup.setAttribute("open", "true");

  document.getElementById("popup store").removeAttribute("open");
  document.getElementById("popup profile").removeAttribute("open");

  $(".side-bar").removeClass("active");
  $(".menu-btn").css("visibility", "visible");
});
$(".todo").on("click", function (e) {
  var popup = document.getElementById("popup todo");
  popup.setAttribute("open", "true");

  $(".side-bar").removeClass("active");
  $(".menu-btn").css("visibility", "visible");
});

$(document).ready(function () {
  //jquery for toggle sub menus
  $(".sub-btn").click(function () {
    $(this).next(".sub-menu").slideToggle();
    $(this).find(".dropdown").toggleClass("rotate");
  });
  $(".menu-btn").click(function () {
    $(".side-bar").addClass("active");
    $(".menu-btn").css("visibility", "hidden");
  });
});
$(document).mouseup(function (e) {
  var container = $(".side-bar");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $(".side-bar").removeClass("active");
    $(".menu-btn").css("visibility", "visible");
  }
});
