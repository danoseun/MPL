import dotenv from 'dotenv'

dotenv.config()

const getDbConnURI = (isTest: undefined, testEnv: string) => {
  let mongoConnectionString: string;
  let nodeEnv: string;

  if (isTest) {
    console.log('>>', isTest)
    nodeEnv = testEnv
    console.log('..', nodeEnv, testEnv)
  } else {
    nodeEnv = process.env.NODE_ENV || 'development';
  }

  if (nodeEnv === 'development') {
    mongoConnectionString = process.env.DEV_ATLAS_URI
  }
  if (nodeEnv === 'test') {
    mongoConnectionString = process.env.TEST_ATLAS_URI
  }
  return mongoConnectionString
}

export default getDbConnURI
