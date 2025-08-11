window.onload = () => {
  let index = 0;
  let hashtags = [];
  const tweetBase = "Edge Requests Explained 📡 https://bit.ly/41xnX7p";

  async function loadHashtags() {
    const region = document.getElementById("regionSelect").value;
    const res = await fetch("/api/trends24-cache");
    const data = await res.json();
    hashtags = data.hashtags[region] || ["#FallbackTag"];
    index = 0;
    updateTweet();
  }

  function updateTweet() {
    const tag = hashtags[index];
    document.getElementById("hashtagDisplay").textContent = tag;
    document.getElementById("tweetLink").href =
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${tweetBase} ${tag}`)}`;
    updateDiagnostics(tag);
    index = (index + 1) % hashtags.length;
  }

  function updateDiagnostics(tag) {
    const region = document.getElementById("regionSelect").value;
    const timestamp = new Date().toLocaleString();
    document.getElementById("diagnostic-region").textContent = region;
    document.getElementById("diagnostic-hashtag").textContent = tag;
    document.getElementById("diagnostic-timestamp").textContent = timestamp;
  }

  document.getElementById("regionSelect").addEventListener("change", loadHashtags);
  loadHashtags();
  setInterval(updateTweet, 6000);
};
