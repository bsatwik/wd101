let user_Form = document.get_Element_By_Id("user-form");

const retrieve_Entries = () => {
  let sath = localStorage.getItem("user-sath");
  if (sath) {
    return JSON.parse(sath);
  } else {
    return [];
  }
};

let userEntries = retrieve_Entries();

const displayEntries = () => {
  const sath = retrieve_Entries();
  
  const table_entries = sath.map((entry) => {
    const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
    const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
    const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
    const date_of_birthCell = `<td class='border px-4 py-2'>${entry.date_of_birth}</td>`;
    const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`;
    const row = `<tr>${nameCell}${emailCell}${passwordCell}${date_of_birthCell}${acceptTermsCell}</tr>`;
    return row;
  }).join("\n");

  const table = `<table class="table-auto w-full">
                  <tr>
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Password</th>
                    <th class="px-4 py-2">date_of_birth</th>
                    <th class="px-4 py-2">Accepted Terms?</th>
                  </tr>
                  ${table_entries}
                </table>`;

  let details = document.get_Element_By_Id("user-sath");
  details.innerHTML = table;
};

const calculateAge = (date_of_birth) => {
  const today = new Date();
  const bd = new Date(date_of_birth);
  let age = today.getFullYear() - bd.getFullYear();
  const monthDiff = today.getMonth() - bd.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < bd.getDate())) {
    age--;
  }
  return age;
};

const save_Form = (event) => {
  event.preventDefault();
  const name = document.get_Element_By_Id("name").value;
  const email = document.get_Element_By_Id("email").value;
  const password = document.get_Element_By_Id("password").value;
  const date_of_birth = document.get_Element_By_Id("date_of_birth").value;
  const acceptedTermsAndconditions = document.get_Element_By_Id("acceptTerms").checked;
  
  // Calculate age and check if it's between 18 and 55
  const age = calculateAge(date_of_birth);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    date_of_birth,
    acceptedTermsAndconditions,
  };
  userEntries.push(entry);
  
  localStorage.setItem("user-sath", JSON.stringify(userEntries));
  displayEntries();
};

userForm.addEventListener("submit", save_Form);
displayEntries();
