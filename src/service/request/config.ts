let BASE_URL = ''
const Time_OUT = 100000

if (process.env.NODE_ENV == 'development') {
  BASE_URL = 'http://152.136.185.210:5000/'
} else if (process.env.NODE_ENV == 'production') {
  BASE_URL = ''
}

export { BASE_URL, Time_OUT }
