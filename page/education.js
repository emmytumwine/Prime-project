document.addEventListener('DOMContentLoaded', () => {
  // Define the fetchData function
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  // Function to populate a dropdown with options
  function populateDropdown(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = '';

    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.textContent = option;
      dropdown.appendChild(optionElement);
    });
  }

  // Function to fetch ages from the server and populate the dropdown
  async function fetchAges() {
    try {
      const data = await fetchData('/education/Ages');
      populateDropdown('Age', data);
    } catch (error) {
      console.error('Error fetching ages:', error.message);
    }
  }

  // Function to fetch premium frequencies from the server and populate the dropdown
  async function fetchPremiumFrequencies() {
    try {
      const data = await fetchData('/education/premiumFrequencies');
      // Sorting logic for premium frequencies...
      populateDropdown('Premium_Frequency', data);
    } catch (error) {
      console.error('Error fetching premium frequencies:', error.message);
    }
  }

  // Function to fetch contribution years from the server and populate the dropdown
  async function fetchContributionYears() {
    try {
      const data = await fetchData('/education/contributionYears'); 
      populateDropdown('Contribution_Years', data);
    } catch (error) {
      console.error('Error fetching contribution years:', error.message);
    }
  }

  // Function to fetch benefit years from the server and populate the dropdown
  async function fetchBenefitYears() {
    try {
      const data = await fetchData('/education/benefitYears');
      populateDropdown('Benefit_Years', data);
    } catch (error) {
      console.error('Error fetching benefit years:', error.message);
    }
  }

  fetchAges();
  fetchPremiumFrequencies();
  fetchContributionYears();
  fetchBenefitYears();


  const ageDropdown = document.getElementById('Age');
  const premiumFreqDropdown = document.getElementById('Premium_Frequency');
  const contribYearsDropdown = document.getElementById('Contribution_Years');
  const benefitYearsDropdown = document.getElementById('Benefit_Years');
  const premiumAmountInput = document.getElementById('premiumAmount');
  let ratePerMille = null; 

  // Event listeners for dropdown changes
  ageDropdown.addEventListener('change', updateSelectedEndowmentAmounts);
  premiumFreqDropdown.addEventListener('change', updateSelectedEndowmentAmounts);
  contribYearsDropdown.addEventListener('change', updateSelectedEndowmentAmounts);
  benefitYearsDropdown.addEventListener('change', updateSelectedEndowmentAmounts);

  premiumAmountInput.addEventListener('input', () => {
    premiumAmount = parseFloat(premiumAmountInput.value);
    updateSelectedEndowmentAmounts();
  });

  // Function to fetch ratePerMille from the server based on selected values
  async function fetchRatePerMille(selectedValues) {
    const url = `/education/ratePerMille?age=${selectedValues[0]}&premiumFrequency=${selectedValues[1]}&contributionYears=${selectedValues[2]}&benefitYears=${selectedValues[3]}`;
    try {
      const response = await fetch(url);
      const ratePerMilleData = await response.json();
      return ratePerMilleData.ratePerMille;
    } catch (error) {
      console.error('Error fetching ratePerMille:', error);
      throw error;
    }
  }

  async function updateSelectedEndowmentAmounts() {
    const selectedValues = [
      ageDropdown.value,
      premiumFreqDropdown.value,
      contribYearsDropdown.value,
      benefitYearsDropdown.value
    ];

    try {
      ratePerMille = await fetchRatePerMille(selectedValues);

      if (ratePerMille !== null) {
        const premiumAmount = parseFloat(premiumAmountInput.value); // Get premium amount entered by user
        const endowmentAmountAfter = (ratePerMille * premiumAmount) / 1000;
        const endowmentAmountDuring = endowmentAmountAfter / 2;

        const endowmentAmountAfterCell = document.getElementById('endowmentAmountAfter');
        endowmentAmountAfterCell.textContent = endowmentAmountAfter.toFixed(0);

        const endowmentAmountDuringCell = document.getElementById('endowmentAmountDuring');
        endowmentAmountDuringCell.textContent = endowmentAmountDuring.toFixed(0);
      } else {
        const endowmentAmountAfterCell = document.getElementById('endowmentAmountAfter');
        endowmentAmountAfterCell.textContent = 0;

        const endowmentAmountDuringCell = document.getElementById('endowmentAmountDuring');
        endowmentAmountDuringCell.textContent = 0;
      }
    } catch (error) {
      console.error('Error updating endowment amounts:', error.message);
    }
  }
  
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

});


