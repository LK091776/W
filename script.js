const statusText = document.getElementById("status");

document.querySelectorAll("button[data-nomor]").forEach((button) => {
  button.addEventListener("click", async () => {
    const nomor = button.dataset.nomor;

    try {
      await navigator.clipboard.writeText(nomor);
      statusText.textContent = `Nomor berhasil disalin: ${nomor}`;
    } catch {
      // Fallback for browsers where Clipboard API is unavailable.
      const temporaryInput = document.createElement("textarea");
      temporaryInput.value = nomor;
      temporaryInput.setAttribute("readonly", "");
      temporaryInput.style.position = "fixed";
      temporaryInput.style.opacity = "0";
      document.body.appendChild(temporaryInput);
      temporaryInput.select();

      let copied = false;
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }

      temporaryInput.remove();
      statusText.textContent = copied
        ? `Nomor berhasil disalin: ${nomor}`
        : "Gagal menyalin. Silakan salin nomor secara manual.";
    }
  });
});
