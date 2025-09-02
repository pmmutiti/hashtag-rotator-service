export function getHashtagsForRegion(region) {
  const map = {
    nairobi: ['#NairobiNow', '#NairobiUpdates'],
    rift: ['#RiftValleyWatch', '#RiftPulse'],
    coast: ['#CoastMatters', '#MombasaLive'],
    western: ['#WesternBuzz', '#KakamegaToday'],
  };

  return map[region?.toLowerCase()] || null;
}

