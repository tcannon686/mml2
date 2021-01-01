/*
 * Themes are responsible for determining the images to use for each logic gate,
 * as well as the position of the pins.
 */

import logic from './logic'

/* SVGs */
import AndGateSvg from './assets/and-gate.svg'
import OrGateSvg from './assets/or-gate.svg'
import XorGateSvg from './assets/xor-gate.svg'
import OpenPinSvg from './assets/open-pin.svg'
import OpenPinInvertedSvg from './assets/open-pin-inverted.svg'
import PinSvg from './assets/pin.svg'
import PinInvertedSvg from './assets/pin-inverted.svg'
import BufferGateSvg from './assets/buffer-gate.svg'
import OneGateSvg from './assets/one-gate.svg'
import ZeroGateSvg from './assets/zero-gate.svg'
import LedSvg from './assets/led.svg'
import LedGlowSvg from './assets/led-glow.svg'
import SwitchOffSvg from './assets/switch-off.svg'
import SwitchOnSvg from './assets/switch-on.svg'
import SenderSvg from './assets/sender.svg'
import ReceiverSvg from './assets/receiver.svg'

const defaultThemeSvgs = {
  and: () => AndGateSvg,
  or: () => OrGateSvg,
  xor: () => XorGateSvg,
  buffer: () => BufferGateSvg,
  led: (gate, state) =>
    state
      ? (logic.getInputs(gate, state)[0] ? LedGlowSvg : LedSvg)
      : LedSvg,
  constant: (gate) => gate.value ? OneGateSvg : ZeroGateSvg,
  switch: (gate, state) =>
    state
      ? (logic.getUserInput(gate, state) ? SwitchOnSvg : SwitchOffSvg)
      : SwitchOffSvg,
  sender: () => SenderSvg,
  receiver: () => ReceiverSvg
}

const defaultTheme = {
  /* Returns an SVG for the given pin. */
  getPinSvg: (pin) => (
    pin.connections.length === 0
      ? (pin.isInverted
        ? OpenPinInvertedSvg
        : OpenPinSvg)
      : (pin.isInverted
        ? PinInvertedSvg
        : PinSvg)),

  /* Returns an SVG for the given gate. */
  getGateSvg (gate, state) {
    return defaultThemeSvgs[gate.type](gate, state)
  },

  /* Returns an object mapping a pin ID to a pin position. */
  getPinPositions (gate, x, y, state) {
    /* Maps a pin ID to a position */
    const ret = {}

    const calcY = (index, length) => 0.25 + (index - (length - 1) / 2) * 0.225 /
        Math.max(length - 1, 1)

    gate.inputs.forEach((pin, index) => {
      ret[pin.id] = {
        x: x,
        y: y + calcY(index, gate.inputs.length)
      }
    })

    gate.outputs.forEach((pin, index) => {
      ret[pin.id] = {
        x: x + 0.5,
        y: y + calcY(index, gate.outputs.length)
      }
    })

    return ret
  },

  getWidth (gate, state) {
    return 0.5
  },

  getHeight (gate, state) {
    return 0.5
  }
}

export {
  defaultTheme
}
