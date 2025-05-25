// Инициализация фильтра при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  filterSelection("all");
});

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  
  // Сначала скрыть все элементы
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    x[i].style.display = "none";
  }
  
  // Показать только соответствующие фильтру элементы
  for (i = 0; i < x.length; i++) {
    if (x[i].className.indexOf(c) > -1 || c === "") {
      w3AddClass(x[i], "show");
      x[i].style.display = "flex"; // или "block" в зависимости от вашей верстки
    }
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Добавить активный класс к текущей кнопке
var btnContainer = document.getElementById("myBtnContainer");
if (btnContainer) {
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
      }
      this.className += " active";
    });
  }
}
