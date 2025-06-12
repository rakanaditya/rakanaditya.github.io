const toggleDarkMode = document.getElementById("toggleDarkMode");

toggleDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
    toggleDarkMode.textContent = isDarkMode ? "☀️ Mode Terang" : "🌙 Mode Gelap";
});

// Saat halaman dimuat
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    toggleDarkMode.textContent = "☀️ Mode Terang";
} else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    toggleDarkMode.textContent = "🌙 Mode Gelap";
}

// Ambil data user GitHub
fetch('https://api.github.com/users/rakanaditya')
    .then(response => response.json())
    .then(data => {
        document.getElementById('repos').textContent = data.public_repos;
        document.getElementById('followers').textContent = data.followers;
    });

// Ambil event GitHub
fetch('https://api.github.com/users/rakanaditya/events')
    .then(response => response.json())
    .then(data => {
        let commits = data.filter(event => event.type === "PushEvent").length;
        let pullRequests = data.filter(event => event.type === "PullRequestEvent").length;

        document.getElementById('commits').textContent = commits;
        document.getElementById('pullRequests').textContent = pullRequests;
    });

// Ambil data repo dan buat chart
fetch('https://api.github.com/users/rakanaditya/repos')
    .then(response => response.json())
    .then(data => {
        let repoNames = data.map(repo => repo.name);
        let repoStars = data.map(repo => repo.stargazers_count);

        new Chart(document.getElementById('repoChart'), {
            type: 'bar',
            data: {
                labels: repoNames.slice(0, 5),
                datasets: [{
                    label: 'Jumlah Stars',
                    data: repoStars.slice(0, 5),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1 // ✅ ditambahkan nilai
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
