function calorieСalc() {
  const result = document.querySelector(".calculating__result span");

  let gender, height, weight, age, activity;

  if (window.localStorage.getItem("gender")) {
    gender = window.localStorage.getItem("gender");
  } else {
    gender = "female";
    window.localStorage.setItem("gender", "female");
  }

  if (window.localStorage.getItem("activity")) {
    activity = window.localStorage.getItem("activity");
  } else {
    activity = 1.375;
    window.localStorage.setItem("activity", activity);
  }

  function calcСalories() {
    if (!gender || !height || !weight || !age || !activity) {
      result.innerHTML = "____";
      return;
    }

    if (gender === "female") {
      result.innerHTML = (
        +(447.6 + 9.2 * +weight + 3.1 * +height - 4.3 * +age) * activity
      ).toFixed(0);
    } else {
      result.innerHTML = (
        +(88.36 + 13.4 * +weight + 3.1 * +height - 5.7 * +age) * activity
      ).toFixed(0);
    }
  }

  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) =>
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-activity")) {
          activity = +e.target.getAttribute("data-activity");
          window.localStorage.setItem("activity", activity);
        } else {
          gender = e.target.getAttribute("id");
          window.localStorage.setItem("gender", gender);
        }

        elements.forEach((item) => item.classList.remove(activeClass));

        e.target.classList.add(activeClass);

        calcСalories();
      })
    );
  }

  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.classList.add("input-error");
      } else {
        input.classList.remove("input-error");
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = input.value;
          break;
      }
      calcСalories();
    });
  }

  function initLocalSetting(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute("id") == localStorage.getItem("gender")) {
        elem.classList.add(activeClass);
      }

      if (
        elem.getAttribute("data-activity") == localStorage.getItem("activity")
      ) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSetting("#gender div", "calculating__choose-item_active");
  initLocalSetting(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );
  calcСalories();
  getDynamicInfo("#height");
  getDynamicInfo("#weight");
  getDynamicInfo("#age");
  getStaticInfo("#gender div", "calculating__choose-item_active");
  getStaticInfo(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );
}

export default calorieСalc;
