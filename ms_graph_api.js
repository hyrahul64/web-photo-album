


function initializeGraphForUserAuth(settings, deviceCodePrompt) {

const azure = require('@azure/identity');
const graph = require('@microsoft/microsoft-graph-client');
const authProviders =
  require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');

  let _settings = undefined;
  let _deviceCodeCredential = undefined;
  let _userClient = undefined;
  
  // Ensure settings isn't null
  if (!settings) {
    throw new Error('Settings cannot be undefined');
  }

  _settings = settings;

  _deviceCodeCredential = new azure.DeviceCodeCredential({
    clientId: settings.clientId,
    tenantId: settings.tenantId,
    userPromptCallback: deviceCodePrompt
  });

  const authProvider = new authProviders.TokenCredentialAuthenticationProvider(
    _deviceCodeCredential, {
      scopes: settings.graphUserScopes
    });

  _userClient = graph.Client.initWithMiddleware({
    authProvider: authProvider
  });
}

function initializeGraph(settings) {
  initializeGraphForUserAuth(settings, (info) => {
    // Display the device code message to
    // the user. This tells them
    // where to go to sign in and provides the
    // code to use.
    console.log(info.message);
  });
}


async function getUserTokenAsync() {
  // Ensure credential isn't undefined
  if (!_deviceCodeCredential) {
    throw new Error('Graph has not been initialized for user auth');
  }

  // Ensure scopes isn't undefined
  if (!_settings?.graphUserScopes) {
    throw new Error('Setting "scopes" cannot be undefined');
  }

  // Request token with given scopes
  const response = await _deviceCodeCredential.getToken(_settings?.graphUserScopes);
  return response.token;
}

async function displayAccessTokenAsync() {
  try {
    const userToken = await getUserTokenAsync();
    console.log(`User token: ${userToken}`);
  } catch (err) {
    console.log(`Error getting user access token: ${err}`);
  }
}

function main() {
  console.log("main() from graph_api.");
  const settings = {
    'clientId': '55220f20-0882-4457-9e11-9f12d7d663ed',
    'tenantId': 'common', //e0fa8ee4-57df-4c19-98c8-0b237635db3d
    'graphUserScopes': [
      'user.read',
    ]
  };
  initializeGraph(settings);
  displayAccessTokenAsync();
}
