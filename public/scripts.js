document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('expenseForm');
    const transactionsDiv = document.getElementById('transactions');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const description = document.getElementById('description').value;
      const amount = document.getElementById('amount').value;
      const type = document.getElementById('type').value;
  
      await fetch('/addTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `description=${description}&amount=${amount}&type=${type}`,
      });
  
      updateTransactions();
    });
  
    const updateTransactions = async () => {
      const response = await fetch('/getTransactions');
      const transactions = await response.json();
  
      transactionsDiv.innerHTML = '';
  
      transactions.forEach((transaction) => {
        const transactionDiv = document.createElement('div');
        transactionDiv.classList.add('transaction', transaction.type);
  
        const descriptionP = document.createElement('p');
        descriptionP.textContent = `Description: ${transaction.description}`;
  
        const amountP = document.createElement('p');
        amountP.textContent = `Amount: ${transaction.amount}`;
  
        const typeP = document.createElement('p');
        typeP.textContent = `Type: ${transaction.type}`;
  
        transactionDiv.appendChild(descriptionP);
        transactionDiv.appendChild(amountP);
        transactionDiv.appendChild(typeP);
  
        transactionsDiv.appendChild(transactionDiv);
      });
    };
  
    updateTransactions();
  });
  