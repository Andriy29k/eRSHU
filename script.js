// const sumbitButton = document.getElementById("sumbit");
// const url = "http://tunetc.ddns.net/api/fmi_schedule/3/%D0%86%D0%9F%D0%97-31";
const specialty_url = "http://tunetc.ddns.net/api/fmi_schedule/all_specialty";
// async function fetchHandler() {
//   try {
//     const response = await fetch(url);
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// }
// sumbitButton.addEventListener("click", function () {
//   fetchHandler();
// });
// const select = document.getElementById("group");
// Отримайте посилання на елементи <select>
const courseSelect = document.getElementById("course");
const groupSelect = document.getElementById("group");

fetch(specialty_url) // Замість "data.json" вкажіть URL вашого JSON-файлу
  .then(response => response.json())
  .then(data => {
    // data - це ваш JSON-об'єкт

    // Отримайте ключі JSON-об'єкта (кореспондують курсам) і додайте їх до вибору "course"
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key + " курс"; // Додайте "курс" до назви курсу
        courseSelect.appendChild(option);
      }
    }

    // Обробник події для вибору курсу
    courseSelect.addEventListener("change", () => {
      const selectedCourse = courseSelect.value;
      const groupData = data[selectedCourse];

      // Очистіть вибір групи перед оновленням
      groupSelect.innerHTML = "";

      // Пройдіться по кожному елементу у масиві "groupData" і додайте їх до вибору "group"
      groupData.forEach(group => {
        const option = document.createElement("option");
        option.value = group.specialty;
        option.textContent = group.specialty;
        groupSelect.appendChild(option);
      });
    });

    // Ініціалізуйте вибір курсу за замовчуванням
    courseSelect.dispatchEvent(new Event("change"));
  })
  .catch(error => console.error("Помилка при отриманні JSON: " + error));
