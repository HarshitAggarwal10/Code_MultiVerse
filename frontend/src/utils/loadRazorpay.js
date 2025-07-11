// utils/loadRazorpay.js
export default function loadRazorpay () {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);     // already loaded

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
