import pick from 'lodash/pick'

export function mergeStateAndOwnProps(stateProps, dispatchProps, ownProps) {
	return assign({}, ownProps, stateProps)
}

export function withStoreProps(mapStateToPropsOrKeys) {
	return connect(
		isFunction(mapStateToPropsOrKeys)
			? mapStateToPropsOrKeys
			: state => pick(state, mapStateToPropsOrKeys),
		undefined,
		mergeStateAndOwnProps,
	)
}
