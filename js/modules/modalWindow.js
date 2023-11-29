function showModal(modalSelector, modalTimerID) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  if (modalTimerID) {
    clearInterval(modalTimerID);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

function generateModalWindow(triggerSelector, modalSelector, modalTimerID) {
  const contactBtns = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  // close modal on click on background
  modal.addEventListener("click", (event) => {
    if (
      event.target === modal ||
      event.target.getAttribute("data-modalClose") == ""
    ) {
      closeModal(modalSelector);
    }
  });
  // close modal on press "Escape"
  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  contactBtns.forEach((btn) =>
    btn.addEventListener("click", () => showModal(modalSelector, modalTimerID))
  );

  function showModalByScroll() {
    {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
      ) {
        showModal(modalSelector, modalTimerID);
        window.removeEventListener("scroll", showModalByScroll);
      }
    }
  }

  window.addEventListener("scroll", showModalByScroll);
}

export default generateModalWindow;
export { closeModal, showModal };
