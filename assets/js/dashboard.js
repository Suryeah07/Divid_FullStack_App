const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    window.location.href = "register.html";
}

// Populate profile info
const initials = user.name.split(" ").map(w => w[0]).join("").slice(0, 2);
document.getElementById("profileIcon").textContent = initials;
document.getElementById("userName").textContent = user.name;
document.getElementById("userEmail").textContent = user.email;

// Mobile dropdown info
const mobileName = document.getElementById("mobileUserName");
const mobileEmail = document.getElementById("mobileUserEmail");
if (mobileName) mobileName.textContent = user.name;
if (mobileEmail) mobileEmail.textContent = user.email;

// Toggle profile card on click
const profileIcon = document.getElementById("profileIcon");
const profileCard = document.getElementById("profileCard");

profileIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    profileCard.classList.toggle("show");
});

// Close card when clicking outside
document.addEventListener("click", (e) => {
    if (!profileCard.contains(e.target) && e.target !== profileIcon) {
        profileCard.classList.remove("show");
    }
});

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "register.html";
}

/* ================= ADD FRIEND / REMOVE FRIEND ================= */
const friendsList = document.getElementById("friendsList");
const addFriendBtn = document.getElementById("addFriendBtn");

if (addFriendBtn) {
    addFriendBtn.addEventListener("click", () => {
        const entry = document.createElement("div");
        entry.className = "friend-entry";
        entry.innerHTML = `
            <input type="text" name="friend" placeholder="Enter friend's name" required>
            <button type="button" class="remove-friend-btn" title="Remove">✕</button>
        `;
        friendsList.appendChild(entry);
        entry.querySelector("input").focus();
        updateRemoveButtons();
        updateSplitPreview();
    });
}

friendsList?.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-friend-btn");
    if (btn && !btn.disabled) {
        btn.closest(".friend-entry").remove();
        updateRemoveButtons();
        updateSplitPreview();
    }
});

function updateRemoveButtons() {
    const entries = friendsList.querySelectorAll(".friend-entry");
    entries.forEach((entry) => {
        const btn = entry.querySelector(".remove-friend-btn");
        btn.disabled = entries.length <= 1;
    });
}

/* ================= SPLIT PREVIEW ================= */
const amountInput = document.getElementById("currencyInput");
const splitPreview = document.getElementById("splitPreview");
const splitPreviewText = splitPreview?.querySelector(".split-preview-text");

function updateSplitPreview() {
    const amount = parseFloat(amountInput?.value) || 0;
    const splitType = document.querySelector('input[name="splitType"]:checked')?.value;
    const friendCount = friendsList?.querySelectorAll(".friend-entry").length || 0;
    const totalPeople = friendCount + 1; // including the user

    if (amount <= 0 || !splitPreview) {
        splitPreview?.classList.add("hidden");
        return;
    }

    let text = "";
    if (splitType === "equal") {
        // You paid the full amount, split equally among all (you + friends)
        const perPerson = (amount / totalPeople).toFixed(2);
        const youGetBack = friendCount > 0 ? (amount - amount / totalPeople).toFixed(2) : "0.00";
        const eachFriendOwes = friendCount > 0 ? (amount / totalPeople).toFixed(2) : "0.00";
        text = `⚖️ Split equally: ₹${perPerson}/person (${totalPeople} people). Each friend owes you ₹${eachFriendOwes}. You get back ₹${youGetBack}`;
    } else if (splitType === "fullPaid") {
        // You paid the full amount, you don't owe anything — friends split the entire bill
        if (friendCount > 0) {
            const perFriend = (amount / friendCount).toFixed(2);
            text = `💳 You paid ₹${amount.toFixed(2)} for others — each of ${friendCount} friend(s) owes you ₹${perFriend}`;
        } else {
            text = `💳 You paid ₹${amount.toFixed(2)} — add friends to split`;
        }
    } else if (splitType === "borrowed") {
        // You owe the full amount, split among friends you borrowed from
        if (friendCount > 0) {
            const perFriend = (amount / friendCount).toFixed(2);
            text = `🤝 You borrowed ₹${amount.toFixed(2)} — you owe ₹${perFriend} to each of ${friendCount} friend(s)`;
        } else {
            text = `🤝 You borrowed ₹${amount.toFixed(2)} — add friends you borrowed from`;
        }
    }

    if (text) {
        splitPreviewText.textContent = text;
        splitPreview.classList.remove("hidden");
    } else {
        splitPreview.classList.add("hidden");
    }
}

// Listen for changes
amountInput?.addEventListener("input", updateSplitPreview);
document.querySelectorAll('input[name="splitType"]').forEach((radio) => {
    radio.addEventListener("change", updateSplitPreview);
});
friendsList?.addEventListener("input", updateSplitPreview);

/* ================= SIDEBAR SECTION SWITCHING ================= */
const sidebarBtns = document.querySelectorAll(".sidebar-btn[data-section]");
const contentSections = document.querySelectorAll(".content-section");

sidebarBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-section");

        // Update active button
        sidebarBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Show target section, hide others
        contentSections.forEach((section) => {
            if (section.id === targetId) {
                section.classList.remove("hidden");
            } else {
                section.classList.add("hidden");
            }
        });
    });
});