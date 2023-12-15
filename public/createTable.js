const createTable = (data, ignore_Id = false) => {
  const keys = Object.keys(data[0]);

  const filteredKeys = ignore_Id ? keys.filter((key) => key !== "_id") : keys;

  const table = document.createElement("table");
  table.classList.add("mui-table"); // Use add() method to add a class

  const thead = table.createTHead();
  const tbody = table.createTBody();

  const makeHeader = () => {
    const row = document.createElement("tr");
    row.classList.add("course-row"); // Use add() method to add a class
    filteredKeys.forEach((key) => {
      const th = document.createElement("th");
      th.innerText = key;
      row.appendChild(th); // Use appendChild() method to append child elements
    });
    thead.appendChild(row); // Use appendChild() method to append child elements
  };

  makeHeader();

  data.forEach((d) => {
    const row = document.createElement("tr");
    row.dataset.id = d._id;
    row.classList.add("course-row"); // Use add() method to add a class
    filteredKeys.forEach((key) => {
      const td = document.createElement("td");
      td.innerText = d[key];
      row.appendChild(td); // Use appendChild() method to append child elements
    });
    tbody.appendChild(row); // Use appendChild() method to append child elements
  });

  return table;
};

const teacherAddButtons = (table) => {
  const thead = table.querySelector("thead");
  const headerRow = thead.querySelector("tr");
  headerRow.appendChild(document.createElement("th")); // Use appendChild() method to append child elements

  const tbody = table.querySelector("tbody");
  const rows = tbody.querySelectorAll("tr");
  for (let row of rows) {
    const td = document.createElement("td");
    const btns = ["Edit", "Delete"].map((name) => {
      const btn = document.createElement("button");
      btn.innerText = name;
      btn.classList.add("button", "modern-button"); // Use add() method to add classes
      return btn;
    });
    btns[0].onclick = async () => {
      sessionStorage.setItem("teacherId", row.dataset.id);
      window.location.assign(`${window.location.origin}/teacherForm`); // Use template literal for string concatenation
    };
    btns[1].onclick = async () => {
      alert(row.dataset.id);
      axiosDelete(`./api/teacher/${JSON.stringify(row.dataset.id)}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("Teacher deleted successfully");
            // Add code to update your UI or handle the deletion in the client-side
          } else {
            alert("Failed to delete teacher");
          }
        })
        .catch((e) => {
          console.error(e);
          alert("An error occurred while deleting teacher");
        });

      location.reload();
    };
    btns.forEach((btn) => td.appendChild(btn)); // Use appendChild() method to append child elements
    row.appendChild(td); // Use appendChild() method to append child elements
  }
};

const courseAddButtons = (table) => {
  const thead = table.querySelector("thead");
  const headerRow = thead.querySelector("tr");
  headerRow.appendChild(document.createElement("th")); // Use appendChild() method to append child elements

  const tbody = table.querySelector("tbody");
  const rows = tbody.querySelectorAll("tr");
  for (let row of rows) {
    const td = document.createElement("td");
    const btns = ["Edit", "Delete", "Sign Up"].map((name) => {
      const btn = document.createElement("button");
      btn.innerText = name;
      btn.classList.add("button", "modern-button"); // Use add() method to add classes
      return btn;
    });
    btns[0].onclick = async () => {
      sessionStorage.setItem("courseId", row.dataset.id);
      window.location.assign(`${window.location.origin}/courseForm`); // Use template literal for string concatenation
    };
    btns[1].onclick = async () => {
      try {
        const response = await axiosDelete(`../api/course/${JSON.stringify(row.dataset.id)}`);
        if (response.status === 200) {
          alert("Course deleted successfully");
          // Add code to update your UI or handle the deletion in the client-side
        } else {
          alert("Failed to delete course");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while deleting course");
      }
      location.reload();
    };
    btns[2].onclick = async () => {
      try {
        const response = await axiosPut(
          `../api/signUpForCourse`,
          { courseId: row.dataset.id, userId: JSON.parse(localStorage.getItem("User")).token }
        );
        if (response.status === 200) {
          alert("Course Added");
          // Add code to update your UI or handle the deletion in the client-side
        } else {
          alert("Something went wrong signing up for this course!");
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
      location.reload();
    };

    btns.forEach((btn) => td.appendChild(btn)); // Use appendChild() method to append child elements
    row.appendChild(td); // Use appendChild() method to append child elements
  }
};
