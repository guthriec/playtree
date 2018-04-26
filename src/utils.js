export function feedKeyFromParams(params) {
  if (params.channel) {
    return params.channel;
  } else {
    return "home";
  }
}
