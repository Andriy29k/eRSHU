const courseSelect = document.getElementById("course");
const groupSelect = document.getElementById("group");
const submitButton = document.getElementById("sumbit");

// Отримайте посилання на елемент, де ви будете відображати розклад
const scheduleDisplay = document.getElementById("scheduleDisplay");

let data; // Оголосіть змінну data на рівні модуля

const specialty_url = "http://tunetc.ddns.net/api/fmi_schedule/all_specialty";

fetch(specialty_url)
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;

    // Отримайте ключі JSON-об'єкта (кореспондують курсам) і додайте їх до вибору "course"
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key + " курс";
        courseSelect.appendChild(option);
      }
    }

    // Ініціалізуйте вибір курсу за замовчуванням
    courseSelect.dispatchEvent(new Event("change"));
  })
  .catch(error => console.error("Помилка при отриманні JSON: " + error));

// Оновлений обробник події для вибору курсу
courseSelect.addEventListener("change", () => {
  const selectedCourse = courseSelect.value;
  const groupData = data[selectedCourse];
  groupSelect.innerHTML = "";

  groupData.forEach(group => {
    const option = document.createElement("option");
    option.value = group.specialty;
    option.textContent = group.specialty;
    groupSelect.appendChild(option);
  });
});

// Обробник події для натискання кнопки "sumbit"
submitButton.addEventListener("click", () => {
  const selectedCourse = courseSelect.value;
  const selectedGroup = groupSelect.value;

  // Створіть URL для запиту до API розкладу
  const apiUrl = `http://tunetc.ddns.net/api/fmi_schedule/${selectedCourse}/${selectedGroup}`;

  // Виконайте запит до API та відображайте результат у scheduleDisplay
  fetch(apiUrl)
    .then(response => response.json())
    .then(scheduleData => {
      console.log(scheduleData); // Виведіть JSON у консоль
    })
    .catch(error => {
      console.error("Помилка при отриманні розкладу: " + error);
    });
});
