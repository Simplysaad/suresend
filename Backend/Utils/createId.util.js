export default function generateOrderTrackingID() {
  const timestamp = Date.now().toString(36); // base36 timestamp
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase(); // random 6 chars
  return `ORD-${timestamp}-${randomStr}`;
}
