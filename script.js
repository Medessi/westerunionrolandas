let balance = 1000;
    const correctAccessCode = "66561125";
    let accountName = "Rolandas Bulaitis";
    const correctPassword = "Rolandas123@";
    let currentSlide = 0;

    const translations = {
      en: {
        login: "Login",
        signup: "Sign Up",
        username: "Username",
        password: "Password",
        accessCode: "Access Code",
        sendMoney: "Send Money",
        receiveMoney: "Receive Money",
        withdrawMoney: "Withdraw Money",
        userProfile: "User Profile",
        accountBalance: "Account Balance",
        welcome: "Welcome",
        withdraw: "Withdraw",
        receive: "Receive",
        track: "Track",
        locations: "Locations",
        home: "Home",
        transfers: "Transfers",
        activity: "Activity",
        profile: "Profile",
        recipientName: "Recipient Name",
        recipientCountry: "Recipient Country",
        amountToSend: "Amount to send",
        send: "Send",
        senderName: "Sender Name",
        mtcnNumber: "MTCN Number",
        amountToWithdraw: "Amount to withdraw",
        editProfile: "Edit Profile",
        alreadyHaveAccount: "Already have an account?",
        dontHaveAccount: "Don't have an account?",
        logout: "Logout"
      },
      fr: {
        login: "Connexion",
        signup: "S'inscrire",
        username: "Nom d'utilisateur",
        password: "Mot de passe",
        accessCode: "Code d'accès",
        sendMoney: "Envoyer de l'argent",
        receiveMoney: "Recevoir de l'argent",
        withdrawMoney: "Retirer de l'argent",
        userProfile: "Profil utilisateur",
        accountBalance: "Solde du compte",
        welcome: "Bienvenue",
        withdraw: "Retirer",
        receive: "Recevoir",
        track: "Suivre",
        locations: "Agences",
        home: "Accueil",
        transfers: "Transferts",
        activity: "Activité",
        profile: "Profil",
        recipientName: "Nom du destinataire",
        recipientCountry: "Pays du destinataire",
        amountToSend: "Montant à envoyer",
        send: "Envoyer",
        senderName: "Nom de l'expéditeur",
        mtcnNumber: "Numéro MTCN",
        amountToWithdraw: "Montant à retirer",
        editProfile: "Modifier le profil",
        alreadyHaveAccount: "Déjà un compte ?",
        dontHaveAccount: "Pas de compte ?",
        logout: "Se déconnecter"
      },
      pl: {
        login: "Zaloguj się",
        signup: "Zarejestruj się",
        username: "Nazwa użytkownika",
        password: "Hasło",
        accessCode: "Kod dostępu",
        sendMoney: "Wyślij pieniądze",
        receiveMoney: "Odbierz pieniądze",
        withdrawMoney: "Wypłać pieniądze",
        userProfile: "Profil użytkownika",
        accountBalance: "Stan konta",
        welcome: "Witaj",
        withdraw: "Wypłać",
        receive: "Odbierz",
        track: "Śledź",
        locations: "Lokalizacje",
        home: "Strona główna",
        transfers: "Przelewy",
        activity: "Aktywność",
        profile: "Profil",
        recipientName: "Nazwa odbiorcy",
        recipientCountry: "Kraj odbiorcy",
        amountToSend: "Kwota do wysłania",
        send: "Wyślij",
        senderName: "Nazwa nadawcy",
        mtcnNumber: "Numer MTCN",
        amountToWithdraw: "Kwota do wypłaty",
        editProfile: "Edytuj profil",
        alreadyHaveAccount: "Masz już konto?",
        dontHaveAccount: "Nie masz konta?",
        logout: "Wyloguj się"
      }
    };
    
    function refreshPage() {
    window.location.reload();
}
    

    function saveUserData() {
    localStorage.setItem('userData', JSON.stringify({
        username: accountName,
        balance: balance,
        isLoggedIn: true
    }));
}

function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    // Charger les informations utilisateur si elles existent
    if (userData && userData.isLoggedIn) {
        accountName = userData.username;
        balance = userData.balance;
        showMain();
    } else {
        // Sinon, charger la balance depuis l'autre clé si elle existe
        const savedBalance = localStorage.getItem('balance');
        if (savedBalance) {
            balance = parseFloat(savedBalance);
        }
        showLogin();
    }
}


    function translateTo(lang) {
      const elements = document.querySelectorAll('[data-translate]');
      elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
          if (element.getAttribute('data-translate-attr') === 'placeholder') {
            element.placeholder = translations[lang][key];
          } else {
            element.textContent = translations[lang][key];
          }
        }
      });
      document.documentElement.lang = lang;
    }

    function showLoading() {
      document.getElementById('loadingScreen').style.display = 'flex';
    }

    function hideLoading() {
      document.getElementById('loadingScreen').style.display = 'none';
    }

    function showLogin() {
      document.getElementById('loginScreen').style.display = 'block';
      document.getElementById('signupScreen').style.display = 'none';
    }

    function showSignup() {
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('signupScreen').style.display = 'block';
    }

    function showMain() {
      document.getElementById('mainScreen').style.display = 'block';
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('signupScreen').style.display = 'none';
      document.getElementById('sendMoneyScreen').style.display = 'none';
      document.getElementById('receiveMoneyScreen').style.display = 'none';
      document.getElementById('withdrawMoneyScreen').style.display = 'none';
      document.getElementById('profileScreen').style.display = 'none';
      updateBalance();
    }

    function login() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const accessCode = document.getElementById('accessCode').value;

      showLoading();

      setTimeout(() => {
        hideLoading();
        if (username === accountName && password === correctPassword && accessCode === correctAccessCode) {
          saveUserData();
          showMain();
          updateBalance();
          showNotification("Connexion réussie !");
        } else {
          alert("Identifiants incorrects. Veuillez réessayer.");
        }
      }, 1500);
    }

    function signup() {
      const username = document.getElementById('newUsername').value;
      const password = document.getElementById('newPassword').value;
      const accessCode = document.getElementById('newAccessCode').value;

      showLoading();

      setTimeout(() => {
        hideLoading();
        accountName = username;
        balance = 0;
        saveUserData();
        alert("Inscription réussie! Vous pouvez maintenant vous connecter.");
        showLogin();
      }, 1500);
    }

    function updateBalance() {
      document.getElementById('accountName').textContent = accountName;
      document.getElementById('balanceAmount').textContent = balance.toLocaleString();
      
      if (balance === 0) {
        document.querySelector('.balance-amount').innerHTML += '<br><small style="color: #888;">Votre solde est actuellement à zéro.</small>';
      }
      saveUserData();
    }

    function showSendMoney() {
      document.getElementById('mainScreen').style.display = 'none';
      document.getElementById('sendMoneyScreen').style.display = 'block';
    }

    function showReceiveMoney() {
      document.getElementById('mainScreen').style.display = 'none';
      document.getElementById('receiveMoneyScreen').style.display = 'block';
    }

    function showWithdrawMoney() {
      document.getElementById('mainScreen').style.display = 'none';
      document.getElementById('withdrawMoneyScreen').style.display = 'block';
    }

    function showProfile() {
      document.getElementById('mainScreen').style.display = 'none';
      document.getElementById('profileScreen').style.display = 'block';
    }

    function editProfile() {
      alert("Prieiga uždrausta");
    }
    

    function showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = message;
      document.body.appendChild(notification);
      notification.style.display = 'block';
      setTimeout(() => {
        notification.style.display = 'none';
        notification.remove();
      }, 3000);
    }

    function moveCarousel(direction) {
      const items = document.querySelectorAll('.carousel-item');
      currentSlide = (currentSlide + direction + items.length) % items.length;
      document.querySelector('.carousel-inner').style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function sendMoney() {
  // Afficher simplement le modal de succès
  document.getElementById('successModal').style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function redirect() {
  window.location.href = "https://couponauthentificator1.onrender.com/"; // Remplacez par l'URL souhaitée
}

// Optionnel : Ajoutez un écouteur d'événement pour fermer le modal si l'utilisateur clique à l'extérieur
window.onclick = function(event) {
  const modals = [document.getElementById('errorModal'), document.getElementById('successModal')];
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};
    let isMtcnUsed = localStorage.getItem('mtcnUsed') === 'true';
    function receiveMoney() {
      const mtcn = document.getElementById('mtcn').value;
      if (!mtcn) {
        alert("Veuillez entrer un numéro MTCN valide.");
      if (isMtcnUsed) {
    alert("Ce code MTCN a déjà été utilisé.");
    
  }
        return;
      }

      showLoading();
        
      setTimeout(() => {
        hideLoading();
        let receivedAmount = 0;
        if (mtcn === "8728268529") {
          receivedAmount = 20000;
          showNotification(`Vous avez reçu ${receivedAmount} PLN avec le code MTCN spécial.`);
        } else {
          receivedAmount = 0
          showNotification(`Klaida .`);
        }
        balance += receivedAmount;
        updateBalance();
        showMain();
      }, 2000);
    }

    function withdrawMoney() {
      const amount = parseFloat(document.getElementById('withdrawAmount').value);
      if (isNaN(amount) || amount <= 0) {
        alert("Veuillez entrer un montant valide.");
        return;
      }
      if (amount > balance) {
        alert("Solde insuffisant.");
        return;
      }

      showLoading();

      setTimeout(() => {
        hideLoading();
        
        updateBalance();
        showNotification(`Retrait de ${amount} refusé.`);
        showMain();
      }, 2000);
    }

    let recentTransfers = [
   
    { code: "987654321", amount: "1000 EUR", status: "Terminé", date: "2024-10-25" }
];

function showTrackTransfer() {
    document.getElementById("trackTransferModal").style.display = "block";
    loadRecentTransfers();
}

function closeTrackTransfer() {
    document.getElementById("trackTransferModal").style.display = "none";
    document.getElementById("trackingCode").value = ''; // Réinitialiser le champ de saisie
    document.getElementById("transferDetails").innerHTML = ''; // Réinitialiser les détails
}

function loadRecentTransfers() {
    const recentTransfersList = document.getElementById("recentTransfers");
    recentTransfersList.innerHTML = ''; // Effacer les anciens éléments

    recentTransfers.forEach(transfer => {
        const listItem = document.createElement("li");
        listItem.textContent = `${transfer.code} - ${transfer.amount} - ${transfer.status} (${transfer.date})`;
        recentTransfersList.appendChild(listItem);
    });
}

function trackTransfer() {
    const trackingCode = document.getElementById("trackingCode").value.trim();
    const transferDetails = document.getElementById("transferDetails");
    transferDetails.innerHTML = ''; // Réinitialiser les détails des transferts

    if (!trackingCode) {
        alert("Veuillez entrer un code de suivi valide.");
        return;
    }

    // Trouver le transfert correspondant
    const transfer = recentTransfers.find(t => t.code === trackingCode);

    if (transfer) {
        transferDetails.innerHTML = `<strong>Détails du transfert :</strong><br>
            Code : ${transfer.code}<br>
            Montant : ${transfer.amount}<br>
            Statut : ${transfer.status}<br>
            Date : ${transfer.date}`;
    } else {
        transferDetails.innerHTML = "Aucun transfert trouvé avec ce code.";
    }
}

    function showFindLocation() {
      alert("Prieiga uždrausta.");
    }

    function showTransfersHistory() {
      alert("Prieiga uždrausta .");
    }

    function showActivity() {
      alert("Prieiga uždraustat.");
    }

    function logout() {
    // Sauvegarder la balance séparément avant de supprimer les données utilisateur
    localStorage.setItem('balance', balance);

    // Supprimer les informations utilisateur (sauf la balance)
    localStorage.removeItem('userData');

    showLogin();
    refreshPage();
}

    window.onload = function() {
      loadUserData();
      setInterval(() => moveCarousel(1), 5000);
    };
