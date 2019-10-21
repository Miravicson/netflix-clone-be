const verifyEnvVariable = name => {
  if (!process.env[name]) {
    console.log(`Environment variable ${name} has not been set. Please set the environment variable `);
    process.kill(process.pid, 'SIGTERM');
    throw new Error(`Environment variable ${name} has not been set. Please set the environment variable `);
  } else {
    return process.env[name];
  }
};

const config = {
  serverPort: verifyEnvVariable('PORT'),
  mongodbUrl: verifyEnvVariable('MONGODB'),
  omdbKey: verifyEnvVariable('OMDB_KEY'),
  omdbBaseUrl: verifyEnvVariable('OMDB_BASE_URL'),
};

module.exports = config;
