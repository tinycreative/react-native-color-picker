export const HUE_SIZE = 88;
const HUE_SPAN = 50;
const SPEED = 10;

import React, {
  StyleSheet,
  View,
  Dimensions,
  PanResponder,
} from 'react-native';

import colr from 'colr';
import LinearGradient from 'react-native-linear-gradient';

let window = Dimensions.get('window');

export default HuePicker = React.createClass({
  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // this.setColor(gestureState.x0, gestureState.y0);
      },
      onPanResponderMove: (evt, gestureState) => {
        this.setHue(gestureState.vx, gestureState.vy);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
    });
  },

  render() {
    let colors = [
      colr.fromHsv(this.wrapHue(this.props.hue - HUE_SPAN), 100, 100).toHex(),
      colr.fromHsv(this.wrapHue(this.props.hue), 100, 100).toHex(),
      colr.fromHsv(this.wrapHue(this.props.hue + HUE_SPAN), 100, 100).toHex(),
    ];

    return (
      <View style={styles.container}>
        <LinearGradient
          start={[0, 0]} end={[1, 0]}
          colors={colors}
          style={styles.gradient}
          {...this._panResponder.panHandlers}>

          <View
            style={styles.divider}
          />

        </LinearGradient>
      </View>
    );
  },

  wrapHue(value) {
    if (value > 360) return value - 360;
    if (value < 0) return value + 360;
    return value;
  },

  setHue(x) {
    this.props.onChange(this.wrapHue(this.props.hue - (x * SPEED)));
  },

});

var styles = StyleSheet.create({
  container: {
    borderTopColor: 'rgba(255,255,255,0.5)',
    borderTopWidth: 1,
  },

  gradient: {
    width: window.width,
    height: HUE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    width: 1,
    height: HUE_SIZE,
    backgroundColor: 'rgba(255,255,255,0.5)',
  }
});
