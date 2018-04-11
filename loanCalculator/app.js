// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  // hide results
  document.getElementById('results').style.display = 'none';
  // show loader
  document.getElementById('loading').style.display = 'block';
  //set two seconds time out
  setTimeout(calculateResults, 2000);
  // prevent form default on submition
  e.preventDefault();
});
// Calculate Results
function calculateResults(){
  console.log('Calculating...');
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  // calculation formula
  const principal = parseFloat(amount.value);
  // turn the interest value amount to decimal/float
  // devide it by 100 and again by 12
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  // yeas value input multiplyed by 12
  const calculatedPayments = parseFloat(years.value) * 12;
  // compute monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);
  // check if monthly amount is Finite (use the isFinite() method)
  if(isFinite(monthly)) {
    // I used the toFixed() method to set the number of decimal points on the monthly amount
    // output it on to our monthlyPayment output
    monthlyPayment.value = monthly.toFixed(2);
    //multiply monthly with the calculatedPayment
    // output it on totalPayment
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    //
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    // Show results
    document.getElementById('results').style.display = 'block';
    // hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    // call showError function
     showError('Please check your numbers');
  }
}

// show Error
function showError(error){
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Hide loader
  document.getElementById('loading').style.display = 'none';
  // create a div
  const errorDiv = document.createElement('div');
  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // add class - bootstrap
  errorDiv.className = 'alert alert-danger';
  // cleate text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // insert error above heading //used "insertBefore()' methods on the parent element (card)
  // parse in the element I want to insert...and the element I want to insert above off
  card.insertBefore(errorDiv, heading);
  // sert timeout on clearError() function of 3 seconds
  setTimeout(clearError, 3000);
}
// clear error function
function clearError(){
  // remove element from the dom
  document.querySelector('.alert').remove();
}
