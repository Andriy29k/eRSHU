// const sumbitButton = document.getElementById("sumbit");
// const url = "http://tunetc.ddns.net/api/fmi_schedule/3/%D0%86%D0%9F%D0%97-31";
const specialty_url = "http://tunetc.ddns.net/api/fmi_schedule/all_specialty";
// document.addEventListener("DOMContentLoaded", function () {
//   const facultiesSelect = document.getElementById("faculties");
//   const groupSelect = document.getElementById("group");
//   const courseSelect = document.getElementById("course");

//   const groupsByFaculty = {
//     "ФМІ": {
//       "1": ["М-11","ІПЗ-11", "КН-11","ПМ-11", "І-11", "ЦТ-11"],
//       "2": ["М-21","ІПЗ-21", "КН-21","ПМ-21", "І-21", "ЦТ-21"],
//       "3": ["М-31","ІПЗ-31", "КН-31","ПМ-31", "І-31", "ЦТ-31"],
//       "4": ["М-41","ІПЗ-41", "КН-41","ПМ-41", "І-41", "ЦТ-41"]
//     },
//     "ППФ": {
//       "1": ["Е-11","Г-11", "СХ-11","Б-11", "СБЗ-11", "СПН-11", "СР-11", "СЗ-11", "П-11", "ПП-11", "ФТ-11"],
//       "2": ["Е-21","Г-21", "СХ-21","Б-21", "СБЗ-21", "СПН-21", "СР-21", "СЗ-21", "П-21", "ПП-21", "ФТ-21"],
//       "3": ["Е-31","Г-31", "СХ-31","Б-31", "СБЗ-31", "СПН-31", "СР-31", "СЗ-31", "П-31", "ПП-31", "ФТ-31"],
//       "4": ["Е-41","Г-41", "СХ-41","Б-41", "СБЗ-41", "СПН-41", "СР-41", "СЗ-41", "П-41", "ПП-41", "ФТ-41"]
//     },
//     "ДКМ": {
//       "1": ["Групи ДКМ для 1 курсу"],
//       "2": ["Групи ДКМ для 2 курсу"],
//       "3": ["Групи ДКМ для 3 курсу"],
//       "4": ["Групи ДКМ для 4 курсу"]
//     }
//   };

//   // Функція для оновлення вмісту випадаючого списку
//   function updateDropdown(select, options) {
//     select.innerHTML = "";
//     options.forEach(function (option) {
//       var optionElement = document.createElement("option");
//       optionElement.value = option;
//       optionElement.text = option;
//       select.appendChild(optionElement);
//     });
//   }

//   facultiesSelect.addEventListener("change", updateGroupOptions);
//   courseSelect.addEventListener("change", updateGroupOptions);

//   // Функція для оновлення списку груп
//   function updateGroupOptions() {
//     var selectedFaculty = facultiesSelect.value;
//     var selectedCourse = courseSelect.value;

//     if (selectedFaculty in groupsByFaculty && selectedCourse in groupsByFaculty[selectedFaculty]) {
//       var groups = groupsByFaculty[selectedFaculty][selectedCourse];
//       updateDropdown(groupSelect, groups);
//     } else {
//       groupSelect.innerHTML = "";
//       var defaultOption = document.createElement("option");
//       defaultOption.textContent = "Виберіть спеціальність";
//       groupSelect.appendChild(defaultOption);
//     }
//   }

//   updateGroupOptions();
// });

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
