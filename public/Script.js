window.onload = () => {
  let index = 0;
  let hashtags = [];
  let region = "kenya";
  const tweetBase = "🧠 Civic Signal: https://bit.ly/4lEHHxj";

  async function loadHashtags() {
    region = document.getElementById("regionSelect").value;
    try {
      const res = await fetch(`/api/scrape-trends24?region=${region}`);
      const data = await res.json();
      hashtags = data.hashtags || ["#FallbackTag"];
      index = 0;
      updateTweet();
    } catch (err) {
      console.error("❌ Failed to load hashtags:", err);
      hashtags = ["#FallbackTag"];
      updateTweet();
    }
  }

  function updateTweet() {
    const tag = hashtags[index];
    document.getElementById("hashtagDisplay").textContent = tag;
    const tweetText = `${tweetBase} ${tag}`;
    document.getElementById("tweetLink").href =
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    updateDiagnostics(tag, tweetText);
    index = (index + 1) % hashtags.length;
  }

  function updateDiagnostics(tag, tweetText) {
    document.getElementById("diagnostic-region").textContent = region;
    document.getElementById("diagnostic-hashtag").textContent = tag;
    document.getElementById("diagnostic-tweet").href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    document.getElementById("diagnostic-timestamp").textContent = new Date().toLocaleString();
  }

  document.getElementById("regionSelect").addEventListener("change", loadHashtags);
  loadHashtags();
  setInterval(updateTweet, 6000);
};
