/* eslint-disable no-invalid-this*/
/**
 * toggle-switch-resize-react-native
 * Toggle Switch component for react native, it works on iOS and Android
 * https://github.com/huuanhopp/toogle-switch.git
 * Email:huuanhopp@gmail.com
 * custom by @hanopp
 */

import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  I18nManager,
} from 'react-native';

import PropTypes from 'prop-types';
import {ratioW} from '../../utils';

export default class ToggleSwitch extends React.Component {
  static propTypes = {
    contentContainerStyle: PropTypes.any,
    isOn: PropTypes.bool.isRequired,
    label: PropTypes.string,
    onColor: PropTypes.string,
    offColor: PropTypes.string,
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    thumbOnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    thumbOffStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    trackOnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    trackOffStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    onToggle: PropTypes.func,
    icon: PropTypes.object,
    disabled: PropTypes.bool,
    animationSpeed: PropTypes.number,
    useNativeDriver: PropTypes.bool,
    circleColor: PropTypes.string,
  };

  static defaultProps = {
    isOn: false,
    onColor: '#4cd137',
    offColor: '#ecf0f1',
    size: 'medium',
    labelStyle: {},
    thumbOnStyle: {},
    thumbOffStyle: {},
    trackOnStyle: {},
    trackOffStyle: {},
    icon: null,
    disabled: false,
    animationSpeed: 300,
    useNativeDriver: true,
    circleColor: 'white',
  };

  offsetX = new Animated.Value(0);

  createInsideCircleStyle = () => [
    {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      backgroundColor: this.props.circleColor,
      transform: [{translateX: this.offsetX}],
      width: ratioW(22),
      height: ratioW(22),
      borderRadius: ratioW(11),
    },
    this.props.isOn
      ? {
          ...this.props.thumbOnStyle,
          height:
            this.props.thumbOnStyle.height ??
            this.props.thumbOnStyle.width ??
            ratioW(22),
          width:
            this.props.thumbOnStyle.height ??
            this.props.thumbOnStyle.width ??
            ratioW(22),
          borderRadius:
            this.props.thumbOnStyle.height ??
            this.props.thumbOnStyle.width ??
            ratioW(22),
        }
      : {
          ...this.props.thumbOffStyle,
          height:
            this.props.thumbOffStyle.height ??
            this.props.thumbOffStyle.width ??
            ratioW(22),
          width:
            this.props.thumbOffStyle.height ??
            this.props.thumbOffStyle.width ??
            ratioW(22),
          borderRadius:
            this.props.thumbOffStyle.height ??
            this.props.thumbOffStyle.width ??
            ratioW(22),
        },
  ];

  render() {
    const {
      animationSpeed,
      useNativeDriver,
      isOn,
      onToggle,
      disabled,
      icon,
    } = this.props;

    let toValue;
    if (!I18nManager.isRTL && isOn) {
      toValue =
        (this.props.contentContainerStyle.width ?? ratioW(56)) -
        (this.props.thumbOnStyle.width ??
          this.props.thumbOnStyle.height ??
          ratioW(22)) -
        (this.props.thumbOnStyle.marginRight ?? 0);
    } else if (I18nManager.isRTL && isOn) {
      toValue = this.props.thumbOffStyle.marginLeft ?? 0;
    } else {
      toValue = 0;
    }

    Animated.timing(this.offsetX, {
      toValue,
      duration: animationSpeed,
      useNativeDriver: useNativeDriver,
    }).start();

    return (
      <View style={styles.container} {...this.props}>
        <TouchableOpacity
          style={[styles.defaultStyle, this.props.contentContainerStyle]}
          activeOpacity={0.8}
          onPress={() => (disabled ? null : onToggle(!isOn))}>
          <Animated.View style={this.createInsideCircleStyle()}>
            {icon}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultStyle: {
    height: ratioW(32),
    width: ratioW(56),
    backgroundColor: 'black',
    borderRadius: ratioW(20),
    justifyContent: 'center',
  },
  labelStyle: {
    marginHorizontal: 10,
  },
});
