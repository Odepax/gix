class Container {
	private registry = new Map<Symbol, (self: Container) => any>()

	registerFactory<T>(factory: (self: Container) => T): Symbol {
		const token = Symbol()

		this.registry.set(token, factory)

		return token
	}

	registerSingleton<T>(factory: (self: Container) => T): Symbol {
		let singletonInstance: T = undefined

		const singletonFactory = (container: Container) =>
			singletonInstance ?? (singletonInstance = factory(container))

		return this.registerFactory(singletonFactory)
	}

	get<T>(token: Symbol): T {
		return this.registry.get(token)(this) as T
	}
}

interface Depended {
	k: number
}

class Implementation implements Depended {
	k = 12
}

class Dependent {
	constructor(
		public dependency: Depended
	) {}
}

const container = new Container()

const token = {
	Depended: container.registerSingleton<Depended>(() => new Implementation()),
	Dependent: container.registerFactory<Dependent>((dic: Container) => new Dependent(dic.get(token.Depended)))
}

const one = container.get<Dependent>(token.Dependent)
const two = container.get<Dependent>(token.Dependent)
