document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("biodataForm");

  function clearInputsData() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phnum1").value = "";
    document.getElementById("phnum2").value = "";
    document.getElementById("phnum3").value = "";
    document.getElementById("address1").value = "";
    document.getElementById("address2").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("zipCode").value = "";
    document.getElementById("country").value = "";
    document.getElementById("qualify").value = "";
    document.getElementById("comment").value = "";
  }

  async function getUsersData() {
    const alluserData = await fetch("http://54.202.218.249:9501/api/users")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting the form. Please try again.");
      });
    console.log("AllUserData", alluserData);
    return alluserData;
  }

  const namePattern = /^[A-Za-z\s]+$/;
  const NumPattern = /^[0-9]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const qualifyPattern = /^[A-Za-z.\[\]\(\)\-]+$/;



  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formError = [];

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    console.log("firstName", firstName);

    if (firstName || lastName) {
      if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
        alert(
          "Please enter a valid name without special characters and numbers."
        );
        formError.push('Error in Name');
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        return;
      }
    }

    const email = document.getElementById("email").value;
    if(email){
      if(!emailRegex.test(email)){
        alert(
          "Please enter a valid email address"
        );
        formError.push('Error in email');
      }
    }

    const phnum1 = document.getElementById("phnum1").value; // 4 digit only number
    const phnum2 = document.getElementById("phnum2").value; // 4 digit only number
    const phnum3 = document.getElementById("phnum3").value; // 2 digit only 2

    const validatePhoneNumber = (input, length) => {
      return NumPattern.test(input) && input.length === length;
    };

    if (phnum1 || phnum2 || phnum3) {
      if (
        !validatePhoneNumber(phnum1, 4) ||
        !validatePhoneNumber(phnum2, 4) ||
        !validatePhoneNumber(phnum3, 2)
      ) {
        alert(
          "Please enter phone number only numbers and need to follow 4Digit,4Digit and 2Digit format only"
        );
        formError.push('Error in phnum');
        document.getElementById("phnum1").value = "";
        document.getElementById("phnum2").value = "";
        document.getElementById("phnum3").value = "";
      }
    }

    const phnum = phnum1 + phnum2 + phnum3;
    console.log("phone number", phnum);

    const city = document.getElementById("city").value;
    if (city) {
      if (city.length > 20) {
        alert("City should not exceed to 20 characters");
        formError.push('Error in city');
        document.getElementById("city").value = "";
      }
      if (!namePattern.test(city)) {
        alert("City should only contain alphabet characters");
        formError.push('Error in city');
        document.getElementById("city").value = "";
      }
    }

    const state = document.getElementById("state").value;
    if (state) {
      if (state.length > 20) {
        alert("State should not exceed to 20 characters");
        formError.push('Error in state');
        document.getElementById("state").value = "";
      }
      if (!namePattern.test(state)) {
        alert("State should only contain alphabet characters");
        formError.push('Error in state');
        document.getElementById("state").value = "";
      }
    }

    const zipCode = document.getElementById("zipCode").value;
    if (zipCode) {
      if (zipCode.length > 6 || zipCode.length < 6) {
        alert("Zipcode should not exceed to 6 numberic characters");
        formError.push('Error in zipcode');
        document.getElementById("zipCode").value = "";
      }
      if (!NumPattern.test(zipCode)) {
        alert("Zipcode should not contain alphabets or special characters");
        formError.push('Error in zipcode');
        document.getElementById("zipCode").value = "";
      }
    }

    const country = document.getElementById("country").value;

    if (country) {
      if (country.length > 56) {
        alert("Country should not exceed to 56 characters");
        formError.push('Error in country');
        document.getElementById("country").value = "";
      }
      if (!namePattern.test(state)) {
        alert("Country should only contain alphabet characters");
        formError.push('Error in country');
        document.getElementById("country").value = "";
      }
    }

    const qualify = document.getElementById("qualify").value;
    if (qualify) {
      if (qualify.length > 45) {
        alert("Qualification should not exceed to 45 characters");
        formError.push('Error in qualification');
        document.getElementById("qualify").value = "";
      }
      if (!qualifyPattern.test(qualify)) {
        alert(
          "Qualification should only contain alphabets and . special character"
        );
        formError.push('Error in qualification');
        document.getElementById("qualify").value = "";
      }
    }

    const comment = document.getElementById("comment").value;

    if (comment) {
      if (comment.length > 100) {
        alert("Comment should not exceed to 100 characters");
        formError.push('Error in comment');
        document.getElementById("comment").value = "";
      }
    }

    //api data
    const data = {
      firstName: namePattern.test(firstName) ? firstName : "",
      lastName: namePattern.test(lastName) ? lastName : "",
      email: email,
      phoneNumber:
        validatePhoneNumber(phnum1, 4) &&
        validatePhoneNumber(phnum2, 4) &&
        validatePhoneNumber(phnum3, 2)
          ? phnum1 + phnum2 + phnum3
          : "",
      address1: document.getElementById("address1").value,
      address2: document.getElementById("address2").value,
      city: city.length <= 20 && namePattern.test(city) ? city : "",
      state: state.length <= 20 && namePattern.test(state) ? state : "",
      zipCode: zipCode.length <= 6 && NumPattern.test(zipCode) ? zipCode : "",
      country: country.length <= 56 && namePattern.test(country) ? country : "",
      qualification:
        qualify.length <= 45 && qualifyPattern.test(qualify) ? qualify : "",
      comments: comment.length <= 100 ? comment : "",
    };

    console.log("Form_Data", data);

    //POST request Add data
    if (
      data.email &&
      data.email != "" &&
      data.phoneNumber &&
      data.phoneNumber != "" && formError.length == 0
    ) {
      fetch("http://54.202.218.249:9501/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          alert("Form submitted successfully!");
          clearInputsData();
          location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an error submitting the form. Please try again.");
        });
    } else {
      alert(
        "API Call Can't Performed due to missing required field data Ensure validity of data"
      );
    }
  });

  async function getParticularUser(id) {
    try {
      const userData = await fetch(`http://54.202.218.249:9501/api/users/${id}`)
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an error get user details based on id");
        });
      console.log("Particular user Data", userData);
      return userData;
    } catch (error) {
      console.log("Error in getParticularuserAPI", error);
    }
  }

  async function populateTable() {
    const griddata = await getUsersData();
    console.log("gridData", griddata);
    const tableBody = document.getElementById("data-table-body");

    griddata.forEach((item, index) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = item.firstName + item.lastName;

      const emailCell = document.createElement("td");
      emailCell.textContent = item.email;

      const phoneCell = document.createElement("td");
      phoneCell.textContent = item.phoneNumber;

      const editCell = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "ed";
      editButton.addEventListener("click", () => editRow(item.id));
      editCell.appendChild(editButton);

      const deleteCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "ed";
      deleteButton.style.background = "#f00";
      deleteButton.addEventListener("click", () => deleteRow(item.id));
      deleteCell.appendChild(deleteButton);

      const viewCell = document.createElement("td");
      const viewButton = document.createElement("button");
      viewButton.textContent = "View";
      viewButton.className = "ed";
      viewButton.style.background = "#000";
      viewButton.addEventListener("click", () => viewRow(item.id));
      viewCell.appendChild(viewButton);

      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(phoneCell);
      row.appendChild(editCell);
      row.appendChild(deleteCell);
      row.appendChild(viewCell);

      tableBody.appendChild(row);
    });
  }

 
  async function updateUser(id, updatedUserData) {
    try {
      const response = await fetch(
        `http://54.202.218.249:9501/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user.");
      }
      const updateResp = "Data Updated Successfully";
      return updateResp;
    } catch (error) {
      console("Update APi catch error", error);
    }
  }

  function openPopup() {
    document.getElementById("edit-form-popup").style.display = "block";
  }

  function closePopup() {
    document.getElementById("edit-form-popup").style.display = "none";
  }

  async function editRow(item) {
    try {
      const userData = await getParticularUser(item);
      console.log("userData EditRow", userData);
      if (userData) {
        openPopup();
        document.getElementById("edit-firstName").value = userData.firstName;
        document.getElementById("edit-lastName").value = userData.lastName;
        document.getElementById("edit-email").value = userData.email;
        document.getElementById("edit-phnum").value = userData.phoneNumber;
        document.getElementById("edit-address1").value = userData.address1;
        document.getElementById("edit-address2").value = userData.address2;
        document.getElementById("edit-city").value = userData.city;
        document.getElementById("edit-state").value = userData.state;
        document.getElementById("edit-zipCode").value = userData.zipCode;
        document.getElementById("edit-country").value = userData.country;
        document.getElementById("edit-qualify").value = userData.qualification;
        document.getElementById("edit-comments").value = userData.comments;
      }

      const editForm = document.getElementById("editUserForm");
      editForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const error = [];

        // validateFields();
        const firstName = document.getElementById("edit-firstName").value;
        const lastName = document.getElementById("edit-lastName").value;

        if (firstName || lastName) {
          if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
            alert(
              "Please enter a valid name without special characters and numbers."
            );
            error.push("Error in name");
            return;
          }
        }

        const email = document.getElementById("edit-email").value;
        if(email){
          if(!emailRegex.test(email)){
            alert("Please enter valid email address");
            error.push("Error in email");
          }
        }

        const phnum1 = document.getElementById("edit-phnum").value;
        if (phnum1) {
          if (phnum1.length > 10 || phnum1.length < 10) {
            alert("Phone number should be 10 digits");
            error.push("Error in Phnumber");
          }
          if (!NumPattern.test(phnum1)) {
            alert("Phone number should be numbers only");
            error.push("Error in Phonenumber");
          }
        }

        const city = document.getElementById("edit-city").value;
        if (city) {
          if (city.length > 20) {
            alert("City should not exceed to 20 characters");
            error.push("Error in city");
          }
          if (!namePattern.test(city)) {
            alert("City should only contain alphabet characters");
            error.push("Error in city");
          }
        }

        const state = document.getElementById("edit-state").value;
        if (state) {
          if (state.length > 20) {
            alert("State should not exceed to 20 characters");
            error.push("Error in state");
          }
          if (!namePattern.test(state)) {
            alert("State should only contain alphabet characters");
            error.push("Error in state");
          }
        }

        const zipCode = document.getElementById("edit-zipCode").value;
        if (zipCode) {
          if (zipCode.length > 6 || zipCode.length < 6) {
            alert("Zipcode should not exceed to 6 numberic characters");
            error.push("Error in zipcode");
          }
          if (!NumPattern.test(zipCode)) {
            alert("Zipcode should not contain alphabets or special characters");
            error.push("Error in zipcode");
          }
        }

        const country = document.getElementById("edit-country").value;

        if (country) {
          if (country.length > 56) {
            alert("Country should not exceed to 56 characters");
            error.push("Error in country");
          }
          if (!namePattern.test(state)) {
            alert("Country should only contain alphabet characters");
            error.push("Error in country");
          }
        }

        const qualify = document.getElementById("edit-qualify").value;
        if (qualify) {
          if (qualify.length > 45) {
            alert("Qualification should not exceed to 45 characters");
            error.push("Error in qualification");
          }
          if (!qualifyPattern.test(qualify)) {
            alert(
              "Qualification should only contain alphabets and . special character"
            );
            error.push("Error in qualification");
          }
        }

        const comment = document.getElementById("edit-comments").value;

        if (comment) {
          if (comment.length > 100) {
            alert("Comment should not exceed to 100 characters");
            error.push("Error in comment");
          }
        }

        //api data
        const data = {
          firstName: namePattern.test(firstName) ? firstName : "",
          lastName: namePattern.test(lastName) ? lastName : "",
          email: email,
          phoneNumber: phnum1.length <= 10 ? phnum1 : "",
          address1: document.getElementById("edit-address1").value,
          address2: document.getElementById("edit-address2").value,
          city: city.length <= 20 && namePattern.test(city) ? city : "",
          state: state.length <= 20 && namePattern.test(state) ? state : "",
          zipCode:
            zipCode.length <= 6 && NumPattern.test(zipCode) ? zipCode : "",
          country:
            country.length <= 56 && namePattern.test(country) ? country : "",
          qualification:
            qualify.length <= 45 && qualifyPattern.test(qualify) ? qualify : "",
          comments: comment.length <= 100 ? comment : "",
        };

        console.log("EditForm_Data", data);
        console.log("Error array", error);
        if (
          data.email &&
          data.email != "" &&
          data.phoneNumber &&
          data.phoneNumber != "" &&
          error.length == 0
        ) {
          response = await updateUser(item, data);
          console.log("Updateuser Resp", response);
          if (response == "Data Updated Successfully") {
            closePopup();
            location.reload();
          }
        } else {
          alert("API Call Can't Performed due to validation error");
        }
      });
    } catch (error) {
      console.log("catch error in editRow", error);
    }
  }

  async function deleteRow(index) {
    try {
      await fetch(`http://54.202.218.249:9501/api/users/${index}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log("Response Delete", response);
        })
        .then((data) => {
          console.log("Deleted data:", data);
          alert("Row deleted successfully!");
          location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an error deleting the row. Please try again.");
        });
    } catch (error) {
      console.log("Catch error in deleteRow", error);
    }
  }

  async function viewRow(index) {
    try {
      const userData = await getParticularUser(index);
      console.log("userData", userData);
      if (userData) {
        document.getElementById("firstName").value = userData.firstName;
        document.getElementById("lastName").value = userData.lastName;
        document.getElementById("email").value = userData.email;
        document.getElementById("phnum1").value = userData.phoneNumber.slice(
          0,
          4
        );
        document.getElementById("phnum2").value = userData.phoneNumber.slice(
          4,
          8
        );
        document.getElementById("phnum3").value = userData.phoneNumber.slice(
          8,
          10
        );
        document.getElementById("address1").value = userData.address1;
        document.getElementById("address2").value = userData.address2;
        document.getElementById("city").value = userData.city;
        document.getElementById("state").value = userData.state;
        document.getElementById("zipCode").value = userData.zipCode;
        document.getElementById("country").value = userData.country;
        document.getElementById("qualify").value = userData.qualification;
        document.getElementById("comment").value = userData.comments;
        document.getElementById("submitbtn").classList.add("disabled-button");
      }
    } catch (error) {
      console.log("Error in view", error);
    }
  }

  populateTable();
});
