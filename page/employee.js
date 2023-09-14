document.addEventListener("DOMContentLoaded", function() {
  // Function to enable/disable input fields based on status type
  function enableDisableInputs() {
    var statusType = document.getElementById("statusType").value;
    var numberOfChildrenInput = document.getElementById("numberOfChildren");
    var numberOfDirectParentsInput = document.getElementById("numberOfDirectParents");
    var numberOfDirectParentsInLawInput = document.getElementById("numberOfDirectParentsInLaw");
    var salaryPerMonth = document.getElementById("salaryPerMonth");
    var funeral = document.getElementById("funeral");
    var savings = document.getElementById("savings");
    var sumInsuredSharedToSpouse = document.getElementById("sumInsuredSharedToSpouse");
    var sumInsuredRate = document.getElementById("sumInsuredRate");
    var premiumRate = document.getElementById("premiumRate");

    if (statusType === "select") {
      numberOfChildrenInput.disabled = false;
      numberOfDirectParentsInput.disabled = false;
      numberOfDirectParentsInLawInput.disabled = false;
      salaryPerMonth.disabled = false;
      funeral.disabled = false;
      savings.disabled = false;
      sumInsuredSharedToSpouse.disabled = false;
      sumInsuredRate.disabled = false;
      premiumRate.disabled = false;
    } else if (statusType === "single") {
      numberOfChildrenInput.disabled = true;
      numberOfDirectParentsInput.disabled = false;
      numberOfDirectParentsInLawInput.disabled = true;
      salaryPerMonth.disabled = false;
      funeral.disabled = false;
      savings.disabled = false;
      sumInsuredSharedToSpouse.disabled = true;
      sumInsuredRate.disabled = false;
      premiumRate.disabled = false;
    } else if (statusType === "married") {
      numberOfChildrenInput.disabled = false;
      numberOfDirectParentsInput.disabled = false;
      numberOfDirectParentsInLawInput.disabled = false;
      salaryPerMonth.disabled = false;
      funeral.disabled = false;
      savings.disabled = false;
      sumInsuredSharedToSpouse.disabled = false;
      sumInsuredRate.disabled = false;
      premiumRate.disabled = false;
    } else {
      numberOfChildrenInput.disabled = false;
      numberOfDirectParentsInput.disabled = false;
      numberOfDirectParentsInLawInput.disabled = true;
      salaryPerMonth.disabled = false;
      funeral.disabled = false;
      savings.disabled = false;
      sumInsuredSharedToSpouse.disabled = true;
      sumInsuredRate.disabled = false;
      premiumRate.disabled = false;
    }

    // Call calculateResults to update the values when input fields are enabled/disabled
    calculateResults();
  }

    // Function to enable/disable the calculate button
    function enableDisableCalculateButton() {
      var calculateButton = document.getElementById("calculateButton");
  
      // Check if the salaryPerMonth field is filled
      var salaryPerMonth = document.getElementById("salaryPerMonth").value;
      var isValid = salaryPerMonth !== "";
  
      // Enable or disable the calculate button based on the validity
      calculateButton.disabled = !isValid;
    }
  
    // Attach an event listener to the salaryPerMonth input field
    document.getElementById("salaryPerMonth").addEventListener("input", enableDisableCalculateButton);
  
    // ...
  
    // Call enableDisableCalculateButton initially to disable the button
    enableDisableCalculateButton();
  
  // Attach an event listener to the statusType select element
  document.getElementById("statusType").addEventListener("change", enableDisableInputs);

  document.getElementById("statusType").addEventListener("change", function() {
    // Hide the premium table and cover table
    document.getElementById("premiumTable").style.display = "none";
    document.getElementById("coverTable").style.display = "none";
  });

  // Function to calculate results
  function calculateResults() {

    //declarations starts

    var statusType = document.getElementById("statusType").value;
    var numberOfDirectParents = parseInt(document.getElementById("numberOfDirectParents").value) || 0;
    var numberOfDirectParentsInLaw = parseInt(document.getElementById("numberOfDirectParentsInLaw").value) || 0;
    var numberOfChildren = parseInt(document.getElementById("numberOfChildren").value) || 0;
    var salaryPerMonth = parseInt(document.getElementById("salaryPerMonth").value) || 0;
    var funeral = document.getElementById("funeral").value;
    var savings = document.getElementById("savings").value;
    var sumInsuredSharedToSpouse = document.getElementById("sumInsuredSharedToSpouse").value;
    var sumInsuredRate = parseFloat(document.getElementById("sumInsuredRate").value) || 0;
    var premiumRate = parseFloat(document.getElementById("premiumRate").value) || 0;
    var fees = parseInt(document.getElementById("feesValue").value);
    var lossOfRevenueCover = (salaryPerMonth * sumInsuredRate) * 0.75;
    var savings = document.getElementById("savings").value;

    // Calculate premium for additional children
    var additionalChildren = Math.max(numberOfChildren - 4, 0);
    var childrenMonthlyPremium = additionalChildren * 500;
    var childrenAnnualPremium = additionalChildren * 6000;
    var numberOfDirectParentsMonthly = 0;
    var numberOfDirectParentsAnnual = 0;
    var numberOfDirectParentsInLawMonthly = 0;
    var numberOfDirectParentsInLawAnnual = 0;
    var savingPremiumMonthly = 0;
    var savingPremiumAnnual = 0;
    var totalPremiumMonthly = 0;
    var totalPremiumAnnual = 0;
    var permanentDisabilityCover = 0;
    var permanentDisabilitySpouse = 0;

    // Apply logic on coverages
    var deathCover = 0;
    var deathSpouse = 0;
    var lossOfRevenueCover = 0;
    var lossOfRevenueSpouse = 0;
    var funeralFeeCover = 0;
    var funeralFeeSpouse = 0;

    //declarations ends

    //calculations on premiums starts

    if (statusType === "single") {
      riskPremiumMonthly += 0;
      riskPremiumAnnual += 0;
    } else if (statusType === "married") {
      riskPremiumMonthly += childrenMonthlyPremium;
      riskPremiumAnnual += childrenAnnualPremium;

      // Add premium for direct parents
    if (numberOfDirectParents === 1 || numberOfDirectParents === 2) {
      numberOfDirectParentsMonthly = 2500;
      numberOfDirectParentsAnnual = 2500 * 12;
      riskPremiumMonthly += numberOfDirectParentsMonthly;
      riskPremiumAnnual += numberOfDirectParentsAnnual;
    }

    // Add premium for parents-in-law
    if (numberOfDirectParentsInLaw === 1 || numberOfDirectParentsInLaw === 2) {
      numberOfDirectParentsInLawMonthly = 2500;
      numberOfDirectParentsInLawAnnual = 2500 * 12;
      riskPremiumMonthly += numberOfDirectParentsInLawMonthly;
      riskPremiumAnnual += numberOfDirectParentsInLawAnnual;
    }
    } else {
      riskPremiumMonthly += childrenMonthlyPremium;
      riskPremiumAnnual += childrenAnnualPremium;

      // Add premium for direct parents
      if (numberOfDirectParents === 1 || numberOfDirectParents === 2) {
        numberOfDirectParentsMonthly = 2500;
        numberOfDirectParentsAnnual = 2500 * 12;
        riskPremiumMonthly += numberOfDirectParentsMonthly;
        riskPremiumAnnual += numberOfDirectParentsAnnual;
      }
    }
      // Calculate the funeralFeeMonthly and funeralFeeAnnual based on the value of funeral
      if (funeral === "yes") {
        funeralFeeMonthly = 2416;
        funeralFeeAnnual = 27877;
      } else {
        funeralFeeMonthly = 0;
        funeralFeeAnnual = 0;
      }
    // Calculate payment premium frequency
    var deathMonthly = (fees + (salaryPerMonth * sumInsuredRate) * 4.89 / 12 / 1000) / 0.85;
    var deathAnnual = ((deathMonthly * 12) / 1.04) - 1000;
    var permanentDisabilityMonthly = permanentDisabilityCover * 1.2 / 1000 / 12;
    var permanentDisabilityAnnual = permanentDisabilityMonthly * 12 / 1.04;
    var lossOfRevenueMonthly = lossOfRevenueCover * 0.001 / 12;
    var lossOfRevenueAnnual = (lossOfRevenueMonthly * 12) / 1.04;

 

    var riskPremiumMonthly = deathMonthly + permanentDisabilityMonthly + lossOfRevenueMonthly + funeralFeeMonthly + childrenMonthlyPremium + numberOfDirectParentsMonthly + numberOfDirectParentsInLawMonthly;

    var riskPremiumAnnual = deathAnnual + permanentDisabilityAnnual + lossOfRevenueAnnual + funeralFeeAnnual + childrenAnnualPremium + numberOfDirectParentsAnnual + numberOfDirectParentsInLawAnnual;


    if (savings === "yes") {
     var savingPremiumMonthly = (salaryPerMonth * premiumRate / 100) - riskPremiumMonthly;
     var savingPremiumAnnual = (salaryPerMonth * premiumRate / 100 * 12) - riskPremiumAnnual;
     document.getElementById("savingPremiumMonthly").textContent = isNaN(savingPremiumMonthly) ? "" : savingPremiumMonthly.toFixed(0);
     document.getElementById("savingPremiumAnnual").textContent = isNaN(savingPremiumAnnual) ? "" : savingPremiumAnnual.toFixed(0);
    } else {
     var savingPremiumMonthly = 0;
     var savingPremiumAnnual = 0;
      document.getElementById("savingPremiumMonthly").textContent = isNaN(savingPremiumMonthly) ? "" : savingPremiumMonthly.toFixed(0);
      document.getElementById("savingPremiumAnnual").textContent = isNaN(savingPremiumAnnual) ? "" : savingPremiumAnnual.toFixed(0);
    }

    var totalPremiumMonthly = riskPremiumMonthly + savingPremiumMonthly;
    var totalPremiumAnnual = riskPremiumAnnual + savingPremiumAnnual;



    // Update the premium values in the respective elements
    document.getElementById("riskPremiumMonthly").textContent = isNaN(riskPremiumMonthly) ? "" : riskPremiumMonthly.toFixed(0);
    document.getElementById("riskPremiumAnnual").textContent = isNaN(riskPremiumAnnual) ? "" : riskPremiumAnnual.toFixed(0);
    document.getElementById("savingPremiumMonthly").textContent = isNaN(savingPremiumMonthly) ? "0" : savingPremiumMonthly.toFixed(0);
    document.getElementById("savingPremiumAnnual").textContent = isNaN(savingPremiumAnnual) ? "0" : savingPremiumAnnual.toFixed(0);
    document.getElementById("totalPremiumMonthly").textContent = isNaN(totalPremiumMonthly) ? "" : totalPremiumMonthly.toFixed(0);
    document.getElementById("totalPremiumAnnual").textContent = isNaN(totalPremiumAnnual) ? "" : totalPremiumAnnual.toFixed(0);
    
    //calculations on premiums ends

    //calculations on coverages starts.

    // Calculate funeral fee
    if (funeral === "yes") {
      funeralFeeCover = Math.min(1000000);
      funeralFeeSpouse = Math.min(1000000);
    }else{
      funeralFeeCover = 0;
      funeralFeeSpouse = 0;
    }

    // Display the coverage values in the respective elements
    document.getElementById("lossOfRevenueCover").textContent = isNaN(lossOfRevenueCover) ? "" : lossOfRevenueCover.toFixed(0);
    document.getElementById("lossOfRevenueSpouse").textContent = isNaN(lossOfRevenueSpouse) ? "" : lossOfRevenueSpouse.toFixed(0);
    document.getElementById("deathCover").textContent = isNaN(deathCover) ? "" : deathCover.toFixed(0);
    document.getElementById("deathSpouse").textContent = isNaN(deathSpouse) ? "" : deathSpouse.toFixed(0);
    document.getElementById("funeralFeeCover").textContent = isNaN(funeralFeeCover) ? "" : funeralFeeCover.toFixed(0);
    document.getElementById("funeralFeeSpouse").textContent = isNaN(funeralFeeSpouse) ? "" : funeralFeeSpouse.toFixed(0);

    // Apply logic on spouse shares of coverages
    if (sumInsuredSharedToSpouse === "yes") {
      deathCover = (salaryPerMonth * sumInsuredRate) * 0.6;
      deathSpouse = (salaryPerMonth * sumInsuredRate) * 0.4;
      document.getElementById("deathCover").textContent = isNaN(deathCover) ? "" : deathCover.toFixed(0);
      document.getElementById("deathSpouse").textContent = isNaN(deathSpouse) ? "" : deathSpouse.toFixed(0);

      permanentDisabilityCover = (salaryPerMonth * sumInsuredRate) * 0.6;
      permanentDisabilitySpouse = (salaryPerMonth * sumInsuredRate) * 0.4;
      document.getElementById("permanentDisabilityCover").textContent = isNaN(permanentDisabilityCover) ? "" : permanentDisabilityCover.toFixed(0);
      document.getElementById("permanentDisabilitySpouse").textContent = isNaN(permanentDisabilitySpouse) ? "" : permanentDisabilitySpouse.toFixed(0);

      lossOfRevenueCover = ((salaryPerMonth * sumInsuredRate) * 0.6) * 0.75;
      lossOfRevenueSpouse = 0;
      document.getElementById("lossOfRevenueCover").textContent = isNaN(lossOfRevenueCover) ? "" : lossOfRevenueCover.toFixed(0);
      document.getElementById("lossOfRevenueSpouse").textContent = isNaN(lossOfRevenueSpouse) ? "" : lossOfRevenueSpouse.toFixed(0);
    } else {
      deathCover = salaryPerMonth * sumInsuredRate;
      deathSpouse = 0;
      document.getElementById("deathCover").textContent = isNaN(deathCover) ? "" : deathCover.toFixed(0);
      document.getElementById("deathSpouse").textContent = isNaN(deathSpouse) ? "" : deathSpouse.toFixed(0);

      permanentDisabilityCover = salaryPerMonth * sumInsuredRate;
      permanentDisabilitySpouse = 0;
      document.getElementById("permanentDisabilityCover").textContent = isNaN(permanentDisabilityCover) ? "" : permanentDisabilityCover.toFixed(0);
      document.getElementById("permanentDisabilitySpouse").textContent = isNaN(permanentDisabilitySpouse) ? "" : permanentDisabilitySpouse.toFixed(0);

      lossOfRevenueCover = (salaryPerMonth * sumInsuredRate) * 0.75;
      lossOfRevenueSpouse = 0;
      document.getElementById("lossOfRevenueCover").textContent = isNaN(lossOfRevenueCover) ? "" : lossOfRevenueCover.toFixed(0);
      document.getElementById("lossOfRevenueSpouse").textContent = isNaN(lossOfRevenueSpouse) ? "" : lossOfRevenueSpouse.toFixed(0);
    }

    //calculations on coverages ends

    //Add an event listener for calculating premiums and showing the coverage table
    document.getElementById("calculateButton").addEventListener("click", function(event) {
      event.preventDefault(); // Prevent form submission

      var salary = parseInt(document.getElementById("salaryPerMonth").value);
      if (salary < 300000) {
        alert("Minimum Salary is 300000 RWF!");
        document.getElementById("salaryPerMonth").value = ""; // Clear the input field
        document.getElementById("salaryPerMonth").focus(); // Set focus back to the input field
        return;
      }

        // Hide the premium table and cover table
      document.getElementById("premiumTable").style.display = "none";
      document.getElementById("coverTable").style.display = "none";
  
      // Call calculateResults function to calculate and display the results
      calculateResults();
  
      // Show the premium table and cover table
      document.getElementById("premiumTable").style.display = "block";
      document.getElementById("coverTable").style.display = "block";

      var premiumTable = document.getElementById("premiumTable");
      var coverTable = document.getElementById("coverTable");
      premiumTable.scrollIntoView({ behavior: "smooth" });
      coverTable.scrollIntoView({ behavior: "smooth" });
    });
  }

  const hideButton = document.getElementById("hideButton");
  const premiumTable = document.getElementById("premiumTable");
  const coverTable = document.getElementById("coverTable");

  // Initially, both premium-table and cover-table are visible
  hideButton.style.display = "block";

  // Event listener for hiding the Premium tables
  hideButton.addEventListener("click", function () {
    // Hide both premium-table and cover-table
    premiumTable.style.display = "none";
    coverTable.style.display = "none";
    // hideButton.style.display = "none";
  });

  // Event listener for statusType select element
  document.getElementById("statusType").addEventListener("change", function() {
    // Clear previous inputs
    document.getElementById("numberOfChildren").value = "";
    document.getElementById("numberOfDirectParents").value = "";
    document.getElementById("numberOfDirectParentsInLaw").value = "";
    document.getElementById("salaryPerMonth").value = "";
    document.getElementById("funeral").value = "yes";
    document.getElementById("savings").value = "yes";
    document.getElementById("sumInsuredSharedToSpouse").value = "yes";
    document.getElementById("sumInsuredRate").value = 15;
    document.getElementById("premiumRate").value = 5;

    // Trigger calculation after clearing inputs
    calculateResults();
  });

  // Add event listeners to the input fields for immediate calculation
  document.getElementById("numberOfDirectParents").addEventListener("input", calculateResults);
  document.getElementById("numberOfDirectParentsInLaw").addEventListener("input", calculateResults);
  document.getElementById("numberOfChildren").addEventListener("input", calculateResults);
  document.getElementById("salaryPerMonth").addEventListener("input", calculateResults);
  document.getElementById("funeral").addEventListener("change", calculateResults);
  document.getElementById("savings").addEventListener("change", calculateResults);
  document.getElementById("sumInsuredSharedToSpouse").addEventListener("change", calculateResults);
  document.getElementById("sumInsuredRate").addEventListener("input", calculateResults);
  document.getElementById("premiumRate").addEventListener("input", calculateResults);

  // Call calculateResults initially to populate the table
  calculateResults();

  // JavaScript code
  const toggleNav = document.getElementById("toggleNav");
  const navList = document.querySelector(".nav-list");

  toggleNav.addEventListener("click", () => {
    navList.classList.toggle("show-nav-list");
  });

    // JavaScript code
  const togglePrime = document.getElementById("togglePrime");
  const primeIcons = document.querySelector(".prime-icon");

  togglePrime.addEventListener("click", () => {
    primeIcons.classList.toggle("show-prime-icons");
  });
});
