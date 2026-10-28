let transactions = [];

function render() {
  const list = document.getElementById('list');
  list.innerHTML = '';
  console.log("render started");

  transactions.forEach(t => {
    const li = document.createElement('li');
    li.className = "flex justify-between py-3";
    li.innerHTML = `
      <span>${t.category} <span class="text-xs text-gray-400">(${t.type})</span></span>
      <span class="font-semibold">₹${t.amount}</span>
    `;
    list.appendChild(li);
  });
  console.log("transactions:", transactions);



  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
console.log("total Income", totalIncome);
console.log("total expense", totalExpense);
  document.getElementById('balance').textContent = `₹${totalIncome - totalExpense}`;
  document.getElementById('income').textContent = `₹${totalIncome}`;
  document.getElementById('expense').textContent = `₹${totalExpense}`;
  document.getElementById('loading').style.display = transactions.length ? 'none' : 'block';
if (totalIncome < totalExpense) {
  document.getElementById("mainHeading").style.color = "red";
}  
}


document.getElementById('addBtn').addEventListener('click', () => {
  const type = document.getElementById('type').value;
  const category = document.getElementById('category').value;
  const amount = Number(document.getElementById('amount').value);

  if (!category || !amount) return alert("Fill all fields");

  transactions.push({ id: Date.now(), type, category, amount });
  render();

  document.getElementById('category').value = '';
  document.getElementById('amount').value = '';
});

function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, type: 'income', category: 'Salary', amount: 50000 },
        { id: 2, type: 'expense', category: 'Rent', amount: 5000 }
      ]);
    }, 800);
  });
}

async function init() {
  const data = await fetchData();
  transactions = data;
  render();
}
init();