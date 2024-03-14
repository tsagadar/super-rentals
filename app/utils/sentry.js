// eslint-disable-next-line no-unused-vars
export default function sdkFingerprinting(event, hint) {
  const storeRegex = /(.*Attempted to handle event .* on <\S*:)(\S*)(> while in state [a-zA-Z.]*)(.*)/;

  if (storeRegex.test(event.message)) {
    // get rid of object identifier that can flood Sentry
    event.fingerprint = [event.message.replace(storeRegex, '$1FILTERED-ID$3')];
  }

  return event;
}
