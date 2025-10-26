document.addEventListener('DOMContentLoaded', () => {
  const memberTableBody = document.getElementById('memberTableBody');
  const noEntriesMessage = document.getElementById('noEntriesMessage');
  const logoutButton = document.getElementById('logoutButton');

  // Simple authentication check: Redirect to login if not authenticated.
  // In a real application, this would involve more robust session management or token validation.
  const adminData = JSON.parse(localStorage.getItem('adminData')) || {};
  if (!adminData.loggedIn) {
    window.location.href = 'index.html';
    return;
  }

  function fetchAndDisplayMembers() {
    const members = JSON.parse(localStorage.getItem('registeredMembers')) || [];
    memberTableBody.innerHTML = ''; // Clear existing rows

    const now = new Date();
    // Calculate the date one year ago from the current date
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    // Filter members who applied within the last year
    const recentMembers = members.filter(member => {
      const appliedDate = new Date(member.appliedAt);
      return appliedDate >= oneYearAgo && appliedDate <= now;
    });

    if (recentMembers.length === 0) {
      noEntriesMessage.style.display = 'block';
      memberTableBody.style.display = 'none';
    } else {
      noEntriesMessage.style.display = 'none';
      memberTableBody.style.display = 'table-row-group';

      recentMembers.forEach((member, index) => {
        const row = document.createElement('tr');
        
        const appliedDate = new Date(member.appliedAt);
        // Format the date for better readability
        const formattedDate = appliedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        // Safely display psionicInterests, handling cases where it might be empty or undefined
        const psionicInterestsDisplay = member.psionicInterests ? member.psionicInterests : '-';

        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${member.name}</td>
          <td>${member.email}</td>
          <td>${formattedDate}</td>
          <td>${psionicInterestsDisplay}</td>
        `;
        memberTableBody.appendChild(row);
      });
    }
  }

  // Logout functionality
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('adminData'); // Clear login status
      window.location.href = 'index.html'; // Redirect to login page
    });
  }

  // Initial fetch and display of members on page load
  fetchAndDisplayMembers();
});
