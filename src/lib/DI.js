const fnArgs = require('../utils/getFunctionArgs')

/**
 * DI
 * @returns {object}
 */
module.exports = () => {
  const dependencies = {}
  const factories = {}
  const diContainer = {}

  /**
   * Register dependency
   * @param name {string}
   * @param dependency
   */
  diContainer.register = (name, dependency) => {
    dependencies[name] = dependency
  }

  /**
   * Register factory
   * @param name {string}
   * @param factory
   */
  diContainer.factory = (name, factory) => {
    factories[name] = factory
  }

  /**
   * Inject to factory
   * @param factory
   */
  diContainer.inject = factory => {
    const args = fnArgs(factory).map(dependency => diContainer.get(dependency))
    return factory.apply(null, args)
  }

  /**
   * Get dependency
   * @param name {string}
   */
  diContainer.get = name => {
    if (!dependencies[name]) {
      const factory = factories[name]
      dependencies[name] = factory && diContainer.inject(factory)
      if (!dependencies[name]) {
        throw new Error(`Cannot find module: ${name}`)
      }
    }
    return dependencies[name]
  }

  return diContainer
}
