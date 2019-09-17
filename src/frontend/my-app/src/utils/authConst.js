export const IDENTITY_CONFIG = {
    authority: window.env.API_IDENTITY,
    client_id: window.env.CLIENT_ID,
    redirect_uri: window.env.URL_CALLBACK_WEB,
    scope: window.env.SCOPE,
    post_logout_redirect_uri: window.env.API_IDENTITY, // (string): The OIDC post-logout redirect URI.
    automaticSilentRenew: false, //(boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
    loadUserInfo: false, //(boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
    silent_redirect_uri: window.env.URL_CALLBACK_WEB, //(string): The URL for the page containing the code handling the silent renew.
    responseType: "id_token token", //(string, default: 'id_token'): The type of response desired from the OIDC provider.
    webAuthResponseType: "id_token token"
  };
  
  export const METADATA_OIDC = {
    issuer: window.env.API_IDENTITY,
    jwks_uri: window.env.API_IDENTITY + "/.well-known/openid-configuration/jwks",
    authorization_endpoint: window.env.API_IDENTITY + "/connect/authorize",
    token_endpoint: window.env.API_IDENTITY + "/connect/token",
    userinfo_endpoint: window.env.API_IDENTITY + "/connect/userinfo",
    end_session_endpoint: window.env.API_IDENTITY + "/connect/endsession",
    check_session_iframe: window.env.API_IDENTITY + "/connect/checksession",
    revocation_endpoint: window.env.API_IDENTITY + "/connect/revocation",
    introspection_endpoint: window.env.API_IDENTITY + "/connect/introspect"
  };
  