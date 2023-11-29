import { closeModal, showModal } from "./modalWindow";
import { postData } from "../services/services";

function implementForms(modalTimerID, formSelector) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "./img/form/spinner.svg",
    success: "Thanks! We will connect with you",
    failure: "something went wrong",
  };

  forms.forEach((form) => bindPostData(form));

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
      `;

      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThankModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThankModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThankModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    showModal(".modal", modalTimerID);

    const thankModal = document.createElement("div");
    thankModal.classList.add("modal__dialog");
    thankModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-modalClose>×</div>
      <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector(".modal").append(thankModal);

    setTimeout(() => {
      thankModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 4000);
  }

  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res));
}

export default implementForms;
