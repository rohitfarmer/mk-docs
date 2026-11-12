(() => {
  function initPlayer() {
    const player = document.getElementById("player");
    if (!player || player.dataset.initialized) return;

    player.dataset.initialized = "true";

    const m = new jscw();
    m.setWpm(18);
    m.setEff(18);
    m.setFreq(600);
    m.setText("KC3SNU Rohit");
    m.renderPlayer("player", m);
  }

  document$.subscribe(initPlayer);
})();
