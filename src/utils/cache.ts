class Cache {
  setCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const res = localStorage.getItem(key)
    if (res) {
      return JSON.parse(res)
    }
  }
  removeCache(key: string) {
    localStorage.removeItem(key)
  }
  clearCache() {
    localStorage.clear()
  }
}
export default new Cache()
