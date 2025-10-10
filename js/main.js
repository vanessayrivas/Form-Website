// JS scripts placed here
<script>
  document.addEventListener('DOMContentLoaded', () = > {
    constform = document.getElementById('signupForm');
    const thankYou = document.getElementById('thankYou');

    if (!form || !thankYou) return; // guard if IDs changed

    form.addEventListener('submit', (e) => {
      e.preventDefault();     // stop page reload
      form.reset();           // clear fields

      // show + retrigger animation every time
      thankYou.hidden = false;
      thankYou.classList.remove('show');
      void thankYou.offsetWidth;     // force reflow to restart animation
      thankYou.classList.add('show');

      // OPTIONAL: auto-hide after 5s
      // setTimeout(() = > { thankYou.hidden = true; }, 5000);
    });
  });
</script>