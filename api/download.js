export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  // Check if visitor is on iPhone, iPad, iPod, or Mac
  if (/iPad|iPhone|iPod|Macintosh|Mac OS/i.test(userAgent)) {
    res.redirect(302, 'https://apps.apple.com/app/id6762176490?pt=128779508&ct=friends_family_share&mt=8');
  } else {
    // Android & PC users go to Google Play with UTM referrer tracking
    res.redirect(302, 'https://play.google.com/store/apps/details?id=com.purescanai.app&referrer=utm_source%3Dfriends_family%26utm_medium%3Dsocial_share%26utm_campaign%3Dresult_share');
  }
}
