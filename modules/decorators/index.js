import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import getContext from 'recompose/getContext'
import pick from 'lodash/pick'
import isFunction from 'lodash/isFunction'
import assign from 'lodash/assign'

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

export const withConstants = getContext({
	actions: PropTypes.objectOf(PropTypes.func).isRequired,
})
