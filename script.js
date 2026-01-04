// Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });
});

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "var(--bg-white)";
    navbar.style.backdropFilter = "none";
  }
});

// Scroll to Section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Tab Switching
function switchTab(tabName) {
  // Remove active class from all tabs and panes
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelectorAll(".tab-pane").forEach((pane) => {
    pane.classList.remove("active");
  });

  // Add active class to clicked tab and corresponding pane
  event.target.classList.add("active");
  document.getElementById(tabName).classList.add("active");
}

// Update Chart
function updateChart(type) {
  const bars = document.querySelectorAll(".chart-bars .bar");
  const values = {
    berat: ["3.2kg", "3.8kg", "4.1kg", "4.5kg", "4.8kg", "5.1kg"],
    tinggi: ["50cm", "52cm", "54cm", "56cm", "58cm", "60cm"],
    lingkar: ["35cm", "36cm", "37cm", "38cm", "39cm", "40cm"],
  };

  const heights = {
    berat: [60, 70, 75, 85, 90, 95],
    tinggi: [65, 75, 80, 85, 90, 95],
    lingkar: [70, 75, 80, 85, 88, 92],
  };

  bars.forEach((bar, index) => {
    bar.style.height = heights[type][index] + "%";
    bar.querySelector(".bar-value").textContent = values[type][index];
  });

  showNotification(
    `Grafik ${
      type === "berat"
        ? "Berat Badan"
        : type === "tinggi"
        ? "Tinggi Badan"
        : "Lingkar Kepala"
    } diperbarui`
  );
}

// Save Data
function saveData() {
  showNotification("Data berhasil disimpan!");
}

// Calendar
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const calendarDays = document.getElementById("calendarDays");

  // Clear previous days
  calendarDays.innerHTML = "";

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    calendarDays.appendChild(emptyDay);
  }

  // Add days of the month
  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    dayElement.textContent = day;

    // Check if today
    if (
      currentYear === today.getFullYear() &&
      currentMonth === today.getMonth() &&
      day === today.getDate()
    ) {
      dayElement.classList.add("today");
    }

    // Add events on specific days (example: 5, 10, 15, 20, 25 of each month)
    if ([5, 10, 15, 20, 25].includes(day)) {
      dayElement.classList.add("has-event");
      dayElement.title = "Ada kegiatan Posyandu";
    }

    dayElement.addEventListener("click", () => {
      showNotification(
        `Tanggal ${day} ${getMonthName(currentMonth)} ${currentYear} dipilih`
      );
    });

    calendarDays.appendChild(dayElement);
  }

  // Update month display
  document.getElementById("currentMonth").textContent = `${getMonthName(
    currentMonth
  )} ${currentYear}`;
}

function changeMonth(direction) {
  currentMonth += direction;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar();
}

function getMonthName(month) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return months[month];
}

// Initialize calendar
generateCalendar();

// Submit Schedule
function submitSchedule(event) {
  event.preventDefault();
  showNotification("Pendaftaran berhasil! Kami akan menghubungi Anda segera.");
  event.target.reset();
}

// Send Message
function sendMessage(event) {
  event.preventDefault();
  showNotification("Pesan berhasil dikirim! Kami akan segera merespon.");
  event.target.reset();
}

// Subscribe Newsletter
function subscribeNewsletter(event) {
  event.preventDefault();
  showNotification("Terima kasih telah berlangganan newsletter kami!");
  event.target.reset();
}

// Modal Functions
function openServiceDetail(service) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  const serviceDetails = {
    imunisasi: {
      title: "Layanan Imunisasi",
      content: `
                <h3>Jadwal Imunisasi Dasar</h3>
                <ul style="line-height: 2; margin: 20px 0;">
                    <li><strong>HB 0:</strong> Sebelum 7 hari setelah lahir</li>
                    <li><strong>BCG:</strong> Sebelum 3 bulan</li>
                    <li><strong>Polio 1-4:</strong> 2, 4, 6, 18 bulan</li>
                    <li><strong>DPT-HB-Hib 1-3:</strong> 2, 4, 6 bulan</li>
                    <li><strong>Campak:</strong> 9 bulan</li>
                </ul>
                <p style="color: var(--text-light);">Imunisasi gratis tersedia setiap hari Senin dan Kamis pukul 08:00-12:00</p>
            `,
    },
    penimbangan: {
      title: "Penimbangan Berat Badan",
      content: `
                <h3>Pentingnya Penimbangan Rutin</h3>
                <p style="margin: 20px 0; line-height: 1.8;">Penimbangan berat badan dilakukan setiap bulan untuk memantau pertumbuhan anak. Hasil akan dicatat dalam KMS (Kartu Menuju Sehat).</p>
                <h4>Standar Pertumbuhan WHO:</h4>
                <ul style="line-height: 2; margin: 20px 0;">
                    <li><strong>Normal:</strong> Berat badan sesuai garis kuning di KMS</li>
                    <li><strong>Gizi Baik:</strong> Berat badan di atas garis hijau</li>
                    <li><strong>Perlu Perhatian:</strong> Berat badan di bawah garis merah</li>
                </ul>
            `,
    },
    konsultasi: {
      title: "Konsultasi Kesehatan",
      content: `
                <h3>Layanan Konsultasi</h3>
                <p style="margin: 20px 0; line-height: 1.8;">Dapatkan konsultasi gratis dengan bidan dan tenaga kesehatan kami untuk:</p>
                <ul style="line-height: 2; margin: 20px 0;">
                    <li>🤱 Kesehatan ibu hamil dan menyusui</li>
                    <li>👶 Tumbuh kembang anak</li>
                    <li>🍼 ASI eksklusif dan MPASI</li>
                    <li>💊 Pemberian obat dan vitamin</li>
                </ul>
                <p style="color: var(--primary-color); font-weight: 500;">Jadwal: Setiap hari kerja pukul 09:00-15:00</p>
            `,
    },
    gizi: {
      title: "Pemantauan Gizi",
      content: `
                <h3>Program Gizi Seimbang</h3>
                <p style="margin: 20px 0; line-height: 1.8;">Kami menyediakan:</p>
                <ul style="line-height: 2; margin: 20px 0;">
                    <li>✓ Penilaian status gizi anak</li>
                    <li>✓ Konseling gizi untuk ibu hamil</li>
                    <li>✓ Resep MPASI bergizi</li>
                    <li>✓ Suplemen makanan tambahan</li>
                    <li>✓ Edukasi pola makan sehat</li>
                </ul>
                <p style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <strong>Tip:</strong> Berikan anak makanan 4 sehat 5 sempurna setiap hari!
                </p>
            `,
    },
    vitamin: {
      title: "Pemberian Vitamin",
      content: `
                <h3>Jadwal Pemberian Vitamin</h3>
                <div style="margin: 20px 0;">
                    <h4>Vitamin A</h4>
                    <ul style="line-height: 2; margin: 10px 0;">
                        <li><strong>Bayi 6-11 bulan:</strong> Dosis biru (100.000 IU) - Februari & Agustus</li>
                        <li><strong>Anak 1-5 tahun:</strong> Dosis merah (200.000 IU) - Februari & Agustus</li>
                    </ul>
                    
                    <h4 style="margin-top: 20px;">Vitamin Tambahan</h4>
                    <ul style="line-height: 2; margin: 10px 0;">
                        <li>✓ Vitamin D untuk bayi</li>
                        <li>✓ Zat besi untuk ibu hamil</li>
                        <li>✓ Asam folat untuk program kehamilan</li>
                    </ul>
                </div>
            `,
    },
    edukasi: {
      title: "Edukasi Kesehatan",
      content: `
                <h3>Materi Edukasi</h3>
                <p style="margin: 20px 0; line-height: 1.8;">Kami menyediakan berbagai materi edukasi:</p>
                <div style="display: grid; gap: 15px; margin: 20px 0;">
                    <div style="padding: 15px; background: var(--bg-light); border-radius: 8px;">
                        <h4>📹 Video Tutorial</h4>
                        <p>Cara memandikan bayi, pijat bayi, dan stimulasi anak</p>
                    </div>
                    <div style="padding: 15px; background: var(--bg-light); border-radius: 8px;">
                        <h4>📚 Artikel Kesehatan</h4>
                        <p>Tips parenting, tumbuh kembang anak, dan kesehatan ibu</p>
                    </div>
                    <div style="padding: 15px; background: var(--bg-light); border-radius: 8px;">
                        <h4>🎓 Kelas Online</h4>
                        <p>Kelas persiapan melahirkan dan kelas menyusui</p>
                    </div>
                </div>
            `,
    },
  };

  const detail = serviceDetails[service];
  if (detail) {
    modalTitle.textContent = detail.title;
    modalBody.innerHTML = detail.content;
    modal.style.display = "block";
  }
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Notification System
function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notificationMessage");

  notificationMessage.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

function closeNotification() {
  document.getElementById("notification").classList.remove("show");
}

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Add loading animation
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});
