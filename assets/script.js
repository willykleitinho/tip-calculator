var billAmount = undefined;
var numberOfPeople = undefined;
var tipPercentage = undefined

const bill = document.getElementById('bill-amount');
const people = document.getElementById('people');
const tip = document.getElementById('tip-person');
const total = document.getElementById('total-person');
const percentages = document.getElementsByName('percentage');
const customPercentage = document.getElementById('custom');

function roundNumber(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function updateResult() {
  const errorBill = document.getElementById('error-bill');
  if(!billAmount) {
    errorBill.innerText = 'Required';
    errorBill.classList.remove('hidden');
    bill.classList.add('error-border');
  } else {
    if (bill.value < 0) {
      errorBill.innerText = 'Invalid amount.';
      errorBill.classList.remove('hidden');
      bill.classList.add('error-border');
    } else {
      errorBill.innerText = '';
      errorBill.classList.add('hidden');
      bill.classList.remove('error-border');
    }
  }

  const errorPercentage = document.getElementById('error-percentage');
  if(!tipPercentage && !(tipPercentage === 0 || tipPercentage < 101) ) {
    errorPercentage.innerText = 'Required';
    errorPercentage.classList.remove('hidden');
    tipPercentage = '';
  } else {
    if (tipPercentage < 0 || tipPercentage > 100) {
      errorPercentage.innerText = 'Invalid amount.';
      errorPercentage.classList.remove('hidden');
    } else {
      errorPercentage.innerText = '';
      errorPercentage.classList.add('hidden');
    }
  }
  
  const errorPeople = document.getElementById('error-people');
  if(!numberOfPeople) {
    errorPeople.innerText = 'Required';
    errorPeople.classList.remove('hidden');
    people.classList.add('error-border');
  } else {
    if (people.value < 0) {
      errorPeople.innerText = 'Invalid amount.';
      errorPeople.classList.remove('hidden');
      people.classList.add('error-border');
    } else {
      errorPeople.innerText = '';
      errorPeople.classList.add('hidden');
      people.classList.remove('error-border');
    }
  }

  if(billAmount && numberOfPeople && (tipPercentage || tipPercentage === 0)) {
    
    totalTip = billAmount * (tipPercentage / 100.0);
    totalAmount = billAmount + parseFloat(totalTip);
    
    tip.innerText = `$${roundNumber(totalTip / numberOfPeople)}`;
    total.innerText = `$${roundNumber(totalAmount / numberOfPeople)}`;
  }
}


window.onload = () => {
  bill.addEventListener('change', () => {
    billAmount = parseFloat(bill.value);
    updateResult();
  });
  people.addEventListener('change', () => {
    numberOfPeople = parseFloat(people.value);
    updateResult();
  });
  
  for(let element of percentages) {
    element.addEventListener('change', (event) => {
      if (event.target.value === 'custom') {
        tipPercentage = parseFloat(customPercentage.value);
      } else {
        tipPercentage = parseFloat(event.target.value);
      }
      updateResult();
    }, true)
  }

  customPercentage.addEventListener('change', () => {
    tipPercentage = parseFloat(customPercentage.value);
  })

  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', (event) => {
    event.preventDefault();
    bill.value = '';
    people.value = '';
    
    customPercentage.value = '';

    for(let element of percentages) {
      if (element.checked) {
        element.checked = false;
        return;
      }
    }
    tip.innerText = '$0.00';
    total.innerText = '$0.00';

  }, true);
}