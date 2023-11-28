function generateModalWindow() {
  const contactBtns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function showModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerID);
  }
  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  // close modal on click on background
  modal.addEventListener("click", (event) => {
    if (
      event.target === modal ||
      event.target.getAttribute("data-modalClose") == ""
    ) {
      closeModal();
    }
  });
  // close modal on press "Escape"
  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  contactBtns.forEach((btn) => btn.addEventListener("click", showModal));

  const modalTimerID = setTimeout(showModal, 50000);

  function showModalByScroll() {
    {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
      ) {
        showModal();
        window.removeEventListener("scroll", showModalByScroll);
      }
    }
  }

  window.addEventListener("scroll", showModalByScroll);
}

module.exports = generateModalWindow;
