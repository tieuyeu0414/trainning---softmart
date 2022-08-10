window.onscroll = function () { myFunction() };
function myFunction() {
  try {
    let header = $(".allow-fixheader").find("thead");
    if (header.length > 0) {
      for (let index = 0; index < header.length; index++) {
        let sticky = header[index].offsetTop;
        if (window.pageYOffset > sticky) {
          header[index].classList.add("sticky");
        } else {
          header[index].classList.remove("sticky");
        }
      }
    }
  } catch (error) { }
}
