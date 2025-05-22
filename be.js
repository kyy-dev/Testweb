document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("formisi").addEventListener("submit", function (e) {
    const jeneng = document.getElementById("jeneng").value.trim();
    const skor = document.getElementById("skor").value.trim();

    if (jeneng === "" || skor === "") {
      alert("Kabeh isinen sek bro!");
      e.preventDefault(); // Cegah pindah halaman
    } else {
      // Simpan data di localStorage (opsional, kalau mau dipakai di halaman selanjutnya)
      localStorage.setItem("jeneng", jeneng);
      localStorage.setItem("skor", skor);

      // Pindah ke halaman berikutnya (misalnya quiz.html)
      window.location.href = "soal.html";

      e.preventDefault(); // Hindari reload jika kamu tidak ingin form default behavior
    }
  });
});