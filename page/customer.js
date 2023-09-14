// Fetch data from the server and populate select elements
async function fetchDataAndDisplay() {
  try {
    const response = await fetch('/customer/data');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    const nationalitySelect = document.getElementById('CountryList');
    const residenceSelect = document.getElementById('Residence');
    const commCountrySelect = document.getElementById('Comm_Country');
    const permCountrySelect = document.getElementById('Perm_Country');
    const EmpCountrySelect = document.getElementById('Emp_Country');
    const PlaceCountrySelect = document.getElementById('Place_of_Birth');

    // Clear any existing options
    nationalitySelect.innerHTML = '';
    residenceSelect.innerHTML = '';
    commCountrySelect.innerHTML = '';
    permCountrySelect.innerHTML = '';
    EmpCountrySelect.innerHTML = '';
    PlaceCountrySelect.innerHTML = '';

    // Populate both select elements
    data.forEach(countryDescription => {
      const option = document.createElement('option');
      option.value = countryDescription;
      option.textContent = countryDescription;
      nationalitySelect.appendChild(option);
      residenceSelect.appendChild(option.cloneNode(true)); // Clone for Residence
      commCountrySelect.appendChild(option.cloneNode(true)); // Clone for comm_country
      permCountrySelect.appendChild(option.cloneNode(true)); // Clone for perm_country
      EmpCountrySelect.appendChild(option.cloneNode(true)); // Clone for emp_country
      PlaceCountrySelect.appendChild(option.cloneNode(true)); // Clone for emp_country
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the fetchDataAndDisplay function when the page loads
document.addEventListener('DOMContentLoaded', fetchDataAndDisplay);

// Fetch and populate the Emp_Village select element
async function fetchAndDisplayVillage() {
  try {
    const response = await fetch('/customer/villages');
    if (!response.ok) {
      throw new Error('Failed to fetch villages');
    }

    const data = await response.json();
    const CommVillageSelect = document.getElementById('Comm_Village');
    const PermVillageSelect = document.getElementById('Perm_Village');
    const EmpVillageSelect = document.getElementById('Emp_Village');
    const VillageSelect = document.getElementById('village');

    // Clear any existing options
    CommVillageSelect.innerHTML = '';
    PermVillageSelect.innerHTML = '';
    EmpVillageSelect.innerHTML = '';
    VillageSelect.innerHTML = '';

    // Populate both select elements
    data.forEach(Vilage_List_Description => {
      const option = document.createElement('option');
      option.value = Vilage_List_Description;
      option.textContent = Vilage_List_Description;
      CommVillageSelect.appendChild(option);
      PermVillageSelect.appendChild(option.cloneNode(true)); // Clone for Residence
      EmpVillageSelect.appendChild(option.cloneNode(true)); // Clone for comm_country
      VillageSelect.appendChild(option.cloneNode(true)); // Clone for comm_country
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to fetch and display village data when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayVillage);

async function fetchAndDisplayEconomics() {
  try {
    const response = await fetch('/customer/economics');
    if (!response.ok) {
      throw new Error('Failed to fetch economics');
    }

    const data = await response.json();
    const EconomicsSelect = document.getElementById('Economic_Sub_Sector_Code_ISIC');


    // Clear any existing options
    EconomicsSelect.innerHTML = '';

    // Populate both select elements
    data.forEach(ECONOMIC_SUB_SECTOR_CODE_ISIC_DESC => {
      const option = document.createElement('option');
      option.value = ECONOMIC_SUB_SECTOR_CODE_ISIC_DESC;
      option.textContent = ECONOMIC_SUB_SECTOR_CODE_ISIC_DESC;
      EconomicsSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to fetch and display village data when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayEconomics);

async function fetchAndDisplayOccupations() {
  try {
    const response = await fetch('/customer/occupations');
    if (!response.ok) {
      throw new Error('Failed to fetch occupations');
    }

    const data = await response.json();
    const OccupationsSelect = document.getElementById('Occupation');


    // Clear any existing options
    OccupationsSelect.innerHTML = '';

    // Populate both select elements
    data.forEach(Occupation_Description => {
      const option = document.createElement('option');
      option.value = Occupation_Description;
      option.textContent = Occupation_Description;
      OccupationsSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to fetch and display village data when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayOccupations);



 
function enableDisableFields() {
  var countryType = document.getElementById("CountryList").value;
  var villageInput = document.getElementById("village");

  if (countryType === "Rwanda") {
    villageInput.disabled = false;
  }else {
    villageInput.disabled = true;
  } 
}
document.getElementById("CountryList").addEventListener("change", enableDisableFields);
enableDisableFields();

// JavaScript code
const toggleNav = document.getElementById("toggleNav");
const navList = document.querySelector(".nav-list");

toggleNav.addEventListener("click", () => {
  navList.classList.toggle("show-nav-list");
});

const togglePrime = document.getElementById("togglePrime");
const primeIcons = document.querySelector(".prime-icon");

togglePrime.addEventListener("click", () => {
  primeIcons.classList.toggle("show-prime-icons");
});